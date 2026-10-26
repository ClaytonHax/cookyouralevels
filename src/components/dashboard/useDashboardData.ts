import { useEffect, useMemo, useState } from 'react'
import type { PaperRef, Question, SubjectId, Syllabus, SyllabusTopic } from '../../types/content'
import { getNotesIndex, getPapers, getQuestions, getSyllabus, allTopics, topicById } from '../../lib/content'
import { useAllProgress } from '../../hooks/useUserData'
import { subjectReadiness, topicReadiness } from '../../lib/progress'
import type { Readiness } from '../../lib/progress'
import { EMPTY_PROGRESS } from '../../lib/userStore'
import type { ProgressDoc } from '../../lib/userStore'

export interface Loaded { syllabus: Syllabus; questions: Question[]; papers: PaperRef[]; notesIndex: string[] }

/** Loads (cached) static content for the given subjects. */
export function useLoadedContent(ids: SubjectId[]): { content: Partial<Record<SubjectId, Loaded>>; loading: boolean } {
  const key = ids.join('|')
  const [content, setContent] = useState<Partial<Record<SubjectId, Loaded>>>({})
  const [doneKey, setDoneKey] = useState('')
  useEffect(() => {
    let live = true
    Promise.all(
      ids.map(async (id) => {
        const [syllabus, questions, papers, notesIndex] = await Promise.all([getSyllabus(id), getQuestions(id), getPapers(id), getNotesIndex(id)])
        return [id, { syllabus, questions, papers, notesIndex }] as const
      }),
    ).then((rows) => {
      if (!live) return
      setContent(Object.fromEntries(rows))
      setDoneKey(key)
    })
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return { content, loading: doneKey !== key }
}

export interface WeakTopic { topic: SyllabusTopic; readiness: Readiness }
export interface LastTouched { question: Question; t: number; topic?: SyllabusTopic }

export interface SubjectStats {
  id: SubjectId
  loaded: Loaded
  progress: ProgressDoc
  readiness: Readiness
  questionsDone: number
  questionsTotal: number
  reviewIds: string[]
  papersDone: number
  papersTotal: number
  last?: LastTouched
  weakest?: WeakTopic
  nextPaper?: PaperRef
  /** Topic with most questions where the student hasn't finished any. */
  freshTopic?: SyllabusTopic
  hasActivity: boolean
}

export function computeStats(id: SubjectId, loaded: Loaded, progress: ProgressDoc): SubjectStats {
  const { syllabus, questions, papers } = loaded
  const qById = new Map(questions.map((q) => [q.id, q]))
  let questionsDone = 0
  const reviewIds: string[] = []
  let last: LastTouched | undefined
  for (const [qid, p] of Object.entries(progress.questions)) {
    const q = qById.get(qid)
    if (!q) continue
    if (p.s === 'done') questionsDone++
    if (p.s === 'review') reviewIds.push(qid)
    if (!last || p.t > last.t) last = { question: q, t: p.t, topic: topicById(syllabus, q.topicIds[0]) }
  }
  const papersDone = papers.filter((p) => progress.papers[p.id]?.done).length

  let weakest: WeakTopic | undefined
  for (const topic of allTopics(syllabus)) {
    const r = topicReadiness(syllabus, topic.id, progress)
    if (r.rated === 0 || r.pct >= 100) continue
    if (!weakest || r.pct < weakest.readiness.pct) weakest = { topic, readiness: r }
  }

  const nextPaper = papers
    .filter((p) => !progress.papers[p.id]?.done)
    .sort((a, b) => Number(b.hasQuestions) - Number(a.hasQuestions) || b.year - a.year)[0]

  const perTopic = new Map<string, number>()
  for (const q of questions) {
    const tid = q.topicIds[0]
    if (tid && progress.questions[q.id]?.s !== 'done') perTopic.set(tid, (perTopic.get(tid) ?? 0) + 1)
  }
  const top = [...perTopic.entries()].sort((a, b) => b[1] - a[1])[0]

  const readiness = subjectReadiness(syllabus, progress)
  return {
    id, loaded, progress, readiness, questionsDone, questionsTotal: questions.length, reviewIds,
    papersDone, papersTotal: papers.length, last, weakest, nextPaper,
    freshTopic: top ? topicById(syllabus, top[0]) : undefined,
    hasActivity: readiness.rated > 0 || Object.keys(progress.questions).length > 0 || papersDone > 0,
  }
}

/** Everything the dashboard and coach need, computed from content + the user's progress. */
export function useDashboardData(ids: SubjectId[]) {
  const { content, loading } = useLoadedContent(ids)
  const { all, loading: pLoading } = useAllProgress()
  const stats = useMemo(
    () => ids.filter((id) => content[id]).map((id) => computeStats(id, content[id]!, all[id] ?? EMPTY_PROGRESS)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ids.join('|'), content, all],
  )
  return { stats, loading: loading || pLoading }
}
