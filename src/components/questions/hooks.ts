import { useMemo } from 'react'
import type { Question, SubjectId } from '../../types/content'
import { useQuestions } from '../../hooks/useContent'

/** Questions tagged with a topic (empty while loading or while classification is pending). */
export function useTopicQuestions(subjectId: SubjectId | undefined, topicId: string | undefined) {
  const { data, loading } = useQuestions(subjectId)
  const questions = useMemo(
    () => (data && topicId ? data.filter((q) => q.topicIds.includes(topicId)) : []),
    [data, topicId],
  )
  return { questions, loading }
}

export interface QuestionCounts { total: number; marks: number; mcq: number; byLevel: { AS: number; A2: number } }

/** Small summary numbers for a list of questions. */
export function questionCounts(questions: Question[]): QuestionCounts {
  const c: QuestionCounts = { total: questions.length, marks: 0, mcq: 0, byLevel: { AS: 0, A2: 0 } }
  for (const q of questions) {
    c.marks += q.marks || 0
    if (q.mcqAnswer) c.mcq++
    c.byLevel[q.level]++
  }
  return c
}
