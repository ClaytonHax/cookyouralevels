#!/usr/bin/env python3
"""Build public/data/{subjectId}/papers.json from PapaCambridge past-paper links.

Python 3 stdlib only (urllib + concurrent.futures). Links point out to
PapaCambridge; full PDFs are never downloaded or rehosted.

Usage:  python3 scripts/content/build_papers.py

Existence checks are cached in scripts/content/cache/link_cache.json so
re-runs only probe URLs that have not been seen before.
"""
import http.client
import json
import os
import random
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from urllib.request import Request, urlopen

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
CACHE_PATH = os.path.join(HERE, "cache", "link_cache.json")
PAST_PAPERS_DIR = os.path.join(REPO, "past_papers")
DATA_DIR = os.path.join(REPO, "public", "data")

BASE = "https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/"
USER_AGENT = "Mozilla/5.0"
TIMEOUT = 15
WORKERS = 16
YEARS = range(2016, 2026)  # 2016..2025 inclusive
SESSIONS = ("m", "s", "w")
SESSION_ORDER = {"w": 0, "s": 1, "m": 2}
DEFAULT_VARIANTS = range(1, 4)

SUBJECTS = {
    "mathematics": {
        "code": "9709",
        "levels": {1: "AS", 2: "AS", 3: "A2", 4: "AS", 5: "AS", 6: "A2"},
        "variants": {},
    },
    "physics": {
        "code": "9702",
        "levels": {1: "AS", 2: "AS", 3: "AS", 4: "A2", 5: "A2"},
        "variants": {3: range(1, 7)},  # physics paper 3 also uses variants 3,4,5 (codes 33-35)
    },
    "computer-science": {
        "code": "9618",
        "levels": {1: "AS", 2: "AS", 3: "A2", 4: "A2"},
        "variants": {},
    },
}


def yy(year):
    return f"{year % 100:02d}"


def pdf_name(code, year, session, kind, pv=None):
    if kind == "er":
        return f"{code}_{session}{yy(year)}_er.pdf"
    return f"{code}_{session}{yy(year)}_{kind}_{pv}.pdf"


def fetch(url, method, extra_headers=None):
    headers = {"User-Agent": USER_AGENT}
    if extra_headers:
        headers.update(extra_headers)
    req = Request(url, method=method, headers=headers)
    try:
        with urlopen(req, timeout=TIMEOUT) as resp:
            return resp.status, resp.headers.get("Content-Type", "") or ""
    except OSError as e:
        # HTTPError is an OSError subclass that carries a real status code.
        code = getattr(e, "code", None)
        if code is None:
            raise
        ctype = ""
        if getattr(e, "headers", None) is not None:
            ctype = e.headers.get("Content-Type", "") or ""
        return code, ctype


def is_pdf(status, ctype):
    return status == 200 and "pdf" in ctype.lower()


def probe_once(url):
    """HEAD first; fall back to a ranged GET if HEAD does not give a PDF."""
    try:
        status, ctype = fetch(url, "HEAD")
        if is_pdf(status, ctype):
            return True
    except (OSError, http.client.HTTPException):
        pass
    status, ctype = fetch(url, "GET", {"Range": "bytes=0-0"})
    return is_pdf(status, ctype)


def probe(url):
    """Return True/False for a definitive answer, None if both attempts failed."""
    for attempt in (1, 2):
        try:
            return probe_once(url)
        except (OSError, http.client.HTTPException):
            if attempt == 2:
                return None
            time.sleep(1)
    return None


def load_cache():
    try:
        with open(CACHE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return {}


def save_cache(cache):
    os.makedirs(os.path.dirname(CACHE_PATH), exist_ok=True)
    tmp = CACHE_PATH + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=1, sort_keys=True)
    os.replace(tmp, CACHE_PATH)


def local_pdf_names():
    names = set()
    for _root, _dirs, files in os.walk(PAST_PAPERS_DIR):
        for f in files:
            if f.endswith(".pdf"):
                names.add(f)
    return names


def candidates(subject_id, spec):
    """Yield (year, session, paper, variant, pv, level) for every paper slot to probe."""
    for year in YEARS:
        for session in SESSIONS:
            for paper, level in spec["levels"].items():
                variants = spec["variants"].get(paper, DEFAULT_VARIANTS)
                for variant in variants:
                    pv = f"{paper}{variant}"
                    yield year, session, paper, variant, pv, level


def main():
    cache = load_cache()
    print(f"Loaded {len(cache)} cached link results from {os.path.relpath(CACHE_PATH, REPO)}")

    # Build every URL we need, per subject.
    plan = {}
    all_urls = set()
    for subject_id, spec in SUBJECTS.items():
        code = spec["code"]
        slots = list(candidates(subject_id, spec))
        er_keys = {(y, s) for (y, s, _p, _v, _pv, _l) in slots}
        urls = {}
        for (year, session, paper, variant, pv, level) in slots:
            for kind in ("qp", "ms", "in"):
                urls[(year, session, paper, variant, kind)] = BASE + pdf_name(code, year, session, kind, pv)
        for (year, session) in er_keys:
            urls[(year, session, None, None, "er")] = BASE + pdf_name(code, year, session, "er")
        plan[subject_id] = (slots, urls)
        all_urls.update(urls.values())

    to_probe = sorted(u for u in all_urls if u not in cache)
    print(f"{len(all_urls)} URLs total, {len(to_probe)} to probe, {WORKERS} workers")

    errors = []
    try:
        with ThreadPoolExecutor(max_workers=WORKERS) as pool:
            for i, (url, result) in enumerate(zip(to_probe, pool.map(probe, to_probe)), 1):
                if result is None:
                    errors.append(url)  # transient failure: do not cache
                else:
                    cache[url] = result
                if i % 250 == 0 or i == len(to_probe):
                    print(f"  probed {i}/{len(to_probe)}")
    finally:
        save_cache(cache)

    if errors:
        print(f"WARNING: {len(errors)} URLs failed after retry (treated as missing, not cached)")

    def exists(url):
        return cache.get(url, False)

    local = local_pdf_names()
    summary = []
    used_urls = []
    for subject_id, spec in SUBJECTS.items():
        code = spec["code"]
        slots, urls = plan[subject_id]
        papers = []
        for (year, session, paper, variant, pv, level) in slots:
            qp = urls[(year, session, paper, variant, "qp")]
            if not exists(qp):
                continue
            links = {"qp": qp}
            ms = urls[(year, session, paper, variant, "ms")]
            if exists(ms):
                links["ms"] = ms
            er = urls[(year, session, None, None, "er")]
            if exists(er):
                links["er"] = er
            in_ = urls[(year, session, paper, variant, "in")]
            if exists(in_):
                links["in"] = in_
            # Order keys as in PaperRef: links.in goes last.
            ordered_links = {k: links[k] for k in ("qp", "ms", "er", "in") if k in links}
            papers.append({
                "id": f"{code}_{session}{yy(year)}_{pv}",
                "code": code,
                "year": year,
                "session": session,
                "paper": paper,
                "variant": variant,
                "level": level,
                "links": ordered_links,
                "hasQuestions": pdf_name(code, year, session, "qp", pv) in local,
            })
            used_urls.append(qp)
            used_urls.extend(ordered_links[k] for k in ordered_links if k != "qp")

        papers.sort(key=lambda p: (-p["year"], SESSION_ORDER[p["session"]], p["paper"], p["variant"]))

        out_dir = os.path.join(DATA_DIR, subject_id)
        os.makedirs(out_dir, exist_ok=True)
        out_path = os.path.join(out_dir, "papers.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(papers, f, indent=2, ensure_ascii=False)
            f.write("\n")

        years = [p["year"] for p in papers]
        summary.append((
            subject_id,
            len(papers),
            sum("ms" in p["links"] for p in papers),
            sum("er" in p["links"] for p in papers),
            sum("in" in p["links"] for p in papers),
            (min(years), max(years)) if years else None,
            os.path.relpath(out_path, REPO),
        ))

    print()
    print(f"{'subject':<18}{'papers':>8}{'ms':>6}{'er':>6}{'in':>6}  {'years':<11} file")
    for subject_id, n, ms, er, ins, yrs, path in summary:
        yr = f"{yrs[0]}-{yrs[1]}" if yrs else "-"
        print(f"{subject_id:<18}{n:>8}{ms:>6}{er:>6}{ins:>6}  {yr:<11} {path}")

    if used_urls:
        sample = random.sample(used_urls, min(3, len(used_urls)))
        print()
        print("Sample URLs (for curl spot-check):")
        for u in sample:
            print(u)


if __name__ == "__main__":
    sys.exit(main())
