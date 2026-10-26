import type { Grade } from '../../lib/userStore'
import { chronological, gradeToPoints } from '../../lib/grades'

/** Tiny inline-SVG trend of grade points over time (0-6). */
export default function Sparkline({ grades, target }: { grades: Grade[]; target?: string }) {
  const list = chronological(grades)
  if (list.length < 2) return <p className="text-sm text-ink-3">Add two or more grades to see your trend.</p>
  const W = 240, H = 64, P = 6
  const x = (i: number) => P + (i * (W - 2 * P)) / (list.length - 1)
  const y = (pts: number) => H - P - (pts / 6) * (H - 2 * P)
  const pts = list.map((g, i) => [x(i), y(gradeToPoints(g.grade))] as const)
  const path = pts.map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`).join(' ')
  const first = gradeToPoints(list[0].grade), last = gradeToPoints(list[list.length - 1].grade)
  const dir = last > first ? 'improving' : last < first ? 'dipping' : 'steady'
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-16" role="img" aria-label={`Grade trend over ${list.length} assessments, ${dir}: ${list[0].grade} to ${list[list.length - 1].grade}`}>
      {target && <line x1={P} x2={W - P} y1={y(gradeToPoints(target))} y2={y(gradeToPoints(target))} className="stroke-ink-3" strokeDasharray="3 4" strokeWidth="1" />}
      <path d={path} fill="none" className="stroke-flame" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([px, py], i) => <circle key={i} cx={px} cy={py} r={i === pts.length - 1 ? 4 : 2.5} className="fill-flame" />)}
    </svg>
  )
}
