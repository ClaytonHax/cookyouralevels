import { useMemo, useState } from 'react'
import { FileText, Search } from 'lucide-react'
import { useSubject } from '../components/layout/SubjectLayout'
import { usePapers } from '../hooks/useContent'
import { useProgress } from '../hooks/useUserData'
import { sessionName } from '../lib/content'
import type { PaperRef, SessionCode } from '../types/content'
import { Button, Card, EmptyState, Input, SkeletonText } from '../components/ui'
import PaperRow, { pctTone, scorePct } from '../components/papers/PaperRow'
import { cn } from '../lib/cn'

const SESSION_ORDER: SessionCode[] = ['m', 's', 'w']

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick}
      className={cn('h-8 px-3 rounded-full text-sm font-bold border cursor-pointer focus-ring transition-colors',
        active ? 'bg-flame-strong text-white border-transparent' : 'bg-surface text-ink-2 border-border hover:bg-surface-2')}>
      {children}
    </button>
  )
}

export default function Papers() {
  const { subject } = useSubject()
  const { data: papers, loading } = usePapers(subject.id)
  const { progress, logPaper } = useProgress(subject.id)
  const [paperNo, setPaperNo] = useState<number | null>(null)
  const [level, setLevel] = useState<string | null>(null)
  const [year, setYear] = useState('')
  const [onlyOpen, setOnlyOpen] = useState(false)

  const list: PaperRef[] = papers ?? []
  const numbers = useMemo(() => [...new Set(list.map((p) => p.paper))].sort((a, b) => a - b), [list])
  const levels = useMemo(() => [...new Set(list.map((p) => p.level))].sort(), [list])

  const filtered = useMemo(() => list.filter((p) =>
    (paperNo === null || p.paper === paperNo) && (!level || p.level === level) &&
    (!year.trim() || String(p.year).includes(year.trim())) && (!onlyOpen || !progress.papers[p.id]?.done)), [list, paperNo, level, year, onlyOpen, progress.papers])

  const years = useMemo(() => {
    const byYear = new Map<number, Map<SessionCode, PaperRef[]>>()
    for (const p of filtered) {
      const ys = byYear.get(p.year) ?? new Map<SessionCode, PaperRef[]>()
      ys.set(p.session, [...(ys.get(p.session) ?? []), p])
      byYear.set(p.year, ys)
    }
    return [...byYear.entries()].sort((a, b) => b[0] - a[0]).map(([y, ss]) => ({
      year: y,
      sessions: SESSION_ORDER.filter((s) => ss.has(s)).map((s) => ({
        session: s, papers: ss.get(s)!.sort((a, b) => a.paper - b.paper || a.variant - b.variant),
      })),
    }))
  }, [filtered])

  const stats = useMemo(() => {
    const logs = list.map((p) => ({ p, log: progress.papers[p.id] })).filter((x) => x.log?.done)
    const scored = logs.map((x) => ({ p: x.p, pct: scorePct(x.log) })).filter((x): x is { p: PaperRef; pct: number } => x.pct !== null)
    const avg = scored.length ? Math.round(scored.reduce((s, x) => s + x.pct, 0) / scored.length) : null
    const best = scored.length ? scored.reduce((a, b) => (b.pct > a.pct ? b : a)) : null
    return { done: logs.length, avg, best }
  }, [list, progress.papers])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-ink">Past papers</h1>
        <p className="text-ink-2 mt-1">Question papers, mark schemes and examiner reports for {subject.name}. They open on PapaCambridge in a new tab.</p>
      </div>

      {loading ? <SkeletonText lines={6} /> : list.length === 0 ? (
        <EmptyState icon={<FileText className="w-6 h-6" />} title="Past papers are on their way"
          description="The paper library for this subject isn't loaded yet. In the meantime, try the Questions tab to practise by topic." />
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3">
            <Card padding="sm"><p className="text-xs font-bold text-ink-3">Papers done</p><p className="font-display text-2xl font-extrabold text-ink">{stats.done}<span className="text-sm font-semibold text-ink-3"> / {list.length}</span></p></Card>
            <Card padding="sm"><p className="text-xs font-bold text-ink-3">Average</p>
              {stats.avg !== null ? <p className={cn('font-display text-2xl font-extrabold inline-block rounded-control px-1.5 -mx-1.5', pctTone(stats.avg))}>{stats.avg}%</p>
                : <p className="text-sm text-ink-3 mt-1">Log a score</p>}</Card>
            <Card padding="sm"><p className="text-xs font-bold text-ink-3">Best paper</p>
              {stats.best ? <><p className="font-display text-2xl font-extrabold text-ink">{stats.best.pct}%</p><p className="text-xs text-ink-3 truncate">{sessionName(stats.best.p.session)} {stats.best.p.year} P{stats.best.p.paper}{stats.best.p.variant}</p></>
                : <p className="text-sm text-ink-3 mt-1">Nothing yet</p>}</Card>
          </div>

          <div className="space-y-3">
            <div className="max-w-xs relative">
              <Search className="w-4 h-4 text-ink-3 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden />
              <Input aria-label="Search by year" inputMode="numeric" placeholder="Search year, e.g. 2023" value={year} onChange={(e) => setYear(e.target.value)} className="pl-9" />
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filters">
              <Chip active={paperNo === null} onClick={() => setPaperNo(null)}>All papers</Chip>
              {numbers.map((n) => <Chip key={n} active={paperNo === n} onClick={() => setPaperNo(paperNo === n ? null : n)}>Paper {n}</Chip>)}
              {levels.length > 1 && levels.map((l) => <Chip key={l} active={level === l} onClick={() => setLevel(level === l ? null : l)}>{l}</Chip>)}
              <Chip active={onlyOpen} onClick={() => setOnlyOpen(!onlyOpen)}>Not done yet</Chip>
            </div>
          </div>

          {years.length === 0 ? (
            <EmptyState icon={<Search className="w-6 h-6" />} title="No papers match" description="Try removing a filter or searching a different year."
              action={<Button variant="secondary" onClick={() => { setPaperNo(null); setLevel(null); setYear(''); setOnlyOpen(false) }}>Clear filters</Button>} />
          ) : years.map((y) => (
            <section key={y.year} aria-labelledby={`y-${y.year}`} className="space-y-3">
              <h2 id={`y-${y.year}`} className="font-display text-xl font-extrabold text-ink">{y.year}</h2>
              {y.sessions.map((s) => (
                <div key={s.session}>
                  <h3 className="text-sm font-bold text-ink-3 mb-1.5 uppercase tracking-wide">{sessionName(s.session)}</h3>
                  <Card padding="none" className="overflow-hidden">
                    <ul>
                      {s.papers.map((p) => (
                        <PaperRow key={p.id} paper={p} subjectId={subject.id} log={progress.papers[p.id]} onLog={(v) => void logPaper(p.id, v)} />
                      ))}
                    </ul>
                  </Card>
                </div>
              ))}
            </section>
          ))}
        </>
      )}
    </div>
  )
}
