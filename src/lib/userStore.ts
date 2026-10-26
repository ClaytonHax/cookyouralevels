// One API over two backends: Firestore (signed-in, Firebase configured) and localStorage (guest).
// Pages should use the hooks in src/hooks/useUserData.ts; call these functions directly for one-off actions.
// All write functions are optimistic and NEVER reject: failures are reported through onStoreError (AppShell shows a toast).
import {
  collection, deleteDoc, deleteField, doc, getDocs, onSnapshot, setDoc, writeBatch,
} from 'firebase/firestore'
import { db } from './firebase'
import type { SessionCode, SubjectId } from '../types/content'

// ---------------------------------------------------------------- types

export interface Profile {
  displayName: string
  subjects: SubjectId[]
  examYear: number
  examSession: SessionCode
  createdAt: number
}
export type QuestionStatus = 'tried' | 'done' | 'review'
/** `s` status, `b` bookmarked, `t` last-updated ms. */
export interface QuestionProgress { s?: QuestionStatus; b?: true; t: number }
export interface PaperLog { done: true; score?: number; outOf?: number; t: number }
export type Confidence = 1 | 2 | 3 // 1 red, 2 amber, 3 green
export interface ProgressDoc {
  questions: Record<string, QuestionProgress>
  papers: Record<string, PaperLog>
  confidence: Record<string, Confidence>
}
export interface Note {
  id: string
  title: string
  body: string
  subjectId?: SubjectId
  topicId?: string
  questionId?: string
  pinned: boolean
  createdAt: number
  updatedAt: number
}
export type NoteInput = Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>
export interface NoteFilter { subjectId?: SubjectId; topicId?: string; questionId?: string }
/** grades-tracker compatible subject doc (users/{uid}/subjects/{id}). */
export interface GradeSubject { id: string; name: string; code?: string; target: string; syllabus?: string; createdAt?: number }
export interface Grade { id: string; title: string; type: string; grade: string; weight: number; date: string; createdAt?: number }
export type GradeSubjectInput = Omit<GradeSubject, 'id' | 'createdAt'>
export type GradeInput = Omit<Grade, 'id' | 'createdAt'>

export interface Identity { uid: string; guest: boolean }

export const EMPTY_PROGRESS: ProgressDoc = Object.freeze({ questions: {}, papers: {}, confidence: {} }) as ProgressDoc

// ---------------------------------------------------------------- identity & errors

let identity: Identity | null = null
const identityListeners = new Set<() => void>()

/** Called by AuthProvider. Do not call from pages. */
export function setIdentity(next: Identity | null): void {
  if (identity?.uid === next?.uid && identity?.guest === next?.guest) return
  identity = next
  identityListeners.forEach((l) => l())
}
export function getIdentity(): Identity | null { return identity }
export function subscribeIdentity(cb: () => void): () => void {
  identityListeners.add(cb)
  return () => { identityListeners.delete(cb) }
}

let errorHandler: ((message: string) => void) | null = null
/** Register a handler for failed writes (returns unsubscribe). */
export function onStoreError(cb: (message: string) => void): () => void {
  errorHandler = cb
  return () => { if (errorHandler === cb) errorHandler = null }
}
function report(e: unknown, what: string) {
  console.error(`[userStore] ${what}`, e)
  errorHandler?.(`Couldn't save: ${what}. Check your connection and try again.`)
}
const remote = () => (identity && !identity.guest && db ? { uid: identity.uid, db } : null)
const now = () => Date.now()

// ---------------------------------------------------------------- local (guest) backend

interface LocalData {
  profile: Profile | null
  progress: Partial<Record<SubjectId, ProgressDoc>>
  notes: Record<string, Note>
  gradeSubjects: Record<string, GradeSubject>
  grades: Record<string, Record<string, Grade>>
  waitlist: Record<string, { email?: string; t: number }>
}
const LOCAL_KEY = 'cyal.guest.data.v1'
const DEL = '__cyal_delete__'
const blank = (): LocalData => ({ profile: null, progress: {}, notes: {}, gradeSubjects: {}, grades: {}, waitlist: {} })

let local: LocalData | null = null
const localListeners = new Set<() => void>()

function loadLocal(): LocalData {
  if (local) return local
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    local = raw ? { ...blank(), ...JSON.parse(raw) } : blank()
  } catch { local = blank() }
  return local!
}
function persistLocal() {
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(local)) } catch (e) { report(e, 'browser storage is full or blocked') }
  localListeners.forEach((l) => l())
}
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === LOCAL_KEY) { local = null; localListeners.forEach((l) => l()) }
  })
}
function deepMerge(target: Record<string, unknown>, patch: Record<string, unknown>) {
  for (const [k, v] of Object.entries(patch)) {
    if (v === DEL) delete target[k]
    else if (v && typeof v === 'object' && !Array.isArray(v)) {
      const cur = target[k]
      const obj = cur && typeof cur === 'object' ? (cur as Record<string, unknown>) : {}
      target[k] = obj
      deepMerge(obj, v as Record<string, unknown>)
    } else target[k] = v
  }
}
const sentinel = () => (remote() ? deleteField() : DEL)

/** Export guest data as JSON text (for Settings). */
export function exportGuestData(): string { return JSON.stringify(loadLocal(), null, 2) }
/** Wipe all guest data on this device. */
export function clearGuestData(): void {
  local = blank()
  try { localStorage.removeItem(LOCAL_KEY) } catch { /* ignore */ }
  localListeners.forEach((l) => l())
}

// ---------------------------------------------------------------- channels (shared live subscriptions)

export interface ChanState<T> { data: T; loading: boolean; error: Error | null }
interface Chan<T> {
  state: ChanState<T>
  listeners: Set<() => void>
  stop?: () => void
  timer?: ReturnType<typeof setTimeout>
  sig: string
}
const chans = new Map<string, Chan<unknown>>()

type Starter<T> = (set: (d: T) => void, fail: (e: Error) => void) => () => void

export interface Channel<T> { getSnapshot: () => ChanState<T>; subscribe: (cb: () => void) => () => void }

/** Get-or-create the channel and expose subscribe/getSnapshot for useSyncExternalStore. */
export function channel<T>(key: string, init: T, start: Starter<T>): Channel<T> {
  const get = (): Chan<T> => {
    let c = chans.get(key) as Chan<T> | undefined
    if (!c) {
      c = { state: { data: init, loading: true, error: null }, listeners: new Set(), sig: '' }
      chans.set(key, c as Chan<unknown>)
    }
    return c
  }
  return {
    getSnapshot: () => get().state,
    subscribe: (cb: () => void) => {
      const c = get()
      if (c.timer) { clearTimeout(c.timer); c.timer = undefined }
      c.listeners.add(cb)
      if (!c.stop) {
        const emit = () => c.listeners.forEach((l) => l())
        c.stop = start(
          (data) => {
            const sig = JSON.stringify(data)
            if (sig === c.sig && !c.state.loading) return
            c.sig = sig
            c.state = { data, loading: false, error: null }
            emit()
          },
          (error) => { c.state = { data: init, loading: false, error }; emit() },
        )
      }
      return () => {
        c.listeners.delete(cb)
        if (c.listeners.size === 0) {
          c.timer = setTimeout(() => { c.stop?.(); chans.delete(key) }, 30_000)
        }
      }
    },
  }
}

const idKey = () => (identity ? `${identity.guest ? 'g' : 'u'}:${identity.uid}` : 'none')

function localStarter<T>(read: (d: LocalData) => T): Starter<T> {
  return (set) => {
    const push = () => set(read(loadLocal()))
    localListeners.add(push)
    push()
    return () => { localListeners.delete(push) }
  }
}

/** Returns a ready channel for the current identity, or null if signed out. */
function pick<T>(name: string, init: T, readLocal: (d: LocalData) => T, startRemote: (r: { uid: string; db: NonNullable<typeof db> }) => Starter<T>): Channel<T> | null {
  if (!identity) return null
  const r = remote()
  return channel<T>(`${idKey()}:${name}`, init, r ? startRemote(r) : localStarter(readLocal))
}

// ---------------------------------------------------------------- normalisers

type Ts = number | { toMillis?: () => number } | undefined
const ms = (v: Ts): number | undefined => (typeof v === 'number' ? v : v && typeof v.toMillis === 'function' ? v.toMillis() : undefined)

function normProgress(raw: Partial<ProgressDoc> | undefined): ProgressDoc {
  const questions: ProgressDoc['questions'] = {}
  for (const [k, v] of Object.entries(raw?.questions ?? {})) if (v && (v.s || v.b)) questions[k] = v
  return { questions, papers: raw?.papers ?? {}, confidence: raw?.confidence ?? {} }
}
const emptyStr = (v: unknown) => (typeof v === 'string' ? v : '')
function normNote(id: string, d: Record<string, unknown>): Note {
  return {
    id, title: emptyStr(d.title), body: emptyStr(d.body),
    subjectId: d.subjectId as SubjectId | undefined, topicId: d.topicId as string | undefined, questionId: d.questionId as string | undefined,
    pinned: Boolean(d.pinned), createdAt: ms(d.createdAt as Ts) ?? 0, updatedAt: ms(d.updatedAt as Ts) ?? 0,
  }
}
const sortNotes = (a: Note, b: Note) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt

// ---------------------------------------------------------------- live channels (used by hooks)

export const profileChannel = () => pick<Profile | null>('profile', null,
  (d) => d.profile,
  ({ uid, db }) => (set, fail) => onSnapshot(doc(db, 'users', uid), (s) => {
    const d = s.data()
    set(d && Array.isArray(d.subjects) ? ({ displayName: '', examYear: new Date().getFullYear() + 1, examSession: 's', ...d, createdAt: ms(d.createdAt) ?? 0 } as Profile) : null)
  }, fail))

export const progressChannel = () => pick<Partial<Record<SubjectId, ProgressDoc>>>('progress', {},
  (d) => Object.fromEntries(Object.entries(d.progress).map(([k, v]) => [k, normProgress(v)])),
  ({ uid, db }) => (set, fail) => onSnapshot(collection(db, 'users', uid, 'progress'), (snap) => {
    set(Object.fromEntries(snap.docs.map((d) => [d.id, normProgress(d.data() as Partial<ProgressDoc>)])))
  }, fail))

export const notesChannel = () => pick<Note[]>('notes', [],
  (d) => Object.values(d.notes).sort(sortNotes),
  ({ uid, db }) => (set, fail) => onSnapshot(collection(db, 'users', uid, 'notes'), (snap) => {
    set(snap.docs.map((d) => normNote(d.id, d.data())).sort(sortNotes))
  }, fail))

export const gradeSubjectsChannel = () => pick<GradeSubject[]>('gsubjects', [],
  (d) => Object.values(d.gradeSubjects).sort((a, b) => a.name.localeCompare(b.name)),
  ({ uid, db }) => (set, fail) => onSnapshot(collection(db, 'users', uid, 'subjects'), (snap) => {
    set(snap.docs.map((d) => {
      const x = d.data()
      return { id: d.id, name: emptyStr(x.name), code: x.code, target: emptyStr(x.target) || 'A', syllabus: x.syllabus, createdAt: ms(x.createdAt) } as GradeSubject
    }).sort((a, b) => a.name.localeCompare(b.name)))
  }, fail))

export const gradesChannel = (subjectId: string) => pick<Grade[]>(`grades:${subjectId}`, [],
  (d) => Object.values(d.grades[subjectId] ?? {}).sort((a, b) => b.date.localeCompare(a.date)),
  ({ uid, db }) => (set, fail) => onSnapshot(collection(db, 'users', uid, 'subjects', subjectId, 'grades'), (snap) => {
    set(snap.docs.map((d) => {
      const x = d.data()
      return { id: d.id, title: emptyStr(x.title), type: emptyStr(x.type), grade: emptyStr(x.grade), weight: Number(x.weight) || 0, date: emptyStr(x.date), createdAt: ms(x.createdAt) } as Grade
    }).sort((a, b) => b.date.localeCompare(a.date)))
  }, fail))

/** Filter helper shared by hooks. */
export function filterNotes(notes: Note[], f?: NoteFilter): Note[] {
  if (!f) return notes
  return notes.filter((n) =>
    (!f.subjectId || n.subjectId === f.subjectId) &&
    (!f.topicId || n.topicId === f.topicId) &&
    (!f.questionId || n.questionId === f.questionId))
}

// ---------------------------------------------------------------- writes

async function run(what: string, fn: () => Promise<void> | void) {
  try { await fn() } catch (e) { report(e, what) }
}
const clean = <T extends object>(o: T): T => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as T

/** Merge fields into the profile (creates it with defaults on first save). */
export function saveProfile(patch: Partial<Omit<Profile, 'createdAt'>>): Promise<void> {
  return run('your profile', async () => {
    if (!identity) return
    const r = remote()
    const base = { displayName: '', subjects: [] as SubjectId[], examYear: new Date().getFullYear() + 1, examSession: 's' as SessionCode }
    if (r) {
      // Only stamp createdAt when we KNOW the profile doesn't exist yet (snapshot loaded and empty).
      const snap = profileChannel()?.getSnapshot()
      const isNew = !!snap && !snap.loading && !snap.data
      await setDoc(doc(r.db, 'users', r.uid), clean({ ...patch, ...(isNew ? { createdAt: now() } : {}) }), { merge: true })
    } else {
      const d = loadLocal()
      d.profile = { ...base, createdAt: now(), ...(d.profile ?? {}), ...clean(patch) } as Profile
      persistLocal()
    }
  })
}

async function patchProgress(subjectId: SubjectId, patch: Record<string, unknown>) {
  const r = remote()
  if (r) await setDoc(doc(r.db, 'users', r.uid, 'progress', subjectId), patch, { merge: true })
  else {
    const d = loadLocal()
    const cur = (d.progress[subjectId] ?? { questions: {}, papers: {}, confidence: {} }) as unknown as Record<string, unknown>
    deepMerge(cur, patch)
    d.progress[subjectId] = cur as unknown as ProgressDoc
    persistLocal()
  }
}
function currentProgress(subjectId: SubjectId): ProgressDoc {
  if (!remote()) return normProgress(loadLocal().progress[subjectId])
  return progressChannel()?.getSnapshot().data[subjectId] ?? EMPTY_PROGRESS
}

/** Set (or clear with null) the status of a question. */
export function setQuestionStatus(subjectId: SubjectId, qid: string, status: QuestionStatus | null): Promise<void> {
  return run('question progress', () => patchProgress(subjectId, { questions: { [qid]: { s: status ?? sentinel(), t: now() } } }))
}
/** Toggle the bookmark flag on a question. */
export function toggleBookmark(subjectId: SubjectId, qid: string): Promise<void> {
  const on = currentProgress(subjectId).questions[qid]?.b === true
  return run('bookmark', () => patchProgress(subjectId, { questions: { [qid]: { b: on ? sentinel() : true, t: now() } } }))
}
/** Log a past paper as done (with optional score) or clear it with null. */
export function logPaper(subjectId: SubjectId, paperId: string, log: { done: true; score?: number; outOf?: number } | null): Promise<void> {
  return run('paper log', () => patchProgress(subjectId, {
    papers: { [paperId]: log ? clean({ done: true, score: log.score, outOf: log.outOf, t: now() }) : sentinel() },
  }))
}
/** Rate confidence on a learning objective (1 red, 2 amber, 3 green) or clear with null. */
export function setConfidence(subjectId: SubjectId, objectiveId: string, level: Confidence | null): Promise<void> {
  return run('confidence', () => patchProgress(subjectId, { confidence: { [objectiveId]: level ?? sentinel() } }))
}

// ---- notes

/** Create a note and return its id immediately (write is optimistic). */
export function createNote(input: NoteInput = {}): string {
  const r = remote()
  const id = r ? doc(collection(r.db, 'users', r.uid, 'notes')).id : (crypto.randomUUID?.() ?? `n${now()}${Math.random().toString(36).slice(2, 8)}`)
  const t = now()
  const note = clean({ title: '', body: '', pinned: false, ...input, createdAt: t, updatedAt: t })
  void run('your note', async () => {
    if (r) await setDoc(doc(r.db, 'users', r.uid, 'notes', id), note)
    else { loadLocal().notes[id] = { id, ...note } as Note; persistLocal() }
  })
  return id
}
/** Patch a note (updatedAt is set automatically). Pass `undefined`-free fields only; use null-ish '' to clear text. */
export function updateNote(id: string, patch: NoteInput): Promise<void> {
  return run('your note', async () => {
    const r = remote()
    const p = { ...clean(patch), updatedAt: now() }
    if (r) await setDoc(doc(r.db, 'users', r.uid, 'notes', id), p, { merge: true })
    else {
      const d = loadLocal()
      if (d.notes[id]) { d.notes[id] = { ...d.notes[id], ...p }; persistLocal() }
    }
  })
}
export function deleteNote(id: string): Promise<void> {
  return run('deleting the note', async () => {
    const r = remote()
    if (r) await deleteDoc(doc(r.db, 'users', r.uid, 'notes', id))
    else { delete loadLocal().notes[id]; persistLocal() }
  })
}

// ---- grades (grades-tracker compatible: users/{uid}/subjects/{id}[/grades/{gid}])

/** Add a grade subject; returns its id immediately. */
export function addGradeSubject(input: GradeSubjectInput): string {
  const r = remote()
  const id = r ? doc(collection(r.db, 'users', r.uid, 'subjects')).id : crypto.randomUUID()
  const data = clean({ ...input, target: input.target || 'A', createdAt: now() })
  void run('subject', async () => {
    if (r) await setDoc(doc(r.db, 'users', r.uid, 'subjects', id), data)
    else { loadLocal().gradeSubjects[id] = { id, ...data } as GradeSubject; persistLocal() }
  })
  return id
}
export function updateGradeSubject(id: string, patch: Partial<GradeSubjectInput>): Promise<void> {
  return run('subject', async () => {
    const r = remote()
    if (r) await setDoc(doc(r.db, 'users', r.uid, 'subjects', id), clean(patch), { merge: true })
    else { const d = loadLocal(); if (d.gradeSubjects[id]) { d.gradeSubjects[id] = { ...d.gradeSubjects[id], ...clean(patch) }; persistLocal() } }
  })
}
/** Deletes the subject and all its grades. */
export function deleteGradeSubject(id: string): Promise<void> {
  return run('deleting the subject', async () => {
    const r = remote()
    if (r) {
      const snap = await getDocs(collection(r.db, 'users', r.uid, 'subjects', id, 'grades'))
      const batch = writeBatch(r.db)
      snap.docs.forEach((d) => batch.delete(d.ref))
      batch.delete(doc(r.db, 'users', r.uid, 'subjects', id))
      await batch.commit()
    } else { const d = loadLocal(); delete d.gradeSubjects[id]; delete d.grades[id]; persistLocal() }
  })
}
/** Add a grade; returns its id immediately. */
export function addGrade(subjectId: string, input: GradeInput): string {
  const r = remote()
  const id = r ? doc(collection(r.db, 'users', r.uid, 'subjects', subjectId, 'grades')).id : crypto.randomUUID()
  const data = { ...input, weight: Number(input.weight) || 0, createdAt: now() }
  void run('grade', async () => {
    if (r) await setDoc(doc(r.db, 'users', r.uid, 'subjects', subjectId, 'grades', id), data)
    else { const d = loadLocal(); (d.grades[subjectId] ??= {})[id] = { id, ...data }; persistLocal() }
  })
  return id
}
export function updateGrade(subjectId: string, id: string, patch: Partial<GradeInput>): Promise<void> {
  return run('grade', async () => {
    const r = remote()
    const p = clean({ ...patch, ...(patch.weight !== undefined ? { weight: Number(patch.weight) || 0 } : {}) })
    if (r) await setDoc(doc(r.db, 'users', r.uid, 'subjects', subjectId, 'grades', id), p, { merge: true })
    else { const g = loadLocal().grades[subjectId]; if (g?.[id]) { g[id] = { ...g[id], ...p }; persistLocal() } }
  })
}
export function deleteGrade(subjectId: string, id: string): Promise<void> {
  return run('deleting the grade', async () => {
    const r = remote()
    if (r) await deleteDoc(doc(r.db, 'users', r.uid, 'subjects', subjectId, 'grades', id))
    else { delete loadLocal().grades[subjectId]?.[id]; persistLocal() }
  })
}

// ---- waitlist

const waitKey = (f: string) => `cyal.waitlist.${f}`
/** True if this browser already joined the waitlist for a feature. */
export function hasJoinedWaitlist(feature = 'coach'): boolean {
  try { return localStorage.getItem(waitKey(feature)) === '1' } catch { return false }
}
/** Join a feature waitlist (Firestore waitlist/{uid} when signed in; always remembered locally). */
export function joinWaitlist(feature = 'coach', email?: string): Promise<void> {
  return run('joining the waitlist', async () => {
    const r = remote()
    if (r) await setDoc(doc(r.db, 'waitlist', r.uid), clean({ feature, email, createdAt: now() }), { merge: true })
    else { loadLocal().waitlist[feature] = clean({ email, t: now() }) as { email?: string; t: number }; persistLocal() }
    try { localStorage.setItem(waitKey(feature), '1') } catch { /* ignore */ }
    waitListeners.forEach((l) => l())
  })
}
const waitListeners = new Set<() => void>()
export function subscribeWaitlist(cb: () => void): () => void {
  waitListeners.add(cb)
  return () => { waitListeners.delete(cb) }
}
