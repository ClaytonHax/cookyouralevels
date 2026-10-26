// Cambridge (A Level / AS) grade maths, ported from grades-tracker/src/grades.js
import type { Grade, GradeSubject } from './userStore'

export const GRADES = ['A*', 'A', 'B', 'C', 'D', 'E', 'U'] as const
export type LetterGrade = (typeof GRADES)[number]

export const GRADE_POINTS: Record<string, number> = { 'A*': 6, A: 5, B: 4, C: 3, D: 2, E: 1, U: 0 }

/** Cambridge grade colours (background / text pairs chosen for AA contrast). */
export const GRADE_COLORS: Record<string, string> = {
  'A*': '#15803D', A: '#4ADE80', B: '#FACC15', C: '#FB923C', D: '#F87171', E: '#DC2626', U: '#6B7280',
}
export const GRADE_TEXT: Record<string, string> = {
  'A*': '#FFFFFF', A: '#14532D', B: '#713F12', C: '#7C2D12', D: '#7F1D1D', E: '#FFFFFF', U: '#FFFFFF',
}

export const GRADE_TYPES = ['Test', 'Assignment', 'Coursework', 'Mock Exam', 'Final Exam'] as const

/** Percentage thresholds (uniform-mark style) for converting a % into a grade. */
export function percentToGrade(pct: number): LetterGrade {
  if (pct >= 90) return 'A*'
  if (pct >= 80) return 'A'
  if (pct >= 70) return 'B'
  if (pct >= 60) return 'C'
  if (pct >= 50) return 'D'
  if (pct >= 40) return 'E'
  return 'U'
}

export const gradeToPoints = (g?: string | null) => (g ? GRADE_POINTS[g] ?? 0 : 0)

export function pointsToGrade(pts: number): LetterGrade {
  if (pts >= 5.5) return 'A*'
  if (pts >= 4.5) return 'A'
  if (pts >= 3.5) return 'B'
  if (pts >= 2.5) return 'C'
  if (pts >= 1.5) return 'D'
  if (pts >= 0.5) return 'E'
  return 'U'
}

/** Weighted average in points (0-6), or null with no grades. */
export function weightedPoints(grades: Pick<Grade, 'grade' | 'weight'>[]): number | null {
  if (!grades.length) return null
  const total = grades.reduce((s, g) => s + (Number(g.weight) || 0), 0)
  if (total === 0) return grades.reduce((s, g) => s + gradeToPoints(g.grade), 0) / grades.length
  return grades.reduce((s, g) => s + gradeToPoints(g.grade) * (Number(g.weight) || 0), 0) / total
}

export function weightedAverage(grades: Pick<Grade, 'grade' | 'weight'>[]): LetterGrade | null {
  const p = weightedPoints(grades)
  return p === null ? null : pointsToGrade(p)
}

export function overallAverage(subjects: GradeSubject[], bySubject: Record<string, Grade[]>): LetterGrade | null {
  const pts = subjects.map((s) => weightedPoints(bySubject[s.id] ?? [])).filter((p): p is number => p !== null)
  return pts.length ? pointsToGrade(pts.reduce((a, b) => a + b, 0) / pts.length) : null
}

/** 0..1 progress of the current weighted points towards the target grade. */
export function progressToTarget(points: number | null, target: string): number {
  const t = gradeToPoints(target)
  if (points === null) return 0
  if (t === 0) return 1
  return Math.max(0, Math.min(1, points / t))
}

export function gradeGap(current: string | null, target: string): number | null {
  if (!current || !target) return null
  return gradeToPoints(target) - gradeToPoints(current)
}

export function gapLabel(gap: number | null): string {
  if (gap === null) return 'No grades yet'
  if (gap === 0) return 'On target'
  if (gap < 0) return `${-gap} grade${gap === -1 ? '' : 's'} above target`
  return `${gap} grade${gap === 1 ? '' : 's'} to go`
}

/** Oldest to newest, for trend charts. */
export function chronological(grades: Grade[]): Grade[] {
  return [...grades].sort((a, b) => String(a.date).localeCompare(String(b.date)) || (a.createdAt ?? 0) - (b.createdAt ?? 0))
}

export function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00`)
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}
