// React hooks over src/lib/userStore.ts. All are live (Firestore onSnapshot / local emitter + storage events).
import { useCallback, useMemo, useSyncExternalStore } from 'react'
import type { SubjectId } from '../types/content'
import * as store from '../lib/userStore'
import type {
  ChanState, Confidence, Grade, GradeSubject, Note, NoteFilter, ProgressDoc, Profile, QuestionStatus,
} from '../lib/userStore'

type Chan<T> = store.Channel<T> | null
const NOOP_UNSUB = () => {}
const NONE: ChanState<never> = { data: undefined as never, loading: false, error: null }

function useChan<T>(make: () => Chan<T>, empty: T, deps: unknown[]): ChanState<T> {
  const ident = useSyncExternalStore(store.subscribeIdentity, () => `${store.getIdentity()?.guest}:${store.getIdentity()?.uid}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ch = useMemo(make, [ident, ...deps])
  const subscribe = useCallback((cb: () => void) => (ch ? ch.subscribe(cb) : NOOP_UNSUB), [ch])
  const snap = useCallback(() => (ch ? ch.getSnapshot() : (NONE as ChanState<T>)), [ch])
  const s = useSyncExternalStore(subscribe, snap)
  return ch ? s : { data: empty, loading: false, error: null }
}

/** Current user's profile. `profile` is null until onboarding saves one. */
export function useProfile(): { profile: Profile | null; loading: boolean; saveProfile: typeof store.saveProfile } {
  const s = useChan(store.profileChannel, null as Profile | null, [])
  return { profile: s.data, loading: s.loading, saveProfile: store.saveProfile }
}

export interface ProgressApi {
  progress: ProgressDoc
  loading: boolean
  setQuestionStatus: (qid: string, status: QuestionStatus | null) => Promise<void>
  toggleBookmark: (qid: string) => Promise<void>
  logPaper: (paperId: string, log: { done: true; score?: number; outOf?: number } | null) => Promise<void>
  setConfidence: (objectiveId: string, level: Confidence | null) => Promise<void>
}
const ALL_EMPTY: Partial<Record<SubjectId, ProgressDoc>> = {}

/** Progress for every subject, keyed by subjectId (missing key = no progress). Good for dashboards. */
export function useAllProgress(): { all: Partial<Record<SubjectId, ProgressDoc>>; loading: boolean } {
  const s = useChan(store.progressChannel, ALL_EMPTY, [])
  return { all: s.data, loading: s.loading }
}

/** Progress for one subject, with write actions already bound to that subject. */
export function useProgress(subjectId: SubjectId | undefined): ProgressApi {
  const { all, loading } = useAllProgress()
  return useMemo<ProgressApi>(() => {
    const sid = subjectId as SubjectId
    return {
      progress: (subjectId && all[subjectId]) || store.EMPTY_PROGRESS,
      loading,
      setQuestionStatus: (qid, st) => store.setQuestionStatus(sid, qid, st),
      toggleBookmark: (qid) => store.toggleBookmark(sid, qid),
      logPaper: (pid, log) => store.logPaper(sid, pid, log),
      setConfidence: (oid, lvl) => store.setConfidence(sid, oid, lvl),
    }
  }, [all, loading, subjectId])
}

/** Notes (pinned first, newest first), optionally filtered. Pass a stable/primitive-field filter; it is memoised on its fields. */
export function useNotes(filter?: NoteFilter): { notes: Note[]; loading: boolean } {
  const s = useChan(store.notesChannel, [] as Note[], [])
  const { subjectId, topicId, questionId } = filter ?? {}
  const notes = useMemo(() => store.filterNotes(s.data, { subjectId, topicId, questionId }), [s.data, subjectId, topicId, questionId])
  return { notes, loading: s.loading }
}

/** One note by id (null if not found / still loading). */
export function useNoteById(id: string | undefined): { note: Note | null; loading: boolean } {
  const { notes, loading } = useNotes()
  return { note: (id && notes.find((n) => n.id === id)) || null, loading }
}

/** Grades-tracker subjects. */
export function useGradeSubjects(): { subjects: GradeSubject[]; loading: boolean } {
  const s = useChan(store.gradeSubjectsChannel, [] as GradeSubject[], [])
  return { subjects: s.data, loading: s.loading }
}

/** Grades of one grades-tracker subject, newest first. */
export function useGrades(gradeSubjectId: string | undefined): { grades: Grade[]; loading: boolean } {
  const s = useChan(() => (gradeSubjectId ? store.gradesChannel(gradeSubjectId) : null), [] as Grade[], [gradeSubjectId])
  return { grades: s.data, loading: s.loading }
}

/** Whether this browser already joined a waitlist (reactive). */
export function useWaitlist(feature = 'coach'): { joined: boolean; join: (email?: string) => Promise<void> } {
  const joined = useSyncExternalStore(store.subscribeWaitlist, () => store.hasJoinedWaitlist(feature))
  return { joined, join: (email) => store.joinWaitlist(feature, email) }
}
