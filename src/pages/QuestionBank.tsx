import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FileQuestion, Play, Search, SlidersHorizontal, X } from 'lucide-react'
import { useSubject } from '../components/layout/SubjectLayout'
import { useQuestions } from '../hooks/useContent'
import { useProgress } from '../hooks/useUserData'
import { paperLabel, sessionName } from '../lib/content'
import { Button, buttonClasses, EmptyState, Input, Select, Sheet, Skeleton } from '../components/ui'
import QuestionList from '../components/questions/QuestionList'
import { FILTER_KEYS, activeFilterCount, applyFilters, readFilters } from '../components/questions/filters'
import type { QFilters } from '../components/questions/filters'

const STATUSES = [
  ['', 'All questions'], ['untried', 'Not tried'], ['tried', 'Tried'], ['done', 'Done'], ['review', 'Needs review'], ['bookmarked', 'Bookmarked'],
] as const

export default function QuestionBank() {
  const { subject, syllabus } = useSubject()
  const { data: all, loading } = useQuestions(subject.id)
  const { progress } = useProgress(subject.id)
  const [sp, setSp] = useSearchParams()
  const [sheet, setSheet] = useState(false)
  const f = readFilters(sp)

  const set = (patch: Partial<QFilters>) => {
    const next = new URLSearchParams(sp)
    for (const [k, v] of Object.entries(patch)) {
      if (!v || (k === 'sort' && v === 'newest')) next.delete(k)
      else next.set(k, v)
    }
    setSp(next, { replace: true })
  }
  const clear = () => setSp(new URLSearchParams(), { replace: true })

  const options = useMemo(() => {
    const qs = all ?? []
    return {
      papers: [...new Set(qs.map((q) => q.paper))].sort((a, b) => a - b),
      years: [...new Set(qs.map((q) => q.year))].sort((a, b) => b - a),
      sessions: [...new Set(qs.map((q) => q.session))],
    }
  }, [all])

  const filtered = useMemo(() => applyFilters(all ?? [], f, progress.questions), [all, sp.toString(), progress.questions]) // eslint-disable-line react-hooks/exhaustive-deps
  const active = activeFilterCount(f)
  const paperChip = useMemo(() => {
    if (!f.paper || /^\d+$/.test(f.paper)) return null
    const q = (all ?? []).find((x) => x.paperId === f.paper)
    return q ? paperLabel(q) : f.paper
  }, [f.paper, all])
  const qsForFrom = useMemo(() => {
    const n = new URLSearchParams(sp); n.delete('n'); return n.toString()
  }, [sp])
  const practiceQs = new URLSearchParams()
  for (const k of FILTER_KEYS) if (f[k] && k !== 'sort' && k !== 'status') practiceQs.set(k, f[k])
  if (f.status === 'review' || f.status === 'untried' || f.status === 'bookmarked') practiceQs.set('status', f.status)

  const controls = (idp: string) => (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Select id={`${idp}-topic`} label="Topic" value={f.topic} onChange={(e) => set({ topic: e.target.value })}>
        <option value="">All topics</option>
        {syllabus.components.map((c) => (
          <optgroup key={c.id} label={c.name}>
            {c.topics.map((t) => <option key={t.id} value={t.id}>{t.number} {t.name}</option>)}
          </optgroup>
        ))}
      </Select>
      <Select id={`${idp}-paper`} label="Paper" value={f.paper} onChange={(e) => set({ paper: e.target.value })}>
        <option value="">All papers</option>
        {options.papers.map((p) => <option key={p} value={p}>Paper {p}</option>)}
        {f.paper && !/^\d+$/.test(f.paper) && <option value={f.paper}>{f.paper}</option>}
      </Select>
      <Select id={`${idp}-year`} label="Year" value={f.year} onChange={(e) => set({ year: e.target.value })}>
        <option value="">All years</option>
        {options.years.map((y) => <option key={y} value={y}>{y}</option>)}
      </Select>
      <Select id={`${idp}-session`} label="Session" value={f.session} onChange={(e) => set({ session: e.target.value })}>
        <option value="">All sessions</option>
        {options.sessions.map((s) => <option key={s} value={s}>{sessionName(s)}</option>)}
      </Select>
      <Select id={`${idp}-level`} label="Level" value={f.level} onChange={(e) => set({ level: e.target.value })}>
        <option value="">AS and A2</option>
        <option value="AS">AS</option>
        <option value="A2">A2</option>
      </Select>
      <Select id={`${idp}-status`} label="Status" value={f.status} onChange={(e) => set({ status: e.target.value })}>
        {STATUSES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </Select>
      <Select id={`${idp}-sort`} label="Sort by" value={f.sort} onChange={(e) => set({ sort: e.target.value })}>
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="marks">Most marks</option>
      </Select>
    </div>
  )

  const search = (
    <div className="relative flex-1 min-w-0">
      <Search className="w-4 h-4 text-ink-3 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden />
      <Input aria-label="Search questions" placeholder="Search question text, e.g. &quot;vectors&quot; or &quot;q4&quot;" value={f.q} onChange={(e) => set({ q: e.target.value })} className="pl-9" />
    </div>
  )

  return (
    <div>
      <div className="lg:sticky lg:top-2 z-20 card p-3 sm:p-4 mb-4 lg:bg-surface/95 lg:backdrop-blur">
        <div className="flex gap-2 items-center">
          {search}
          <Button variant="secondary" className="lg:hidden shrink-0" onClick={() => setSheet(true)} leftIcon={<SlidersHorizontal className="w-4 h-4" />}>
            Filters{active > 0 && ` (${active})`}
          </Button>
        </div>
        <div className="hidden lg:block mt-3">{controls('d')}</div>
      </div>

      <Sheet open={sheet} onClose={() => setSheet(false)} title="Filter questions">
        <div className="[&>div]:grid-cols-1">{controls('m')}</div>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={clear}>Clear all</Button>
          <Button className="flex-1" onClick={() => setSheet(false)}>Show {filtered.length}</Button>
        </div>
      </Sheet>

      {paperChip && (
        <div className="mb-3">
          <button type="button" onClick={() => set({ paper: '' })} aria-label={`Remove paper filter: ${paperChip}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-flame-soft text-flame-strong dark:text-flame px-3 py-1 text-sm font-bold focus-ring cursor-pointer">
            {paperChip}<X className="w-3.5 h-3.5" aria-hidden />
          </button>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3 mb-4" aria-live="polite">
        <p className="text-sm text-ink-2 font-semibold mr-auto">
          {loading ? 'Loading questions...' : `${filtered.length} ${filtered.length === 1 ? 'question' : 'questions'}`}
          {active > 0 && (
            <button type="button" onClick={clear} className="ml-3 inline-flex items-center gap-1 text-flame-strong dark:text-flame font-bold hover:underline cursor-pointer focus-ring rounded">
              <X className="w-3.5 h-3.5" aria-hidden />Clear filters
            </button>
          )}
        </p>
        {filtered.length > 0 && (
          <Link to={`/s/${subject.id}/practice?${practiceQs.toString()}`} className={buttonClasses('primary', 'md')}>
            <Play className="w-4 h-4" aria-hidden />Practise these
          </Link>
        )}
      </div>

      {loading ? (
        <div className="grid gap-3 md:grid-cols-2">{Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-56 rounded-card" />)}</div>
      ) : !all?.length ? (
        <EmptyState icon={<FileQuestion className="w-6 h-6" />} title="Questions are on their way" description="This subject's question bank is still being filled. Meanwhile, the Papers tab has the full past papers." action={<Link className={buttonClasses('secondary')} to={`/s/${subject.id}/papers`}>Open papers</Link>} />
      ) : (
        <QuestionList
          subjectId={subject.id} questions={filtered} from={`bank:${qsForFrom}`}
          emptyHint={f.topic && !all.some((q) => q.topicIds.length) ? 'Questions are still being matched to topics. Try filtering by paper, year or search instead.' : 'Nothing matches those filters. Clear a filter or two and try again.'}
        />
      )}
    </div>
  )
}
