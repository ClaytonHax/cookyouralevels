import { useEffect, useState } from 'react'
import type { PaperRef, Question, SubjectId, Syllabus } from '../types/content'
import { getNote, getNotesIndex, getPapers, getQuestions, getSyllabus, keys, peek } from '../lib/content'

export interface AsyncState<T> {
  /** null until loaded (or when `id` is undefined). Missing files resolve to empty data, never null, except notes. */
  data: T | null
  loading: boolean
  error: Error | null
}

function useCached<T>(key: string | null, load: () => Promise<T>): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>(() => {
    const hit = key ? peek<T>(key) : undefined
    return { data: hit !== undefined ? hit : null, loading: key !== null && hit === undefined, error: null }
  })
  useEffect(() => {
    if (!key) { setState({ data: null, loading: false, error: null }); return }
    const hit = peek<T>(key)
    if (hit !== undefined) { setState({ data: hit, loading: false, error: null }); return }
    let live = true
    setState({ data: null, loading: true, error: null })
    load().then(
      (data) => live && setState({ data, loading: false, error: null }),
      (error) => live && setState({ data: null, loading: false, error: error as Error }),
    )
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return state
}

/** Syllabus of a subject (empty components if file missing). */
export function useSyllabus(id: SubjectId | undefined): AsyncState<Syllabus> {
  return useCached(id ? keys.syllabus(id) : null, () => getSyllabus(id!))
}
/** All questions of a subject ([] if missing). */
export function useQuestions(id: SubjectId | undefined): AsyncState<Question[]> {
  return useCached(id ? keys.questions(id) : null, () => getQuestions(id!))
}
/** Past papers of a subject ([] if missing). */
export function usePapers(id: SubjectId | undefined): AsyncState<PaperRef[]> {
  return useCached(id ? keys.papers(id) : null, () => getPapers(id!))
}
/** Curated markdown note for a topic; data is null (loading=false) if none exists. */
export function useNote(id: SubjectId | undefined, topicId: string | undefined): AsyncState<string> {
  return useCached<string | null>(id && topicId ? keys.note(id, topicId) : null, () => getNote(id!, topicId!)) as AsyncState<string>
}
/** topicIds with curated notes. */
export function useNotesIndex(id: SubjectId | undefined): AsyncState<string[]> {
  return useCached(id ? keys.notesIndex(id) : null, () => getNotesIndex(id!))
}
