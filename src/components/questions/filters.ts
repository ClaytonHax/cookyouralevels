import type { Question } from '../../types/content'

export interface QFilters {
  q: string; topic: string; paper: string; year: string; session: string; level: string; status: string; sort: string
}
export const FILTER_KEYS = ['q', 'topic', 'paper', 'year', 'session', 'level', 'status', 'sort'] as const
export type QStatusMap = Record<string, { s?: 'tried' | 'done' | 'review'; b?: true } | undefined>

export function readFilters(sp: URLSearchParams): QFilters {
  const g = (k: string) => sp.get(k) ?? ''
  return { q: g('q'), topic: g('topic'), paper: g('paper'), year: g('year'), session: g('session'), level: g('level'), status: g('status'), sort: g('sort') || 'newest' }
}

/** Count of active (non-default) filters, excluding sort. */
export function activeFilterCount(f: QFilters) {
  return (['q', 'topic', 'paper', 'year', 'session', 'level', 'status'] as const).filter((k) => f[k]).length
}

const sessionRank = { m: 1, s: 2, w: 3 } as const

export function sortQuestions(list: Question[], sort: string): Question[] {
  const out = [...list]
  const chrono = (a: Question, b: Question) =>
    a.year - b.year || sessionRank[a.session] - sessionRank[b.session] || a.paper - b.paper || a.variant - b.variant || a.number - b.number
  if (sort === 'oldest') out.sort(chrono)
  else if (sort === 'marks') out.sort((a, b) => b.marks - a.marks || chrono(b, a))
  else out.sort((a, b) => -chrono(a, b))
  return out
}

export function applyFilters(questions: Question[], f: QFilters, progress: QStatusMap): Question[] {
  const terms = f.q.toLowerCase().split(/\s+/).filter(Boolean)
  const list = questions.filter((q) => {
    if (f.topic && !q.topicIds.includes(f.topic)) return false
    if (f.paper && (/^\d+$/.test(f.paper) ? String(q.paper) !== f.paper : q.paperId !== f.paper)) return false
    if (f.year && String(q.year) !== f.year) return false
    if (f.session && q.session !== f.session) return false
    if (f.level && q.level !== f.level) return false
    if (f.status) {
      const p = progress[q.id]
      if (f.status === 'untried' && p?.s) return false
      if (f.status === 'bookmarked' && !p?.b) return false
      if ((f.status === 'tried' || f.status === 'done' || f.status === 'review') && p?.s !== f.status) return false
    }
    if (terms.length) {
      const hay = `${q.text} q${q.number} ${q.paperId} ${q.year}`.toLowerCase()
      if (!terms.every((t) => hay.includes(t))) return false
    }
    return true
  })
  return sortQuestions(list, f.sort)
}

/**
 * "from" context strings (passed as ?from= to the question view):
 *   topic:<topicId>      questions of a topic
 *   paper:<paperId>      questions of a paper
 *   bank:<querystring>   the question bank with those filters
 *   practice             (no list; view falls back to the same paper)
 */
export function questionsForFrom(from: string | null, all: Question[], progress: QStatusMap): Question[] | null {
  if (!from) return null
  const i = from.indexOf(':')
  const kind = i < 0 ? from : from.slice(0, i)
  const rest = i < 0 ? '' : from.slice(i + 1)
  if (kind === 'topic') return sortQuestions(all.filter((q) => q.topicIds.includes(rest)), 'oldest')
  if (kind === 'paper') return all.filter((q) => q.paperId === rest).sort((a, b) => a.number - b.number)
  if (kind === 'bank') return applyFilters(all, readFilters(new URLSearchParams(rest)), progress)
  return null
}

/** Path back to the list a "from" string refers to. */
export function backPathForFrom(subjectId: string, from: string | null): { to: string; label: string } {
  const base = `/s/${subjectId}`
  if (from?.startsWith('topic:')) return { to: `${base}/topic/${from.slice(6)}`, label: 'Back to topic' }
  if (from?.startsWith('bank:')) { const qs = from.slice(5); return { to: `${base}/questions${qs ? `?${qs}` : ''}`, label: 'Back to questions' } }
  return { to: `${base}/questions`, label: 'Back to questions' }
}
