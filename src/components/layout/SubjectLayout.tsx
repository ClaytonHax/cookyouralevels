import { Navigate, NavLink, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { useSyllabus } from '../../hooks/useContent'
import { useProgress } from '../../hooks/useUserData'
import { getSubject } from '../../lib/subjects'
import type { SubjectTheme } from '../../lib/subjects'
import { subjectReadiness } from '../../lib/progress'
import { cn } from '../../lib/cn'
import { ProgressRing, Skeleton } from '../ui'
import type { Syllabus } from '../../types/content'

export interface SubjectContext {
  subject: SubjectTheme
  /** Always loaded. Empty `components` if the syllabus file is missing. */
  syllabus: Syllabus
}

/** Inside any /s/:subjectId/* page: the subject and its (already loaded) syllabus. */
export function useSubject(): SubjectContext {
  return useOutletContext<SubjectContext>()
}

const tabs = [
  { to: '', label: 'Overview', end: true },
  { to: 'questions', label: 'Questions' },
  { to: 'papers', label: 'Papers' },
]

/** Layout route for /s/:subjectId/*: subject header + tabs, then <Outlet context={{subject, syllabus}}/>. */
export default function SubjectLayout() {
  const { subjectId } = useParams()
  const subject = getSubject(subjectId)
  const { data: syllabus } = useSyllabus(subject?.id)
  const { progress } = useProgress(subject?.id)
  if (!subject) return <Navigate to="/dashboard" replace />

  const r = syllabus ? subjectReadiness(syllabus, progress) : null
  const noSyllabus = syllabus && syllabus.components.length === 0

  return (
    <div>
      <header className={cn('card border-t-4 p-5 sm:p-6 mb-6', subject.cls.accentTop)}>
        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className={cn('text-xs font-bold uppercase tracking-wider', subject.cls.text)}>Cambridge A Level · {subject.code}</div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">{subject.name}</h1>
            <p className="text-sm text-ink-2 mt-1">
              {r ? (noSyllabus ? 'Syllabus coming soon.' : `${r.rated} of ${r.total} objectives rated · ${r.green} confident`) : <Skeleton className="h-4 w-48 inline-block align-middle" />}
            </p>
          </div>
          <ProgressRing value={r?.pct ?? 0} size={68} stroke={7} strokeClass={subject.cls.stroke} label={`${subject.name} readiness`} />
        </div>
        <nav className="flex gap-1 mt-5 -mb-2 overflow-x-auto scrollbar-thin" aria-label={`${subject.name} sections`}>
          {tabs.map((t) => (
            <NavLink
              key={t.label} to={t.to} end={t.end}
              className={({ isActive }) => cn('px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap focus-ring transition-colors', isActive ? cn(subject.cls.soft, subject.cls.text) : 'text-ink-2 hover:bg-surface-2')}
            >
              {t.label}
            </NavLink>
          ))}
        </nav>
      </header>
      {syllabus ? <Outlet context={{ subject, syllabus } satisfies SubjectContext} /> : (
        <div className="space-y-3" role="status" aria-label="Loading syllabus"><Skeleton className="h-16 rounded-card" /><Skeleton className="h-16 rounded-card" /><Skeleton className="h-16 rounded-card" /></div>
      )}
    </div>
  )
}
