// Cached fetchers + helpers for the static content in public/data/**. Never throws: missing files give empty data.
import type {
  Objective, PaperRef, Question, SessionCode, SubjectId, Syllabus, SyllabusComponent, SyllabusTopic,
} from '../types/content'
import { getSubject } from './subjects'

const cache = new Map<string, Promise<unknown>>()
const resolved = new Map<string, unknown>()

function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  let p = cache.get(key) as Promise<T> | undefined
  if (!p) {
    p = load().then((v) => { resolved.set(key, v); return v })
    cache.set(key, p)
  }
  return p
}

/** Synchronously read an already-fetched value (used by hooks to avoid loading flicker). */
export function peek<T>(key: string): T | undefined {
  return resolved.get(key) as T | undefined
}

async function fetchText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const ct = res.headers.get('content-type') ?? ''
    const text = await res.text()
    // SPA fallbacks answer 200 with index.html for missing files
    if (ct.includes('text/html') || /^\s*<!doctype html/i.test(text) || /^\s*<html/i.test(text)) return null
    return text
  } catch {
    return null
  }
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const text = await fetchText(url)
  if (text == null) return null
  try { return JSON.parse(text) as T } catch { return null }
}

export const keys = {
  syllabus: (id: SubjectId) => `syllabus:${id}`,
  papers: (id: SubjectId) => `papers:${id}`,
  questions: (id: SubjectId) => `questions:${id}`,
  note: (id: SubjectId, topicId: string) => `note:${id}:${topicId}`,
  notesIndex: (id: SubjectId) => `notes-index:${id}`,
}

/** An empty syllabus (components: []) is returned when the file is missing. */
export function emptySyllabus(id: SubjectId): Syllabus {
  const s = getSubject(id)
  return { subjectId: id, code: s?.code ?? '', name: s?.name ?? id, version: '', pdfUrl: '', components: [] }
}

/** Syllabus for a subject; empty (no components) if missing. */
export function getSyllabus(id: SubjectId): Promise<Syllabus> {
  return cached(keys.syllabus(id), async () => {
    const s = await fetchJson<Syllabus>(`/data/${id}/syllabus.json`)
    return s && Array.isArray(s.components) ? s : emptySyllabus(id)
  })
}

/** Past paper list (2016 onwards); [] if missing. */
export function getPapers(id: SubjectId): Promise<PaperRef[]> {
  return cached(keys.papers(id), async () => {
    const p = await fetchJson<PaperRef[]>(`/data/${id}/papers.json`)
    return Array.isArray(p) ? p : []
  })
}

/** All extracted questions for a subject; [] if missing. */
export function getQuestions(id: SubjectId): Promise<Question[]> {
  return cached(keys.questions(id), async () => {
    const q = await fetchJson<Question[]>(`/data/${id}/questions.json`)
    return Array.isArray(q) ? q : []
  })
}

/** Curated markdown notes for a topic; null if none exist. */
export function getNote(id: SubjectId, topicId: string): Promise<string | null> {
  return cached(keys.note(id, topicId), () => fetchText(`/data/${id}/notes/${encodeURIComponent(topicId)}.md`))
}

/** topicIds that have curated notes; [] if missing. */
export function getNotesIndex(id: SubjectId): Promise<string[]> {
  return cached(keys.notesIndex(id), async () => {
    const i = await fetchJson<string[]>(`/data/${id}/notes/index.json`)
    return Array.isArray(i) ? i : []
  })
}

// ---------- syllabus helpers ----------

/** Every topic in a syllabus, in order. */
export function allTopics(s: Syllabus | null | undefined): SyllabusTopic[] {
  return s ? s.components.flatMap((c) => c.topics) : []
}

/** Find a topic by id. */
export function topicById(s: Syllabus | null | undefined, topicId: string | undefined): SyllabusTopic | undefined {
  if (!s || !topicId) return undefined
  for (const c of s.components) for (const t of c.topics) if (t.id === topicId) return t
  return undefined
}

/** The component a topic belongs to. */
export function componentForTopic(s: Syllabus | null | undefined, topicId: string | undefined): SyllabusComponent | undefined {
  if (!s || !topicId) return undefined
  return s.components.find((c) => c.topics.some((t) => t.id === topicId))
}

/** Learning objectives of a topic ([] if unknown topic). */
export function objectivesFor(s: Syllabus | null | undefined, topicId: string | undefined): Objective[] {
  return topicById(s, topicId)?.objectives ?? []
}

/** All objectives across the syllabus. */
export function allObjectives(s: Syllabus | null | undefined): Objective[] {
  return allTopics(s).flatMap((t) => t.objectives)
}

/** Look up a single objective by id. */
export function objectiveById(s: Syllabus | null | undefined, objectiveId: string): Objective | undefined {
  return allObjectives(s).find((o) => o.id === objectiveId)
}

// ---------- labels ----------

const SESSION_NAMES: Record<SessionCode, string> = { m: 'Feb/March', s: 'May/June', w: 'Oct/Nov' }

/** 'm' → 'Feb/March', 's' → 'May/June', 'w' → 'Oct/Nov'. */
export function sessionName(code: SessionCode): string {
  return SESSION_NAMES[code] ?? code
}

/** "May/June 2024 · Paper 2 · Variant 2" for a PaperRef or Question. */
export function paperLabel(p: Pick<PaperRef, 'session' | 'year' | 'paper' | 'variant'>): string {
  return `${sessionName(p.session)} ${p.year} · Paper ${p.paper} · Variant ${p.variant}`
}
