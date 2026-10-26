import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ExternalLink, ListChecks } from 'lucide-react'
import type { PaperRef } from '../../types/content'
import type { PaperLog } from '../../lib/userStore'
import { Button, Input } from '../ui'
import { cn } from '../../lib/cn'

export function scorePct(log?: PaperLog) {
  if (!log || log.score == null || !log.outOf) return null
  return Math.round((log.score / log.outOf) * 100)
}
export function pctTone(p: number) {
  return p >= 70 ? 'bg-conf-green/10 text-conf-green' : p >= 50 ? 'bg-conf-amber/15 text-conf-amber' : 'bg-conf-red/10 text-conf-red'
}

const linkCls = 'inline-flex items-center gap-1 h-8 px-2.5 rounded-control border border-border bg-surface text-xs font-bold text-ink hover:bg-surface-2 focus-ring'

function Ext({ href, label, title }: { href?: string; label: string; title: string }) {
  if (!href) return null
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkCls} aria-label={`${title} (opens in new tab)`}>
      {label}<ExternalLink className="w-3 h-3 text-ink-3" aria-hidden />
    </a>
  )
}

export default function PaperRow({ paper, log, subjectId, onLog }: {
  paper: PaperRef; log?: PaperLog; subjectId: string
  onLog: (v: { done: true; score?: number; outOf?: number } | null) => void
}) {
  const [editing, setEditing] = useState(false)
  const [score, setScore] = useState('')
  const [outOf, setOutOf] = useState('')
  const pct = scorePct(log)
  const name = `Paper ${paper.paper} · Variant ${paper.variant}`

  const open = () => { setScore(log?.score != null ? String(log.score) : ''); setOutOf(log?.outOf ? String(log.outOf) : ''); setEditing(true) }
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const s = parseFloat(score), o = parseFloat(outOf)
    const hasScore = Number.isFinite(s) && Number.isFinite(o) && o > 0 && s >= 0
    onLog(hasScore ? { done: true, score: s, outOf: o } : { done: true })
    setEditing(false)
  }
  const invalid = (score !== '' || outOf !== '') && !(parseFloat(score) >= 0 && parseFloat(outOf) > 0)

  return (
    <li className="px-4 py-3 border-t border-border first:border-t-0">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-2 min-w-[11rem]">
          {log?.done && <span className="w-5 h-5 rounded-full bg-conf-green text-white grid place-items-center shrink-0" title="Done"><Check className="w-3.5 h-3.5" aria-label="Done" /></span>}
          <span className="font-bold text-ink text-sm">{name}</span>
          <span className="text-xs font-bold text-ink-3 bg-surface-2 rounded-full px-2 py-0.5">{paper.level}</span>
          {pct !== null && <span className={cn('text-xs font-bold rounded-full px-2 py-0.5', pctTone(pct))} title={`${log!.score}/${log!.outOf}`}>{pct}%</span>}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Ext href={paper.links.qp} label="QP" title={`Question paper, ${name}`} />
          <Ext href={paper.links.ms} label="MS" title={`Mark scheme, ${name}`} />
          <Ext href={paper.links.er} label="ER" title={`Examiner report, ${name}`} />
          <Ext href={paper.links.in} label="Insert" title={`Insert, ${name}`} />
          {paper.hasQuestions && (
            <Link to={`/s/${subjectId}/questions?paper=${encodeURIComponent(paper.id)}`} className={cn(linkCls, 'text-flame-strong dark:text-flame')}>
              <ListChecks className="w-3.5 h-3.5" aria-hidden /> Topical questions
            </Link>
          )}
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          {log?.done ? (
            <>
              <Button size="sm" variant="ghost" onClick={open}>Edit score</Button>
              <Button size="sm" variant="ghost" onClick={() => onLog(null)}>Undo</Button>
            </>
          ) : (
            <Button size="sm" variant="secondary" onClick={open}>Mark as done</Button>
          )}
        </div>
      </div>
      {editing && (
        <form onSubmit={submit} className="mt-3 flex flex-wrap items-end gap-2 rounded-control bg-surface-2/60 p-3 animate-fade-in">
          <div className="w-24"><Input label="Score" type="number" inputMode="decimal" min={0} value={score} onChange={(e) => setScore(e.target.value)} data-autofocus autoFocus placeholder="e.g. 52" /></div>
          <div className="w-24"><Input label="Out of" type="number" inputMode="decimal" min={1} value={outOf} onChange={(e) => setOutOf(e.target.value)} placeholder="e.g. 75" /></div>
          <Button type="submit" size="md" disabled={invalid}>{log?.done ? 'Save' : 'Mark done'}</Button>
          <Button type="button" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
          <p className="basis-full text-xs text-ink-3">Score is optional. Leave blank to just tick it off.</p>
        </form>
      )}
    </li>
  )
}
