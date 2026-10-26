import { GRADES, GRADE_COLORS, chronological, gradeToPoints, formatDate } from '../grades'

function coords(grades, w, h, pad, range = [0, 6]) {
  const list = chronological(grades)
  const [lo, hi] = range
  const step = list.length > 1 ? (w - pad * 2) / (list.length - 1) : 0
  return list.map((g, i) => ({
    g,
    x: list.length > 1 ? pad + i * step : w / 2,
    y: pad + (1 - (gradeToPoints(g.grade) - lo) / (hi - lo)) * (h - pad * 2),
  }))
}

function smoothPath(pts) {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1]
    const c = pts[i]
    const mx = (p.x + c.x) / 2
    d += ` C ${mx} ${p.y}, ${mx} ${c.y}, ${c.x} ${c.y}`
  }
  return d
}

export function Sparkline({ grades, className = '' }) {
  const w = 120
  const h = 36
  // Zoom to the student's own range so small changes are visible
  const values = grades.map((g) => gradeToPoints(g.grade))
  const lo = Math.max(0, Math.min(...values) - 1)
  const hi = Math.min(6, Math.max(...values) + 1)
  const pts = coords(grades, w, h, 6, [lo, hi])
  if (pts.length < 2) return null
  const line = smoothPath(pts)
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`w-full h-9 ${className}`} aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#F472B6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L ${pts.at(-1).x} ${h} L ${pts[0].x} ${h} Z`} fill="url(#spark-fill)" />
      <path d={line} fill="none" stroke="#DB2777" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export default function TrendChart({ grades, target }) {
  const w = 640
  const h = 220
  const pad = 28
  const pts = coords(grades, w, h, pad)
  const targetY = target ? pad + (1 - gradeToPoints(target) / 6) * (h - pad * 2) : null
  const line = smoothPath(pts)

  return (
    <figure>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" role="img" aria-label="Grade trend over time">
        <defs>
          <linearGradient id="trend-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#F472B6" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {GRADES.map((g) => {
          const y = pad + (1 - gradeToPoints(g) / 6) * (h - pad * 2)
          return (
            <g key={g}>
              <line x1={pad} x2={w - 8} y1={y} y2={y} stroke="#F9D6E7" strokeDasharray="3 5" />
              <text x={4} y={y + 4} fontSize="11" fill="#9D6B83" fontWeight="700">{g}</text>
            </g>
          )
        })}
        {targetY !== null && (
          <g>
            <line x1={pad} x2={w - 8} y1={targetY} y2={targetY} stroke="#16A34A" strokeWidth="1.5" strokeDasharray="6 4" />
            <text x={pad + 6} y={targetY - 6} fontSize="11" fill="#15803D" fontWeight="800">
              Target {target}
            </text>
          </g>
        )}
        {pts.length > 1 && (
          <>
            <path d={`${line} L ${pts.at(-1).x} ${h - pad} L ${pts[0].x} ${h - pad} Z`} fill="url(#trend-fill)" />
            <path d={line} fill="none" stroke="#DB2777" strokeWidth="3" strokeLinecap="round" />
          </>
        )}
        {pts.map(({ g, x, y }) => (
          <circle key={g.id} cx={x} cy={y} r="7" fill={GRADE_COLORS[g.grade]} stroke="#fff" strokeWidth="3">
            <title>{`${g.title}: ${g.grade} (${formatDate(g.date)})`}</title>
          </circle>
        ))}
      </svg>
      <figcaption className="sr-only">
        {chronological(grades).map((g) => `${formatDate(g.date)} ${g.title} ${g.grade}`).join('; ')}
      </figcaption>
    </figure>
  )
}
