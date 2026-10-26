// Cambridge (A Level / AS) grade system
export const GRADES = ['A*', 'A', 'B', 'C', 'D', 'E', 'U']

export const GRADE_POINTS = { 'A*': 6, A: 5, B: 4, C: 3, D: 2, E: 1, U: 0 }

// Background + text pairs chosen for WCAG AA contrast
export const GRADE_COLORS = {
  'A*': '#15803D',
  A: '#4ADE80',
  B: '#FACC15',
  C: '#FB923C',
  D: '#F87171',
  E: '#DC2626',
  U: '#6B7280',
}

export const GRADE_TEXT = {
  'A*': '#FFFFFF',
  A: '#14532D',
  B: '#713F12',
  C: '#7C2D12',
  D: '#7F1D1D',
  E: '#FFFFFF',
  U: '#FFFFFF',
}

export const GRADE_TYPES = ['Test', 'Assignment', 'Mock Exam', 'Final Exam']

export function gradeToPoints(grade) {
  return GRADE_POINTS[grade] ?? 0
}

export function pointsToGrade(pts) {
  if (pts >= 5.5) return 'A*'
  if (pts >= 4.5) return 'A'
  if (pts >= 3.5) return 'B'
  if (pts >= 2.5) return 'C'
  if (pts >= 1.5) return 'D'
  if (pts >= 0.5) return 'E'
  return 'U'
}

// Weighted average in points (0–6), or null with no grades
export function weightedPoints(grades) {
  if (!grades || grades.length === 0) return null
  const totalWeight = grades.reduce((s, g) => s + (Number(g.weight) || 0), 0)
  if (totalWeight === 0) {
    return grades.reduce((s, g) => s + gradeToPoints(g.grade), 0) / grades.length
  }
  return grades.reduce((s, g) => s + gradeToPoints(g.grade) * (Number(g.weight) || 0), 0) / totalWeight
}

export function weightedAverage(grades) {
  const pts = weightedPoints(grades)
  return pts === null ? null : pointsToGrade(pts)
}

export function overallAverage(subjects, gradesBySubject) {
  const pts = subjects
    .map((s) => weightedPoints(gradesBySubject[s.id] || []))
    .filter((p) => p !== null)
  if (pts.length === 0) return null
  return pointsToGrade(pts.reduce((s, p) => s + p, 0) / pts.length)
}

// Progress: current points / target points
export function progressToTarget(current, target) {
  if (!current || !target) return 0
  const t = gradeToPoints(target)
  if (t === 0) return 1
  return Math.min(1, gradeToPoints(current) / t)
}

// How many grade steps between current and target (positive = still to climb)
export function gradeGap(current, target) {
  if (!current || !target) return null
  return gradeToPoints(target) - gradeToPoints(current)
}

export function gapLabel(gap) {
  if (gap === null) return 'No grades yet'
  if (gap <= 0) return gap === 0 ? 'On target' : `${-gap} above target`
  return `${gap} grade${gap === 1 ? '' : 's'} to go`
}

// Grades oldest → newest, for trend charts
export function chronological(grades) {
  return [...(grades || [])].sort((a, b) => String(a.date).localeCompare(String(b.date)))
}

export function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}
