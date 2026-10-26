import { Link } from 'react-router-dom'
import { CalendarClock } from 'lucide-react'
import type { SessionCode } from '../../types/content'
import { sessionName } from '../../lib/content'
import { daysUntil } from './examDate'

export default function Countdown({ year, session }: { year: number; session: SessionCode }) {
  const days = daysUntil(year, session)
  const label = `${sessionName(session)} ${year}`
  return (
    <div className="card flex items-center gap-4 px-5 py-4 sm:min-w-[260px]">
      <span className="w-11 h-11 rounded-control bg-flame-soft text-flame flex items-center justify-center shrink-0"><CalendarClock className="w-5 h-5" aria-hidden /></span>
      {days > 0 ? (
        <div>
          <div className="font-display font-extrabold text-3xl text-ink leading-none tabular-nums">{days.toLocaleString()} <span className="text-base font-bold text-ink-2">day{days === 1 ? '' : 's'}</span></div>
          <div className="text-xs text-ink-3 mt-1">until {label} begins</div>
        </div>
      ) : (
        <div>
          <div className="font-display font-bold text-ink">{label} {days > -45 ? 'is underway' : 'has passed'}</div>
          <Link to="/settings" className="text-xs text-flame-strong dark:text-flame font-bold underline underline-offset-2">Update your exam session</Link>
        </div>
      )}
    </div>
  )
}
