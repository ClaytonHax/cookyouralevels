#!/usr/bin/env python3
"""Extract question crops + mark-scheme crops from CIE past papers.

Usage:  python3 scripts/content/extract_questions.py [--only 9702_s24_22 ...] [--jobs 6]
                                                    [--subject physics] [--no-write]

Inputs : past_papers/{cs,maths,physics}/*.pdf  (question papers)
Outputs: public/q/{subjectId}/{questionId}_{n}.webp, {questionId}_ms_{n}.webp
         scripts/content/out/{subjectId}.questions.raw.json  (Question[])
Cache  : scripts/content/cache/ms/*.pdf (downloaded mark schemes)

Needs poppler (pdftotext, pdftoppm) and cwebp. Python stdlib only.
Pages are rasterised whole (pdftoppm -r DPI -gray) and cropped in Python so that
blank space can be trimmed; crops are written as PGM and encoded with cwebp.
"""
import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PAPERS = ROOT / "past_papers"
CACHE = ROOT / "scripts/content/cache/ms"
OUT = ROOT / "scripts/content/out"
PUBQ = ROOT / "public/q"
MS_BASE = "https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/"

FOLDER_SUBJECT = {"cs": "computer-science", "maths": "mathematics", "physics": "physics"}
AS_PAPERS = {
    "mathematics": {1, 2, 4, 5},
    "physics": {1, 2, 3},
    "computer-science": {1, 2},
}
DPI = 130
MS_DPI = 120
WEBP_Q = "60"
MAX_BLANK = 60          # px; longer blank runs inside a crop are collapsed to this
PAD = 6                 # px of white kept above/below trimmed crops
PT = DPI / 72.0

# content box on question papers (pt)
QP_X0, QP_X1 = 22.0, 573.0
QP_TOP_FIRST = 4.0      # crop starts this far above the question number
QP_TOP_CONT = 64.0      # continuation pages: below header page number
QP_BOTTOM = 794.0      # above "© UCLES" footer

WORD_RE = re.compile(
    r'<page width="([\d.]+)" height="([\d.]+)">|<line |'
    r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)</word>')


# --------------------------------------------------------------------------- helpers
def run(cmd, **kw):
    return subprocess.run(cmd, check=True, capture_output=True, **kw)


def unescape(s):
    return (s.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
             .replace("&quot;", '"').replace("&#39;", "'"))


class Word:
    __slots__ = ("x0", "y0", "x1", "y1", "t", "line")

    def __init__(self, x0, y0, x1, y1, t, line):
        self.x0, self.y0, self.x1, self.y1, self.t, self.line = x0, y0, x1, y1, t, line


class Page:
    def __init__(self, w, h):
        self.w, self.h, self.words = w, h, []


def parse_bbox(pdf):
    html = run(["pdftotext", "-bbox-layout", str(pdf), "-"]).stdout.decode("utf8", "replace")
    pages, line = [], 0
    for m in WORD_RE.finditer(html):
        if m.group(1):
            pages.append(Page(float(m.group(1)), float(m.group(2))))
        elif m.group(7) is None:
            line += 1
        else:
            pages[-1].words.append(Word(float(m.group(3)), float(m.group(4)), float(m.group(5)),
                                        float(m.group(6)), unescape(m.group(7)), line))
    return pages


# --------------------------------------------------------------------------- raster
def render_pages(pdf, pages, dpi, tmp):
    """Render the given 1-based pages to PGM; return {page: (w, h, rows[list of bytes])}."""
    out = {}
    for p in sorted(set(pages)):
        root = os.path.join(tmp, f"p{p}")
        run(["pdftoppm", "-r", str(dpi), "-gray", "-f", str(p), "-l", str(p), str(pdf), root])
        f = [x for x in os.listdir(tmp) if x.startswith(f"p{p}-") and x.endswith(".pgm")][0]
        path = os.path.join(tmp, f)
        data = open(path, "rb").read()
        os.remove(path)
        m = re.match(rb"P5\s+(\d+)\s+(\d+)\s+(\d+)\s", data)
        w, h = int(m.group(1)), int(m.group(2))
        body = data[m.end():]
        out[p] = (w, h, [body[i * w:(i + 1) * w] for i in range(h)])
    return out


def crop_rows(img, x0pt, x1pt, y0pt, y1pt, dpi):
    w, h, rows = img
    s = dpi / 72.0
    xa, xb = max(0, int(x0pt * s)), min(w, int(x1pt * s))
    ya, yb = max(0, int(y0pt * s)), min(h, int(y1pt * s))
    if yb <= ya or xb <= xa:
        return None
    sub = [r[xa:xb] for r in rows[ya:yb]]
    # trim blank rows, collapse long blank runs
    blank = [min(r) > 232 for r in sub]
    try:
        first = blank.index(False)
    except ValueError:
        return None
    last = len(blank) - 1 - blank[::-1].index(False)
    out, run_len = [], 0
    width = xb - xa
    white = b"\xff" * width
    for i in range(first, last + 1):
        if blank[i]:
            run_len += 1
            if run_len <= MAX_BLANK:
                out.append(sub[i])
        else:
            run_len = 0
            out.append(sub[i])
    out = [white] * PAD + out + [white] * PAD
    if len(out) - 2 * PAD < 8:      # basically empty (stray mark)
        return None
    return width, out


def write_webp(crop, dest, tmp):
    width, rows = crop
    pgm = os.path.join(tmp, "c%d.pgm" % (hash(dest) & 0xffffff))
    with open(pgm, "wb") as f:
        f.write(b"P5\n%d %d\n255\n" % (width, len(rows)))
        f.write(b"".join(rows))
    dest.parent.mkdir(parents=True, exist_ok=True)
    run(["cwebp", "-quiet", "-q", WEBP_Q, "-m", "5", pgm, "-o", str(dest)])
    os.remove(pgm)


# --------------------------------------------------------------------------- QP parsing
SKIP_MARKERS = ("following lined page", "Permission to reproduce")


def page_text(pg):
    return " ".join(w.t for w in pg.words)


def page_limit(pg):
    """y below which content is copyright / permission text."""
    ys = [w.y0 for w in pg.words if w.t == "Permission"]
    lim = (min(ys) - 3) if ys else QP_BOTTOM
    bc = [w.y0 for w in pg.words if w.y0 > 700 and is_barcode(w)]
    if bc:
        lim = min(lim, min(bc) - 3)
    foot = [w.y0 for w in pg.words if w.t == "©" and w.y0 > pg.h * 0.9]
    if foot:
        lim = min(lim, min(foot) - 8)
    return min(lim, QP_BOTTOM)


def is_skip_page(pg, idx):
    if idx == 0:
        return True
    txt = page_text(pg)
    if "BLANK PAGE" in txt or "ADDITIONAL PAGE" in txt:
        return True
    if "following lined page" in txt:
        return True
    if page_limit(pg) < 150:
        return True
    toks = {w.t for w in pg.words}
    if "Formulae" in toks and "Data" in toks:
        return True
    return False


def is_barcode(w):
    return (w.y1 - w.y0) < 8 and not re.search(r"[A-Za-z0-9]", w.t)


def header_bottom(pg):
    bc = [w.y1 for w in pg.words if w.y0 < 85 and is_barcode(w)]
    return max(_header_bottom(pg), (max(bc) + 1) if bc else 0)


def _header_bottom(pg):
    ys = [w.y1 for w in pg.words if w.y0 < 56 and 200 < w.x0 < 400]
    return (max(ys) if ys else 40) + 1


def left_min(pg):
    xs = [w.x0 for w in pg.words if w.x0 >= 30 and 55 <= w.y0 <= 800]
    return min(xs) if xs else 50


def find_questions(pages):
    """Return list of (qnum, pageidx, y) in sequence + list of content page idxs."""
    found, expected = [], 1
    last_pos = (-1, -1)
    content = []
    for pi, pg in enumerate(pages):
        if is_skip_page(pg, pi):
            continue
        content.append(pi)
        lm = left_min(pg)
        y_floor = 52
        while True:
            cands = [w for w in pg.words
                     if w.t == str(expected) and w.x0 < 64
                     and w.y0 > y_floor and w.y0 < page_limit(pg) - 8
                     and not any(o.x1 < w.x0 - 2 and o.x0 >= 25 and abs(o.y0 - w.y0) < 4
                                 for o in pg.words)]
            if not cands:
                break
            c = min(cands, key=lambda w: w.y0)
            ytop = min([c.y0] + [o.y0 for o in pg.words if o.line == c.line and abs(o.y0 - c.y0) < 12])
            found.append((expected, pi, ytop))
            expected += 1
            y_floor = c.y0 + 4
    return found, content


JUNK_LINE = re.compile(r"^(DO NOT WRITE IN THIS MARGIN|\[?Turn over\]?|© UCLES.*|\*\d+\*|\d+/\d+/[A-Z]/[A-Z]/\d+)$", re.I)


def question_text(pages, segs):
    """segs: list of (pageidx, y0, y1). Returns cleaned text."""
    lines = []
    for pi, y0, y1 in segs:
        pg = pages[pi]
        cur, buf = None, []
        ws = [w for w in pg.words if y0 - 1 <= (w.y0 + w.y1) / 2 < y1 and 22 <= w.x0 <= 575]
        for w in ws:
            if w.line != cur:
                if buf:
                    lines.append(" ".join(buf))
                buf, cur = [], w.line
            buf.append(w.t)
        if buf:
            lines.append(" ".join(buf))
    out = []
    for ln in lines:
        ln = re.sub(r"\.{4,}|…{2,}|_{4,}|(\. ){4,}", " ", ln)
        ln = re.sub(r"\s+", " ", ln).strip()
        if not ln or JUNK_LINE.match(ln) or re.fullmatch(r"[\W\d]{0,3}", ln) and not re.search(r"\d", ln):
            continue
        if ln.startswith("© UCLES") or "DO NOT WRITE IN THIS MARGIN" in ln:
            ln = ln.replace("DO NOT WRITE IN THIS MARGIN", "").strip()
            if not ln or ln.startswith("© UCLES"):
                continue
        out.append(ln)
    txt = re.sub(r"\s+", " ", " ".join(out)).strip()
    txt = re.sub(r"[\x00-\x1f\x7f]", "", txt)
    txt = re.sub(r"\*\d{8,}\*", "", txt)
    txt = re.sub(r"\[Turn over\]?", "", txt)
    return re.sub(r"\s+", " ", txt).strip()


def count_marks(text):
    tot = re.findall(r"\[Total:?\s*(\d+)\]", text)
    if tot:
        return int(tot[-1])
    return sum(int(x) for x in re.findall(r"\[(\d{1,2})\]", text))


# --------------------------------------------------------------------------- MS parsing
LABEL_RE = re.compile(r"^(\d{1,2})((\([a-z]{1,4}\))*)$")


def download_ms(name):
    CACHE.mkdir(parents=True, exist_ok=True)
    dest = CACHE / name
    if dest.exists() and dest.stat().st_size > 1000:
        return dest
    req = urllib.request.Request(MS_BASE + name, headers={"User-Agent": "Mozilla/5.0"})
    last = None
    for _ in range(3):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                data = r.read()
            if data[:4] != b"%PDF":
                raise ValueError("not a pdf")
            dest.write_bytes(data)
            return dest
        except Exception as e:  # noqa
            last = e
    raise RuntimeError(f"download failed {name}: {last}")


def ms_mcq_key(ms_pdf):
    txt = run(["pdftotext", "-layout", str(ms_pdf), "-"]).stdout.decode("utf8", "replace")
    key = {}
    for m in re.finditer(r"(?<![\w.(])(\d{1,2})\s{1,12}([ABCD])(?![\w)])", txt):
        key.setdefault(int(m.group(1)), m.group(2))
    return key


def ms_regions(pages):
    """Return list of (qnum, pageidx, ytop, ybottom) for the MS table, plus x-range per page."""
    regs = []
    cur, expected_max = None, 0
    for pi, pg in enumerate(pages):
        hdr = [w for w in pg.words if w.t == "Question" and w.y0 < 140 and w.x0 < 200]
        if not hdr:
            continue
        hq = min(hdr, key=lambda w: w.y0)
        if not any(w.t in ("Answer", "Answers") and abs(w.y0 - hq.y0) < 6 for w in pg.words):
            continue
        qx = hq.x0
        hdr_bottom = max(w.y1 for w in pg.words if abs(w.y0 - hq.y0) < 6)
        foot = [w.y0 for i, w in enumerate(pg.words[:-1])
                if w.t == "©" and pg.words[i + 1].line == w.line and pg.words[i + 1].t.startswith("Cambridge")]
        foot = foot or [w.y0 for w in pg.words if w.t == "©"
                        and w.y0 > max(x.y1 for x in pg.words if x.t not in ("©",)) - 60]
        bottom = (min(foot) if foot else pg.h - 25) - 4
        labels = [w for w in pg.words
                  if LABEL_RE.match(w.t) and qx - 8 <= w.x0 <= qx + 45 and w.y0 > hdr_bottom
                  and w.y0 < bottom]
        labels.sort(key=lambda w: w.y0)
        pos = hdr_bottom + 1
        for w in labels:
            n = int(LABEL_RE.match(w.t).group(1))
            if n == cur or (cur is None and n == 1) or (cur is not None and n == cur + 1):
                if n != cur:
                    if cur is not None and w.y0 - 5 > pos:
                        regs.append((cur, pi, pos, w.y0 - 5))
                    pos = w.y0 - 5
                    cur = n
        if cur is not None and bottom > pos:
            regs.append((cur, pi, pos, bottom))
    return regs


# --------------------------------------------------------------------------- per paper
def process(pdf, subject_folder, write=True):
    name = pdf.name
    m = re.match(r"(\d{4})_([msw])(\d\d)_qp_(\d)(\d)\.pdf", name)
    code, ses, yy, pap, var = m.group(1), m.group(2), m.group(3), int(m.group(4)), int(m.group(5))
    subject = FOLDER_SUBJECT[subject_folder]
    paper_id = f"{code}_{ses}{yy}_{pap}{var}"
    level = "AS" if pap in AS_PAPERS[subject] else "A2"
    res = {"paperId": paper_id, "subject": subject, "questions": [], "notes": []}

    if open(pdf, "rb").read(4) != b"%PDF":
        raise RuntimeError("input file is not a PDF (probably a saved 404 page)")
    pages = parse_bbox(pdf)
    found, content = find_questions(pages)
    n_q = len(found)
    res["found"] = n_q

    # mark scheme
    ms_name = name.replace("_qp_", "_ms_")
    ms_pdf = None
    try:
        ms_pdf = download_ms(ms_name)
    except Exception as e:  # noqa
        res["notes"].append(str(e))

    mcq = {}
    ms_pages, ms_regs = None, []
    if ms_pdf:
        key = ms_mcq_key(ms_pdf)
        if len(key) >= 20 and n_q and len(key) >= n_q * 0.9:
            mcq = key
        else:
            ms_pages = parse_bbox(ms_pdf)
            ms_regs = ms_regions(ms_pages)
    res["mcq"] = bool(mcq)
    res["ms_match"] = (len([k for k in mcq if k <= n_q]) if mcq
                       else len({r[0] for r in ms_regs}))

    # question regions
    segs_by_q = {}
    for i, (qn, pi, y) in enumerate(found):
        nxt = found[i + 1] if i + 1 < len(found) else None
        last_page = nxt[1] if nxt else (content[-1] if content else pi)
        segs = []
        for p in content:
            if p < pi or p > last_page:
                continue
            hb = header_bottom(pages[p])
            top = max(y - QP_TOP_FIRST, hb) if p == pi else hb
            bot = min(QP_BOTTOM, page_limit(pages[p]))
            if nxt and p == nxt[1]:
                bot = nxt[2] - 2
            if bot - top > 4:
                segs.append((p, top, bot))
        segs_by_q[qn] = segs

    # keep content pages only up to last question page continuing to end of content
    # render & write
    qs_dir = PUBQ / subject
    if write:
        qs_dir.mkdir(parents=True, exist_ok=True)
        for old in qs_dir.glob(f"{paper_id}_q*.webp"):
            old.unlink()
    with tempfile.TemporaryDirectory() as tmp:
        needed = {p + 1 for segs in segs_by_q.values() for p, _, _ in segs}
        imgs = render_pages(pdf, needed, DPI, tmp) if (write and needed) else {}
        ms_imgs = {}
        if write and ms_regs:
            ms_imgs = render_pages(ms_pdf, {r[1] + 1 for r in ms_regs}, MS_DPI, tmp)
        for qn, segs in segs_by_q.items():
            qid = f"{paper_id}_q{qn}"
            urls, ms_urls = [], []
            if write:
                k = 0
                for p, top, bot in segs:
                    c = crop_rows(imgs[p + 1], QP_X0, QP_X1, top, bot, DPI)
                    if c:
                        k += 1
                        write_webp(c, qs_dir / f"{qid}_{k}.webp", tmp)
                        urls.append(f"/q/{subject}/{qid}_{k}.webp")
                k = 0
                for (rq, rp, rt, rb) in ms_regs:
                    if rq != qn:
                        continue
                    pg = ms_pages[rp]
                    c = crop_rows(ms_imgs[rp + 1], 14, ms_imgs[rp + 1][0] * 72.0 / MS_DPI - 14, rt, rb, MS_DPI)
                    if c:
                        k += 1
                        write_webp(c, qs_dir / f"{qid}_ms_{k}.webp", tmp)
                        ms_urls.append(f"/q/{subject}/{qid}_ms_{k}.webp")
            text = question_text(pages, segs)
            marks = 1 if mcq else count_marks(text)
            q = {
                "id": qid, "subjectId": subject, "paperId": paper_id,
                "year": 2000 + int(yy), "session": ses, "paper": pap, "variant": var,
                "level": level, "number": qn, "marks": marks, "text": text,
                "images": urls, "msImages": ms_urls,
                "topicIds": [], "objectiveIds": [],
            }
            if mcq and qn in mcq:
                q["mcqAnswer"] = mcq[qn]
            res["questions"].append(q)
    return res


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", nargs="*", help="paper ids like 9702_s24_22 (filters)")
    ap.add_argument("--subject", choices=list(FOLDER_SUBJECT.values()))
    ap.add_argument("--jobs", type=int, default=6)
    ap.add_argument("--no-write", action="store_true", help="detect only, no crops")
    args = ap.parse_args()

    jobs = []
    for folder in FOLDER_SUBJECT:
        for pdf in sorted((PAPERS / folder).glob("*_qp_*.pdf")):
            pid = re.sub(r"_qp_", "_", pdf.stem)
            if args.only and pid not in args.only:
                continue
            if args.subject and FOLDER_SUBJECT[folder] != args.subject:
                continue
            jobs.append((pdf, folder))

    results = {}
    failures = []

    def work(j):
        pdf, folder = j
        try:
            return process(pdf, folder, write=not args.no_write)
        except Exception as e:  # noqa
            import traceback
            return {"paperId": pdf.stem, "subject": FOLDER_SUBJECT[folder], "error": repr(e),
                    "tb": traceback.format_exc(), "questions": []}

    with ThreadPoolExecutor(max_workers=args.jobs) as ex:
        for r in ex.map(work, jobs):
            if "error" in r:
                failures.append(r)
                print(f"FAIL {r['paperId']}: {r['error']}")
                continue
            flag = "" if r["found"] == r["ms_match"] else "  <-- MISMATCH"
            print(f"{r['paperId']:16s} q={r['found']:3d} ms={r['ms_match']:3d} "
                  f"{'MCQ' if r['mcq'] else '   '} {'; '.join(r['notes'])}{flag}")
            results.setdefault(r["subject"], []).append(r)

    if not args.only and not args.subject and not args.no_write:
        OUT.mkdir(parents=True, exist_ok=True)
        for subject, rs in results.items():
            qs = [q for r in rs for q in r["questions"]]
            (OUT / f"{subject}.questions.raw.json").write_text(json.dumps(qs, indent=1, ensure_ascii=False))
    elif not args.no_write:
        OUT.mkdir(parents=True, exist_ok=True)
        for subject, rs in results.items():
            p = OUT / f"{subject}.questions.raw.json"
            old = json.loads(p.read_text()) if p.exists() else []
            ids = {r["paperId"] for r in rs}
            old = [q for q in old if q["paperId"] not in ids]
            qs = old + [q for r in rs for q in r["questions"]]
            qs.sort(key=lambda q: (q["paperId"], q["number"]))
            p.write_text(json.dumps(qs, indent=1, ensure_ascii=False))
    for subject, rs in results.items():
        print(subject, sum(len(r["questions"]) for r in rs), "questions in", len(rs), "papers")
    if failures:
        print("FAILURES:", [f["paperId"] for f in failures])
        print(failures[0]["tb"])


if __name__ == "__main__":
    main()
