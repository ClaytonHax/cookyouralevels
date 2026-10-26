# Foundation guide for page authors

Everything here exists; do not re-implement it. Types for content live in `src/types/content.ts`. Imports below are relative to `src/`.

## 1. Where your page lives

Routes (see `App.tsx`) render page components with `export default`. Pages are lazy-loaded; replace the PLACEHOLDER body in your own file only.

```
/onboarding                      pages/Onboarding.tsx       (outside AppShell, full screen; protected)
AppShell (sidebar/tabs) wraps everything below; redirects to /onboarding if profile has no subjects
/dashboard                       Dashboard
/s/:subjectId                    SubjectLayout (header+tabs) -> SubjectOverview (index)
/s/:subjectId/topic/:topicId     TopicHub
/s/:subjectId/questions          QuestionBank
/s/:subjectId/q/:questionId      QuestionView
/s/:subjectId/practice           Practice
/s/:subjectId/papers             Papers
/notes  /notes/:noteId           Notes, NoteEditor
/grades /coach /settings         Grades, Coach, Settings
```

Pages render inside `<main>` (max-w 1200px, padded, bottom padding for the mobile tab bar). Do not add your own page wrapper/max-width. Start with an `<h1 className="font-display text-3xl font-extrabold text-ink">`.

### Subject pages: `useSubject()`
Inside `/s/:subjectId/*`:
```ts
import { useSubject } from '../components/layout/SubjectLayout'
const { subject, syllabus } = useSubject()
// subject: SubjectTheme = SubjectMeta (id, code, name, short) + cls {dot,text,soft,border,bar,stroke,accentTop} + color
// syllabus: Syllabus, ALWAYS loaded (children render after load). components may be [] if the file is missing -> show an EmptyState.
```
Route params: `useParams()` for `topicId`, `questionId`. Build links as `/s/${subject.id}/topic/${t.id}`.
`SubjectLayout` already shows the header/ring/tabs (Overview, Questions, Papers). Your page renders only the body.

## 2. Content (static JSON, cached)

`lib/content.ts` (promises, cached, never throw; missing file -> empty data):
```ts
getSyllabus(id): Promise<Syllabus>        // empty components if missing
getPapers(id): Promise<PaperRef[]>        // []
getQuestions(id): Promise<Question[]>     // []
getNote(id, topicId): Promise<string|null>
getNotesIndex(id): Promise<string[]>      // topicIds with notes; []
// helpers (all null/undefined-safe)
allTopics(syllabus): SyllabusTopic[]
topicById(syllabus, topicId): SyllabusTopic | undefined
componentForTopic(syllabus, topicId): SyllabusComponent | undefined
objectivesFor(syllabus, topicId): Objective[]
allObjectives(syllabus) ; objectiveById(syllabus, objectiveId)
sessionName('s') -> 'May/June'   // m 'Feb/March', w 'Oct/Nov'
paperLabel(paperRef | question) -> 'May/June 2024 · Paper 2 · Variant 2'
```
Hooks `hooks/useContent.ts`, all return `{ data, loading, error }` (`data` is null only while loading / for `useNote` when no note exists):
```ts
useSyllabus(id) ; useQuestions(id) ; usePapers(id) ; useNote(id, topicId) ; useNotesIndex(id)
```
Pass `undefined` id to skip. Results are cached in memory, so revisiting is instant (no loading flash).

`lib/subjects.ts`: `SUBJECTS`, `SUBJECT_IDS`, `getSubject(id)`, `isSubjectId(v)`.

`lib/progress.ts` (derived readiness from confidence ratings):
```ts
readinessFor(objectiveIds, progress) ; topicReadiness(syllabus, topicId, progress) ; subjectReadiness(syllabus, progress)
// -> { total, rated, red, amber, green, pct }  pct = 0-100 average confidence (unrated counts 0)
```

## 3. User data (works for Firestore users and guests identically)

Hooks in `hooks/useUserData.ts` are live and optimistic. Write actions return Promises that **never reject** (failures show a toast via AppShell), so call them without try/catch; `await` is optional.

```ts
useProfile(): { profile: Profile|null, loading, saveProfile(patch) }
// Profile { displayName, subjects: SubjectId[], examYear, examSession: 'm'|'s'|'w', createdAt }
// profile is null until onboarding calls saveProfile({ displayName, subjects, examYear, examSession })

useProgress(subjectId): {
  progress: { questions: Record<qid,{s?:'tried'|'done'|'review', b?:true, t}>, papers: Record<paperId,{done:true,score?,outOf?,t}>, confidence: Record<objectiveId,1|2|3> },
  loading,
  setQuestionStatus(qid, 'tried'|'done'|'review'|null),
  toggleBookmark(qid),
  logPaper(paperId, {done:true, score?, outOf?} | null),
  setConfidence(objectiveId, 1|2|3|null),   // 1 red, 2 amber, 3 green
}
useAllProgress(): { all: Partial<Record<SubjectId, ProgressDoc>>, loading }   // for dashboards

useNotes(filter?: {subjectId?, topicId?, questionId?}): { notes: Note[], loading }   // pinned first, then newest updated
useNoteById(id): { note: Note|null, loading }
// Note { id, title, body(markdown), subjectId?, topicId?, questionId?, pinned, createdAt, updatedAt }
// plain functions from lib/userStore: createNote(input?: Partial<Note>) => id (sync, optimistic), updateNote(id, patch), deleteNote(id)

useGradeSubjects(): { subjects: GradeSubject[], loading }      // {id,name,code?,target,syllabus?,createdAt?}
useGrades(gradeSubjectId): { grades: Grade[], loading }        // newest first: {id,title,type,grade,weight,date,createdAt?}
// lib/userStore: addGradeSubject(input)=>id, updateGradeSubject(id,patch), deleteGradeSubject(id) (also deletes its grades),
//                addGrade(subjectId,input)=>id, updateGrade(subjectId,id,patch), deleteGrade(subjectId,id)
// Same Firestore paths/fields as grades-tracker: users/{uid}/subjects/{id}[/grades/{gid}]. Grade maths helpers still live in grades-tracker/src/grades.js (port to TS as needed).

useWaitlist('coach'): { joined, join(email?) }      // lib/userStore: joinWaitlist(feature, email?)
```
Guest tools for Settings (`lib/userStore`): `exportGuestData(): string` (JSON), `clearGuestData()`.

Notes on semantics:
- A question entry with neither status nor bookmark is dropped on read. `setQuestionStatus(.., null)` keeps the bookmark.
- Progress hooks share one subscription for all subjects; calling `useProgress` in many components is cheap.
- Creating a note then navigating: `const id = createNote({ subjectId, topicId, title: '' }); navigate('/notes/' + id)`. The note appears immediately.
- Objective ids contain `.` (e.g. `p1-quadratics.3`); it is safe as a map key.

## 4. Auth

```ts
const { user, isGuest, firebaseEnabled, signOut, openAuth, continueAsGuest, signIn, signUp } = useAuth()
// user: { uid, isGuest, displayName, email, photoURL } | null.  Inside the shell user is never null.
```
`firebaseEnabled` is false when `VITE_FIREBASE_API_KEY` is missing: guest-only (hide "create account" UI then). Signing out keeps guest data. `openAuth()` opens the sign-in modal (offers "Try without an account").

## 5. Layout components
- `components/layout/AppShell.tsx` (route layout; also exports `Logo`). Hooks the store error handler to a toast.
- `components/layout/SubjectLayout.tsx` exports `useSubject()` and `SubjectContext`.

## 6. UI kit: `import { … } from '../components/ui'`
| Component | Props / notes |
|---|---|
| `Button` | `variant` primary\|secondary\|ghost\|danger, `size` sm\|md\|lg, `loading`, `leftIcon`, `rightIcon`, plus button attrs. `buttonClasses(variant,size,extra)` styles a `<Link>` as a button. |
| `Card` | `padding` none\|sm\|md\|lg, `interactive` (hover lift). |
| `Badge` / `Pill` | `tone` neutral\|flame\|maths\|physics\|cs\|red\|amber\|green. |
| `Tabs` + `TabPanel` | `items:[{id,label,icon?,count?}]`, `value`, `onChange`, `idPrefix`, `label`. `<TabPanel idPrefix id value>` renders when active. (For route-based tabs use NavLink; see SubjectLayout.) |
| `Input` `Textarea` `Select` | `label`, `hint`, `error` + native attrs; `Select` takes `<option>` children. |
| `Modal` | `open`, `onClose`, `title`, `description`, `footer`, `size` sm\|md\|lg. Focus trap, Esc, backdrop. Put `data-autofocus` on the element to focus first. |
| `Sheet` | bottom sheet: `open`, `onClose`, `title`. |
| `EmptyState` | `icon` (lucide element), `title`, `description` (say what to do next), `action`. |
| `Skeleton`, `SkeletonText`, `PageSkeleton` | `className="h-6 w-40"`. |
| `ProgressRing` | `value` 0-100, `size`, `stroke`, `strokeClass` (e.g. `subject.cls.stroke`), `children` centre content. |
| `ProgressBar` | `value` 0-100, `colorClass` (e.g. `subject.cls.bar`), `height` sm\|md. |
| `ConfidencePicker` | `value: 1\|2\|3\|null`, `onChange(v\|null)`, `label` (objective text), `size` sm\|md. Clicking the active dot clears. |
| `Markdown` | `children: string` (GFM + `$KaTeX$`), `className`. Styled via `.prose-cyal`. |
| `useToast()` | `{ toast(msg,{kind,duration}), success(msg), error(msg) }`. |

`components/questions/KaTeXRenderer` (plain text with `$…$`, for previews/search results) is unchanged.
`lib/cn.ts`: `cn('a', cond && 'b')`. `hooks/useTheme`: `{ theme, toggle, setTheme }`.

## 7. Tokens (Tailwind classes; all support dark mode automatically and opacity like `bg-flame/10`)
- Surfaces: `bg-bg`, `bg-surface`, `bg-surface-2`, `border-border`.
- Text: `text-ink` (primary), `text-ink-2` (secondary), `text-ink-3` (muted/placeholders; AA for large/UI text, use sparingly for body copy).
- Accent: `text-flame` / `bg-flame` (highlights, icons), `bg-flame-strong text-white` (buttons, AA), `bg-flame-soft` (tinted bg).
- Subjects: `maths`, `physics`, `cs` + `-soft` (`bg-maths-soft text-maths`). Prefer `subject.cls.*` so it works for any subject id.
- Confidence: `bg-conf-red|amber|green`, `text-conf-*`.
- Fonts: `font-display` (headings; h1-h4 default to it), `font-body` (default), `font-mono`.
- Utilities: `.card` (surface+border+14px radius+shadow), `focus-ring` (add to custom interactive elements; plain buttons/links already get a flame outline via `:focus-visible`), `rounded-card` (14px), `rounded-control` (10px), `shadow-soft`, `shadow-lift`, `animate-fade-in`, `animate-pop-in`.
- Legacy `brand-*` colours still work (mapped to the tokens) but do not use them in new code. Landing components still use them plus some slate/indigo utilities.
- No emoji in UI chrome. Voice: encouraging, plain.

## 8. Patterns

Loading / empty / error with content:
```tsx
const { subject, syllabus } = useSubject()
const { data: questions, loading } = useQuestions(subject.id)
if (loading) return <SkeletonText lines={5} />
if (!questions?.length) return <EmptyState icon={<FileQuestion />} title="No questions yet" description="Questions for this subject are still being added. Try the Papers tab meanwhile." action={<Link className={buttonClasses('secondary')} to={`/s/${subject.id}/papers`}>Open papers</Link>} />
```
Optimistic user action (no spinner needed):
```tsx
const { progress, setQuestionStatus } = useProgress(subject.id)
<Button onClick={() => setQuestionStatus(q.id, 'done')}>Mark done</Button>
```
Missing route entities (bad `topicId`/`questionId`) -> `EmptyState` with a link back, never a crash. Content fetches never throw; `error` from hooks is for unexpected failures only.
Mobile: design for 360px wide; lists should stack, tables should scroll (`overflow-x-auto`); keep tap targets >= 40px. Sticky bottom bars must sit above the mobile tab bar (`bottom-16 lg:bottom-0`).

## 9. Infra
- `firestore.rules`, `firebase.json`, `firestore.indexes.json` (empty) at repo root. Deploy with `firebase deploy --only firestore:rules`.
- `waitlist/{uid}` is write-only for users (cannot be read back), so "joined" state is remembered in localStorage.
- Env: `VITE_FIREBASE_*` (see `.env.example`). Missing -> guest-only mode.
