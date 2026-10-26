import { Link } from 'react-router-dom'
import { ArrowRight, Target } from 'lucide-react'
import { getSubject } from '../../lib/subjects'
import { cn } from '../../lib/cn'
import { buttonClasses, ProgressRing } from '../ui'
import type { SubjectStats } from './useDashboardData'

export default function SubjectCard({ stats }: { stats: SubjectStats }) {
  const s = getSubject(stats.id)!
  const { last, weakest } = stats
  const noContent = stats.loaded.syllabus.components.length === 0
  const continueTo = last ? `/s/${s.id}/q/${last.question.id}` : `/s/${s.id}`

  return (
    <div className={cn('card overflow-hidden border-t-4 flex flex-col', s.cls.accentTop)}>
      <div className="p-5 flex-1">
        <div className="flex items-start gap-4">
          <ProgressRing value={stats.readiness.pct} size={64} stroke={6} strokeClass={s.cls.stroke} label={`${s.name} readiness`} />
          <div className="min-w-0 flex-1">
            <Link to={`/s/${s.id}`} className="font-display font-extrabold text-xl text-ink hover:underline underline-offset-4 focus-ring rounded">{s.name}</Link>
            <div className="text-xs font-mono text-ink-3">CIE {s.code}</div>
            <div className="text-xs text-ink-2 mt-1">
              {noContent ? 'Syllabus coming soon' : `${stats.readiness.rated} of ${stats.readiness.total} objectives rated`}
            </div>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3 mt-4 text-sm">
          <div className="rounded-control bg-surface-2 px-3 py-2">
            <dt className="text-xs font-bold text-ink-3">Questions done</dt>
            <dd className="font-display font-bold text-ink tabular-nums">{stats.questionsDone}<span className="text-ink-3 font-body font-normal"> / {stats.questionsTotal || 0}</span></dd>
          </div>
          <div className="rounded-control bg-surface-2 px-3 py-2">
            <dt className="text-xs font-bold text-ink-3">Papers done</dt>
            <dd className="font-display font-bold text-ink tabular-nums">{stats.papersDone}<span className="text-ink-3 font-body font-normal"> / {stats.papersTotal || 0}</span></dd>
          </div>
        </dl>

        <div className="mt-4 text-sm">
          {weakest ? (
            <Link to={`/s/${s.id}/topic/${weakest.topic.id}`} className="flex items-start gap-2 text-ink-2 hover:text-ink group focus-ring rounded">
              <Target className="w-4 h-4 mt-0.5 text-conf-red shrink-0" aria-hidden />
              <span><span className="font-bold text-ink">Weakest:</span> {weakest.topic.name} <span className="text-ink-3">({weakest.readiness.pct}%)</span></span>
            </Link>
          ) : (
            <p className="flex items-start gap-2 text-ink-3"><Target className="w-4 h-4 mt-0.5 shrink-0" aria-hidden /> Rate some objectives to find your weakest topic.</p>
          )}
        </div>
      </div>

      <div className="border-t border-border px-5 py-3 flex items-center gap-3">
        <div className="min-w-0 flex-1 text-xs text-ink-3 truncate">
          {last ? <>Last: Q{last.question.number}{last.topic ? ` · ${last.topic.name}` : ''}</> : 'Nothing started yet'}
        </div>
        <Link to={continueTo} className={buttonClasses('secondary', 'sm', 'shrink-0')}>
          {last ? 'Continue' : 'Open'} <ArrowRight className="w-3.5 h-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  )
}
