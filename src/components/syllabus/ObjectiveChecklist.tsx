import { CheckCheck, RotateCcw } from 'lucide-react'
import type { Objective } from '../../types/content'
import { useProgress } from '../../hooks/useUserData'
import { readinessFor } from '../../lib/progress'
import { Button, ConfidencePicker } from '../ui'
import type { SubjectId } from '../../types/content'
import ConfidenceBar from './ConfidenceBar'
import KaTeXRenderer from '../questions/KaTeXRenderer'

/** Objectives with red/amber/green pickers and bulk actions. */
export default function ObjectiveChecklist({ subjectId, objectives, compact }: { subjectId: SubjectId; objectives: Objective[]; compact?: boolean }) {
  const { progress, setConfidence } = useProgress(subjectId)
  const r = readinessFor(objectives.map((o) => o.id), progress)
  const setAll = (v: 1 | 2 | 3 | null) => objectives.forEach((o) => setConfidence(o.id, v))

  if (!objectives.length) return <p className="text-sm text-ink-2">No learning objectives listed for this topic.</p>
  return (
    <div>
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs font-bold text-ink-2 mb-1.5">
          <span>{r.green} of {r.total} confident</span>
          <span>{r.rated < r.total ? `${r.total - r.rated} to rate` : 'All rated'}</span>
        </div>
        <ConfidenceBar r={r} />
      </div>
      {!compact && (
        <div className="flex flex-wrap gap-2 mb-4">
          <Button size="sm" variant="secondary" leftIcon={<CheckCheck size={15} />} onClick={() => setAll(3)}>Mark all green</Button>
          <Button size="sm" variant="ghost" onClick={() => setAll(2)}>All amber</Button>
          <Button size="sm" variant="ghost" onClick={() => setAll(1)}>All red</Button>
          <Button size="sm" variant="ghost" leftIcon={<RotateCcw size={14} />} onClick={() => setAll(null)}>Clear</Button>
        </div>
      )}
      <ul className="divide-y divide-border">
        {objectives.map((o, i) => (
          <li key={o.id} className={compact ? 'py-2.5 flex items-start gap-3' : 'py-3 flex items-start gap-3'}>
            <span className="text-xs font-bold text-ink-3 w-5 pt-0.5 shrink-0 tabular-nums">{i + 1}</span>
            <p className={compact ? 'flex-1 text-[13px] leading-snug text-ink' : 'flex-1 text-sm leading-relaxed text-ink'}><KaTeXRenderer content={o.text} /></p>
            <ConfidencePicker size={compact ? 'sm' : 'md'} value={progress.confidence[o.id] ?? null} onChange={(v) => setConfidence(o.id, v)} label={o.text.replace(/\$/g, '')} className="pt-0.5" />
          </li>
        ))}
      </ul>
      {compact && (
        <div className="mt-3">
          <Button size="sm" variant="secondary" leftIcon={<CheckCheck size={15} />} onClick={() => setAll(3)}>Mark all green</Button>
        </div>
      )}
    </div>
  )
}
