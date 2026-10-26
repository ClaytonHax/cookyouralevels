import type { Syllabus } from '../types/content'
import type { ProgressDoc } from './userStore'

export interface Readiness {
  /** Objectives in scope. */
  total: number
  /** Objectives with any confidence rating. */
  rated: number
  red: number
  amber: number
  green: number
  /** 0-100: average confidence across ALL objectives (unrated = 0, green = 100). */
  pct: number
}

/** Confidence-based readiness for a set of objective ids. */
export function readinessFor(objectiveIds: string[], progress: ProgressDoc): Readiness {
  let red = 0, amber = 0, green = 0
  for (const id of objectiveIds) {
    const c = progress.confidence[id]
    if (c === 1) red++; else if (c === 2) amber++; else if (c === 3) green++
  }
  const total = objectiveIds.length
  return { total, rated: red + amber + green, red, amber, green, pct: total ? Math.round(((red + 2 * amber + 3 * green) / (3 * total)) * 100) : 0 }
}

/** Readiness of one topic. */
export function topicReadiness(syllabus: Syllabus, topicId: string, progress: ProgressDoc): Readiness {
  const ids = syllabus.components.flatMap((c) => c.topics).filter((t) => t.id === topicId).flatMap((t) => t.objectives.map((o) => o.id))
  return readinessFor(ids, progress)
}

/** Readiness of a whole subject (all objectives). */
export function subjectReadiness(syllabus: Syllabus, progress: ProgressDoc): Readiness {
  return readinessFor(syllabus.components.flatMap((c) => c.topics.flatMap((t) => t.objectives.map((o) => o.id))), progress)
}
