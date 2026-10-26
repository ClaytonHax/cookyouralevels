import { BookOpen, Dumbbell, Files, Flag, Target } from 'lucide-react'
import type { ComponentType } from 'react'
import { paperLabel } from '../../lib/content'
import { getSubject } from '../../lib/subjects'
import type { SubjectStats } from './useDashboardData'

export interface FocusItem {
  key: string
  icon: ComponentType<{ className?: string }>
  title: string
  text: string
  to: string
  subjectId: string
}

/** Up to three suggested next actions derived from the student's data. */
export function buildFocus(stats: SubjectStats[]): FocusItem[] {
  const out: FocusItem[] = []
  const short = (id: string) => getSubject(id)?.short ?? id
  const push = (i: FocusItem) => { if (!out.some((o) => o.key === i.key)) out.push(i) }

  // 1. lowest-confidence topic
  const weak = stats.filter((s) => s.weakest).sort((a, b) => a.weakest!.readiness.pct - b.weakest!.readiness.pct)[0]
  if (weak?.weakest) {
    const { topic, readiness } = weak.weakest
    push({
      key: `weak:${topic.id}`, icon: Target, subjectId: weak.id, to: `/s/${weak.id}/topic/${topic.id}`,
      title: `Strengthen ${topic.name}`,
      text: `${short(weak.id)} · ${readiness.pct}% ready${readiness.red ? `, ${readiness.red} objective${readiness.red === 1 ? '' : 's'} still red` : ''}. Open the hub and work through it.`,
    })
  }

  // 2. unfinished review questions
  const review = [...stats].sort((a, b) => b.reviewIds.length - a.reviewIds.length)[0]
  if (review && review.reviewIds.length) {
    push({
      key: `review:${review.id}`, icon: Flag, subjectId: review.id, to: `/s/${review.id}/questions?status=review`,
      title: `Revisit ${review.reviewIds.length} flagged question${review.reviewIds.length === 1 ? '' : 's'}`,
      text: `${short(review.id)} · You marked these for review. Nice moment to clear them.`,
    })
  }

  // 3. a paper not done yet
  const paper = stats.find((s) => s.nextPaper)
  if (paper?.nextPaper) {
    push({
      key: `paper:${paper.nextPaper.id}`, icon: Files, subjectId: paper.id, to: `/s/${paper.id}/papers`,
      title: 'Sit a past paper',
      text: `${short(paper.id)} · ${paperLabel(paper.nextPaper)}. Time yourself, then log the score.`,
    })
  }

  // Fallbacks for new users
  for (const s of stats) {
    if (out.length >= 3) break
    const first = s.loaded.syllabus.components[0]?.topics[0]
    if (first && s.readiness.rated === 0) {
      push({
        key: `rate:${s.id}`, icon: BookOpen, subjectId: s.id, to: `/s/${s.id}/topic/${first.id}`,
        title: `Rate your first ${short(s.id)} topic`,
        text: `Start with ${first.name}: mark each objective red, amber or green so we know where you stand.`,
      })
    }
  }
  for (const s of stats) {
    if (out.length >= 3) break
    if (s.freshTopic) {
      push({
        key: `practise:${s.id}:${s.freshTopic.id}`, icon: Dumbbell, subjectId: s.id, to: `/s/${s.id}/practice?topic=${s.freshTopic.id}&n=10`,
        title: `Practise 10 on ${s.freshTopic.name}`,
        text: `${short(s.id)} · Real exam questions, one at a time. Self-mark and keep going.`,
      })
    }
  }
  return out.slice(0, 3)
}
