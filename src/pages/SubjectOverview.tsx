import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ChevronDown, ExternalLink, FileText, Flame, Play, Search, Target } from 'lucide-react'
import { useSubject } from '../components/layout/SubjectLayout'
import { useNotesIndex, usePapers, useQuestions } from '../hooks/useContent'
import { useProgress } from '../hooks/useUserData'
import { readinessFor, subjectReadiness } from '../lib/progress'
import { cn } from '../lib/cn'
import { Badge, Card, EmptyState, ProgressRing, buttonClasses } from '../components/ui'
import ConfidenceBar from '../components/syllabus/ConfidenceBar'
import type { Level, SyllabusComponent } from '../types/content'

type Filter = 'all' | Level
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'AS', label: 'AS' },
  { id: 'A2', label: 'A Level' },
]

export default function SubjectOverview() {
  const { subject, syllabus } = useSubject()
  const { progress } = useProgress(subject.id)
  const { data: questions } = useQuestions(subject.id)
  const { data: papers } = usePapers(subject.id)
  const { data: notesIndex } = useNotesIndex(subject.id)
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [closed, setClosed] = useState<Record<string, boolean>>({})

  const notesSet = useMemo(() => new Set(notesIndex ?? []), [notesIndex])
  const qCount = useMemo(() => {
    const m = new Map<string, number>()
    for (const q of questions ?? []) for (const t of new Set(q.topicIds)) m.set(t, (m.get(t) ?? 0) + 1)
    return m
  }, [questions])
  const qById = useMemo(() => new Map((questions ?? []).map((q) => [q.id, q])), [questions])

  const overall = subjectReadiness(syllabus, progress)
  const questionsDone = Object.values(progress.questions).filter((q) => q.s === 'done').length
  const papersDone = Object.values(progress.papers).filter((p) => p.done).length

  const topicStats = useMemo(
    () => syllabus.components.flatMap((c) => c.topics.map((t) => ({ c, t, r: readinessFor(t.objectives.map((o) => o.id), progress) }))),
    [syllabus, progress],
  )
  const weakest = useMemo(() => {
    const review = new Map<string, number>()
    for (const [qid, p] of Object.entries(progress.questions)) {
      if (p.s !== 'review') continue
      for (const t of qById.get(qid)?.topicIds ?? []) review.set(t, (review.get(t) ?? 0) + 1)
    }
    return topicStats
      .filter((x) => x.r.total > 0 && (x.r.red + x.r.amber > 0 || review.has(x.t.id)))
      .map((x) => ({ ...x, review: review.get(x.t.id) ?? 0, score: x.r.red * 2 + x.r.amber + (review.get(x.t.id) ?? 0) * 1.5 }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  }, [topicStats, progress.questions, qById])

  const last = useMemo(() => {
    const e = Object.entries(progress.questions).sort((a, b) => (b[1].t ?? 0) - (a[1].t ?? 0))[0]
    return e ? qById.get(e[0]) : undefined
  }, [progress.questions, qById])

  const q = query.trim().toLowerCase()
  const visible = useMemo(() => {
    return syllabus.components
      .filter((c) => filter === 'all' || c.level === filter)
      .map((c) => {
        const topics = c.topics.filter((t) => !q || t.name.toLowerCase().includes(q) || t.number.includes(q) || t.objectives.some((o) => o.text.toLowerCase().includes(q)))
        return { c, topics }
      })
      .filter((x) => x.topics.length > 0)
  }, [syllabus, filter, q])

  if (syllabus.components.length === 0) {
    return <EmptyState icon={<BookOpen />} title="Syllabus coming soon" description="We're still adding this subject's syllabus. Check back shortly, or head to Papers in the meantime." action={<Link className={buttonClasses('secondary')} to={`/s/${subject.id}/papers`}>Open papers</Link>} />
  }

  const lastTopic = last ? topicStats.find((x) => x.t.id === last.topicIds[0]) : undefined
  const pctMsg = overall.rated === 0 ? 'Rate your first objective to light up this ring.' : overall.green === overall.total ? 'Fully cooked. Nice work.' : `${overall.total - overall.green} objectives to go. Keep the heat on.`

  return (
    <div className="space-y-6">
      <section aria-label="Readiness" className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1 flex items-center gap-4">
          <ProgressRing value={overall.pct} size={84} stroke={9} strokeClass={subject.cls.stroke} label="Overall confidence" />
          <div className="min-w-0">
            <div className="text-xs font-bold uppercase tracking-wider text-ink-3">Readiness</div>
            <div className="text-sm text-ink-2 mt-0.5">{pctMsg}</div>
            <div className="mt-2 flex gap-3 text-xs font-bold text-ink-2">
              <span><b className="text-ink text-base tabular-nums">{questionsDone}</b> questions done</span>
              <span><b className="text-ink text-base tabular-nums">{papersDone}</b> papers</span>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-3"><Play size={14} className="text-flame" /> Continue</div>
          {last ? (
            <>
              <p className="mt-2 font-display font-bold text-ink leading-snug">Question {last.number}{last.marks ? ` · ${last.marks} marks` : ''}</p>
              <p className="text-sm text-ink-2 line-clamp-2">{lastTopic?.t.name ?? 'Last question you touched'}</p>
              <Link to={`/s/${subject.id}/q/${last.id}`} className={cn(buttonClasses('primary', 'sm'), 'mt-auto self-start')}>Pick up where you left off</Link>
            </>
          ) : (
            <>
              <p className="mt-2 text-sm text-ink-2">Nothing started yet. Jump into a quick set of questions.</p>
              <Link to={`/s/${subject.id}/practice`} className={cn(buttonClasses('primary', 'sm'), 'mt-auto self-start')}>Start practising</Link>
            </>
          )}
        </Card>

        <Card>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-3"><Target size={14} className="text-flame" /> Weakest topics</div>
          {weakest.length ? (
            <ul className="mt-2 space-y-1">
              {weakest.map((w) => (
                <li key={w.t.id}>
                  <Link to={`/s/${subject.id}/topic/${w.t.id}`} className="flex items-center gap-2 rounded-control px-2 py-1.5 -mx-2 hover:bg-surface-2 focus-ring">
                    <span className="flex-1 min-w-0 truncate text-sm font-bold text-ink">{w.t.name}</span>
                    <span className="text-xs text-ink-3 shrink-0">{w.r.red ? `${w.r.red} red` : w.r.amber ? `${w.r.amber} amber` : `${w.review} to review`}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-ink-2">Rate objectives red, amber or green and your weakest topics show up here.</p>
          )}
        </Card>
      </section>

      <section aria-label="Syllabus">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <h2 className="font-display text-xl font-extrabold text-ink sm:mr-auto">Syllabus</h2>
          <div className="flex gap-1.5" role="group" aria-label="Filter by level">
            {FILTERS.map((f) => (
              <button
                key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}
                className={cn('px-3.5 min-h-10 rounded-full text-sm font-bold focus-ring cursor-pointer transition-colors', filter === f.id ? cn(subject.cls.soft, subject.cls.text) : 'bg-surface-2 text-ink-2 hover:text-ink')}
              >{f.label}</button>
            ))}
          </div>
          <label className="relative sm:w-64">
            <span className="sr-only">Search topics and objectives</span>
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" aria-hidden />
            <input
              type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search topics or objectives"
              className="w-full min-h-10 pl-9 pr-3 rounded-control border border-border bg-surface text-sm text-ink placeholder:text-ink-3 focus-ring"
            />
          </label>
        </div>

        {visible.length === 0 ? (
          <EmptyState icon={<Search />} title="Nothing matches" description="Try a different word, or clear the search and level filter." action={<button className={buttonClasses('secondary')} onClick={() => { setQuery(''); setFilter('all') }}>Clear filters</button>} />
        ) : (
          <div className="space-y-4">
            {visible.map(({ c, topics }) => (
              <ComponentSection
                key={c.id} c={c} topics={topics} open={q ? true : !closed[c.id]}
                onToggle={() => setClosed((s) => ({ ...s, [c.id]: !s[c.id] }))}
                subjectId={subject.id} accent={subject.cls.text} progress={progress} qCount={qCount} notesSet={notesSet}
              />
            ))}
          </div>
        )}
      </section>

      <footer className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-2">
        {syllabus.pdfUrl && (
          <a href={syllabus.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold text-ink hover:text-flame-strong focus-ring rounded">
            <FileText size={16} /> Official syllabus PDF ({syllabus.version}) <ExternalLink size={13} aria-hidden />
          </a>
        )}
        {papers && papers.length > 0 && <span className="inline-flex items-center gap-1.5"><Flame size={15} className="text-flame" /> {papers.length} past papers available</span>}
      </footer>
    </div>
  )
}

function ComponentSection({ c, topics, open, onToggle, subjectId, accent, progress, qCount, notesSet }: {
  c: SyllabusComponent
  topics: SyllabusComponent['topics']
  open: boolean
  onToggle: () => void
  subjectId: string
  accent: string
  progress: Parameters<typeof readinessFor>[1]
  qCount: Map<string, number>
  notesSet: Set<string>
}) {
  const r = readinessFor(c.topics.flatMap((t) => t.objectives.map((o) => o.id)), progress)
  const panelId = `sec-${c.id}`
  return (
    <div className="card overflow-hidden">
      <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={panelId} className="w-full flex items-center gap-3 p-4 text-left cursor-pointer hover:bg-surface-2/60 focus-ring transition-colors">
        <ChevronDown size={18} className={cn('shrink-0 text-ink-3 transition-transform duration-200', !open && '-rotate-90')} aria-hidden />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="font-display font-bold text-ink">{c.name}</h3>
            <Badge tone="neutral">{c.level === 'AS' ? 'AS' : 'A Level'}</Badge>
            {c.papers.length > 0 && <span className={cn('text-xs font-bold', accent)}>{c.papers.length === 1 ? 'Paper' : 'Papers'} {c.papers.join(', ')}</span>}
          </div>
          <div className="mt-2 max-w-xs"><ConfidenceBar r={r} /></div>
        </div>
        <span className="text-xs font-bold text-ink-3 shrink-0 hidden sm:block">{c.topics.length} topics</span>
      </button>
      {open && (
        <ul id={panelId} className="border-t border-border divide-y divide-border">
          {topics.map((t) => {
            const tr = readinessFor(t.objectives.map((o) => o.id), progress)
            const n = qCount.get(t.id) ?? 0
            return (
              <li key={t.id}>
                <Link to={`/s/${subjectId}/topic/${t.id}`} className="flex items-center gap-3 px-4 py-3 min-h-14 hover:bg-surface-2/60 focus-ring transition-colors">
                  <span className="w-9 shrink-0 text-xs font-bold text-ink-3 tabular-nums">{t.number}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-ink leading-snug">{t.name}</div>
                    <div className="mt-1.5 flex items-center gap-3">
                      <ConfidenceBar r={tr} className="max-w-[9rem]" />
                      <span className="text-xs text-ink-3 whitespace-nowrap">{n} {n === 1 ? 'question' : 'questions'}</span>
                      {notesSet.has(t.id) && <span className="inline-flex items-center gap-1 text-xs font-bold text-flame-strong"><BookOpen size={12} aria-hidden /> Notes</span>}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-ink-2 tabular-nums shrink-0">{tr.pct}%</span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
