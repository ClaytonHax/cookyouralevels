# Cook Your A Levels

Everything a CIE A Level student needs in one place: the syllabus, curated notes, topical past-paper questions with mark schemes, a past paper library, a grades tracker, and an AI study coach (coming soon). Subjects: Mathematics 9709, Physics 9702, Computer Science 9618.

- Spec and data model: [docs/SPEC.md](docs/SPEC.md)
- Building pages on the foundation (hooks, UI kit, tokens): [docs/FOUNDATION.md](docs/FOUNDATION.md)

## Run

```bash
npm install
npm run dev        # Firebase env vars in .env.local / .env.development.local (see .env.example)
npm run build
```

Without Firebase env vars the app runs in guest mode (data in localStorage). Anyone can also choose "Try without an account".

## Content

All content is static under `public/` (no database reads):

| Path | What |
|---|---|
| `public/data/{subject}/syllabus.json` | syllabus components → topics → learning objectives |
| `public/data/{subject}/notes/*.md` | curated revision notes per topic (Markdown + KaTeX) |
| `public/data/{subject}/papers.json` | past paper catalogue with PapaCambridge QP/MS/ER links |
| `public/data/{subject}/questions.json` + `public/q/` | topical questions cropped from real papers, with mark-scheme crops |

Pipeline (Python 3 + poppler + cwebp), in `scripts/content/`:

```bash
python3 scripts/content/build_papers.py       # refresh the past paper link catalogue
python3 scripts/content/extract_questions.py  # crop questions + mark schemes from past_papers/*.pdf
# classify scripts/content/out/{subject}.questions.raw.json → {subject}.classification.json
python3 scripts/content/merge_questions.py    # write public/data/{subject}/questions.json
node scripts/content/check_katex.cjs          # validate maths in the notes
```

To add more papers to the question bank, drop QP PDFs into `past_papers/{maths,physics,cs}/`, re-run extraction, classify the new ids, and merge.

## User data

Firestore (`firestore.rules`): `users/{uid}` profile, `progress/{subject}` (question status, bookmarks, paper scores, objective confidence), `notes`, grades-tracker-compatible `subjects/*/grades`, and `waitlist/{uid}`.
