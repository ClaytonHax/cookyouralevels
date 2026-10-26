# Cook Your A Levels — Build Spec

One place for a CIE A Level student's whole revision: **syllabus, notes, topical questions, past papers, grades, and an AI study coach (coming soon)**.
Subjects: Mathematics 9709, Physics 9702, Computer Science 9618.

The **syllabus is the backbone**: every question, note and progress mark hangs off a syllabus topic / learning objective.

## Architecture

- Vite + React 18 + TypeScript + Tailwind 3 + react-router 6 (existing stack). Firebase Auth (email/password) + Firestore for **user data only**.
- **Content is static** JSON/Markdown/WebP under `public/` — no Firestore reads for content. Contract: `src/types/content.ts`.
- If Firebase env vars are missing, or the user picks "Try without an account", the app runs in **guest mode**: same API, data in `localStorage`.
- Never call any AI API from the client. The coach is "coming soon" (waitlist only).

## Content files (public/)

| Path | Producer | Shape |
|---|---|---|
| `data/{subjectId}/syllabus.json` | syllabus agents | `Syllabus` |
| `data/{subjectId}/papers.json` | papers agent | `PaperRef[]` (2016→latest, all sessions/variants that exist) |
| `data/{subjectId}/questions.json` | extraction + classification | `Question[]` |
| `q/{subjectId}/{questionId}_{n}.webp` | extraction | question crops |
| `q/{subjectId}/{questionId}_ms_{n}.webp` | extraction | mark-scheme crops |
| `data/{subjectId}/notes/{topicId}.md` + `notes/index.json` | notes agents | curated notes |

subjectIds: `mathematics` (9709), `physics` (9702), `computer-science` (9618).
Past-paper links use PapaCambridge (verified working pattern):
`https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/{code}_{s}{yy}_{type}_{pv}.pdf`
(type qp/ms/in; examiner report is `{code}_{s}{yy}_er.pdf` with no variant). Links point out — we never rehost full PDFs.

Content pipeline scripts live in `scripts/content/` (Python 3, stdlib + poppler `pdftotext`/`pdftoppm` + `cwebp`). Intermediate output in `scripts/content/out/` (gitignored).

## User data (Firestore, mirrored in localStorage for guests)

```
users/{uid}                                  { displayName, subjects: SubjectId[], examYear, examSession, createdAt }
users/{uid}/progress/{subjectId}             { questions: { [qid]: { s: 'tried'|'done'|'review', b?: true, t: number } },
                                               papers:    { [paperId]: { done: true, score?: number, outOf?: number, t: number } },
                                               confidence:{ [objectiveId]: 1|2|3 } }   // 1 red, 2 amber, 3 green
users/{uid}/notes/{noteId}                   { title, body (markdown), subjectId?, topicId?, questionId?, pinned, createdAt, updatedAt }
users/{uid}/subjects/{id}                    grades-tracker compatible: { name, code, target }
users/{uid}/subjects/{id}/grades/{gid}       { title, type, grade, weight, date }
waitlist/{uid}                               { feature: 'coach', email, createdAt }
```

## Routes

```
/                              Landing (public)
/onboarding                    pick subjects + exam session (first sign-in)
/dashboard                     home
/s/:subjectId                  subject overview = syllabus tree with confidence + progress
/s/:subjectId/topic/:topicId   TOPIC HUB: objectives (rate confidence) · Notes · Questions · My notes · Papers
/s/:subjectId/questions        question bank w/ filters (topic, component/paper, year, session, status, search)
/s/:subjectId/q/:questionId    single question: images, reveal mark scheme, status buttons, prev/next, add note
/s/:subjectId/practice         practice session (?topic=&n=10) one-at-a-time, self-mark, summary
/s/:subjectId/papers           past paper library grid with QP/MS/ER/IN links + done/score log
/notes   /notes/:noteId        my notes (all subjects) + editor
/grades                        grades tracker (ported from grades-tracker/)
/coach                         AI Study Coach — coming soon + waitlist
/settings                      profile, subjects, exam session, sign out, export/clear guest data
old /subject/:id/...           redirect to /s/:id
```

## Design system

Personality: warm, confident, a bit of kitchen fire — "cook" your exams. Clean study tool first, flair second.

- Fonts: display **Bricolage Grotesque** (600–800), body **Atkinson Hyperlegible** (400/700), mono **JetBrains Mono**.
- Tokens are CSS variables (light + dark via `.dark` on `<html>`, default follows system) exposed to Tailwind:
  - `--bg` #FBFAF7 / dark #0F0E14 · `--surface` #FFFFFF / #17161F · `--surface-2` #F3F1EC / #1F1E29 · `--border` #E7E3DA / #2A2935
  - `--ink` #16141F / #F2F0EA · `--ink-2` #4A4757 / #B9B6C6 · `--ink-3` #7A7787 / #8A8799
  - `--flame` #EA580C (accent, icons, highlights) · `--flame-strong` #C2410C (buttons w/ white text, AA) · `--flame-soft` #FFF1E8 / #2A1A12
  - subjects: maths `#059669`, physics `#2563EB`, cs `#7C3AED` (+ soft tints)
  - confidence: red `#DC2626`, amber `#D97706`, green `#16A34A`
- Radius 14px cards, 10px controls, full pills. Shadows soft and low (`0 1px 2px rgb(0 0 0/.04), 0 4px 16px rgb(0 0 0/.04)`).
- Motion 150–250ms ease-out; respect `prefers-reduced-motion`.
- Layout: app shell with left sidebar on ≥lg (logo, Home, subjects with colour dots, Notes, Grades, Coach "Soon" badge, Settings) and bottom tab bar on mobile. Content max-w 1200px. Must work at 360px wide.
- Icons: lucide-react. No emoji in UI chrome (🔥 only in the logo mark).
- Voice: encouraging, plain, student-friendly ("Nice — 3 more to go"). Empty states always say what to do next.
- Accessibility: AA contrast, visible focus rings (flame), keyboard-operable, aria labels on icon buttons.

## Shared building blocks (src/)

- `src/lib/content.ts` — cached fetchers: `getSyllabus`, `getPapers`, `getQuestions`, `getNote`, `getNotesIndex`, plus helpers (`topicById`, `componentForTopic`, `objectivesFor`, `paperLabel` e.g. "May/June 2024 · Paper 2 · Variant 2").
- `src/hooks/useContent.ts` — `useSyllabus(id)`, `useQuestions(id)`, `usePapers(id)`, `useNote(id, topicId)` returning `{ data, loading, error }`.
- `src/lib/userStore.ts` — single API over Firestore or localStorage: profile, progress (question status, bookmarks, paper logs, confidence), notes CRUD, grades, waitlist. React hooks in `src/hooks/useUserData.ts` (`useProfile`, `useProgress(subjectId)`, `useNotes(filter?)`) with live updates (onSnapshot / storage events).
- `src/lib/subjects.ts` — `SUBJECTS: SubjectMeta[]` + colours.
- `src/components/ui/*` — Button, Card, Badge, Tabs, Input, Select, Modal, EmptyState, Skeleton, ProgressRing, ConfidencePicker, Markdown (react-markdown + remark-gfm + remark-math + rehype-katex).
- `src/components/layout/AppShell.tsx` — sidebar/bottom nav; pages render inside it.
