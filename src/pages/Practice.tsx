import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Check, Eye, EyeOff, FileQuestion, RotateCcw, SkipForward, Trophy } from 'lucide-react'
import { useSubject } from '../components/layout/SubjectLayout'
import { useQuestions } from '../hooks/useContent'
import { useProgress } from '../hooks/useUserData'
import { paperLabel, topicById } from '../lib/content'
import { cn } from '../lib/cn'
import { Badge, Button, buttonClasses, EmptyState, ProgressBar, SkeletonText } from '../components/ui'
import { LevelBadge, ScanImage } from '../components/questions/parts'
import { applyFilters, readFilters } from '../components/questions/filters'
import type { Question } from '../types/content'

interface Session { sig: string; ids: string[]; idx: number; results: Record<string, 'done' | 'review' | 'skip'> }

const shuffle = <T,>(a: T[]) => {
  const r = [...a]
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]] }
  return r
}

export default function Practice() {
  const { subject, syllabus } = useSubject()
  const { data: all, loading } = useQuestions(subject.id)
  const { progress, setQuestionStatus } = useProgress(subject.id)
  const [sp] = useSearchParams()
  const storeKey = `cyal:practice:${subject.id}`
  const sig = sp.toString()
  const [session, setSession] = useState<Session | null>(() => {
    try {
      const s = JSON.parse(sessionStorage.getItem(storeKey) || 'null') as Session | null
      return s && s.sig === sig ? s : null
    } catch { return null }
  })
  const [reveal, setReveal] = useState(false)

  const persist = useCallback((s: Session | null) => {
    setSession(s)
    try { if (s) sessionStorage.setItem(storeKey, JSON.stringify(s)); else sessionStorage.removeItem(storeKey) } catch { /* ignore */ }
  }, [storeKey])

  const byId = useMemo(() => new Map((all ?? []).map((q) => [q.id, q])), [all])

  const build = useCallback((pool: Question[], n: number, s: string): Session => {
    const fresh = shuffle(pool.filter((q) => progress.questions[q.id]?.s !== 'done'))
    const done = shuffle(pool.filter((q) => progress.questions[q.id]?.s === 'done'))
    return { sig: s, ids: [...fresh, ...done].slice(0, n).map((q) => q.id), idx: 0, results: {} }
  }, [progress.questions])

  const n = Math.max(1, Math.min(50, parseInt(sp.get('n') || '10', 10) || 10))
  const pool = useMemo(
    () => (all ? applyFilters(all, readFilters(sp), progress.questions) : []),
    [all, sig, progress.questions], // eslint-disable-line react-hooks/exhaustive-deps
  )

  // New params (or none stored) -> start a fresh session once data is ready
  useEffect(() => {
    if (!all) return
    if (session && session.sig === sig) return
    if (!pool.length) { setSession(null); return }
    persist(build(pool, n, sig))
    setReveal(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all, sig])

  const qs = useMemo(() => (session ? session.ids.map((id) => byId.get(id)).filter((q): q is Question => !!q) : []), [session, byId])
  const finished = !!session && session.idx >= qs.length
  const cur = session && !finished ? qs[session.idx] : undefined

  const answer = (r: 'done' | 'review' | 'skip') => {
    if (!session || !cur) return
    if (r !== 'skip') setQuestionStatus(cur.id, r)
    persist({ ...session, idx: session.idx + 1, results: { ...session.results, [cur.id]: r } })
    setReveal(false)
    window.scrollTo({ top: 0 })
  }

  useEffect(() => {
    if (!cur) return
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target as HTMLElement | null
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return
      if (document.querySelector('[role="dialog"]')) return
      if (e.key === 'm' || e.key === 'M') setReveal((r) => !r)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cur])

  const topicParam = sp.get('topic')
  const backTo = topicParam ? { to: `/s/${subject.id}/topic/${topicParam}`, label: 'Back to topic' } : { to: `/s/${subject.id}/questions`, label: 'Back to questions' }

  if (loading || (all && !session && pool.length > 0)) return <SkeletonText lines={6} />
  if (!all?.length || !pool.length || !session) {
    return (
      <EmptyState
        icon={<FileQuestion className="w-6 h-6" />}
        title={all?.length ? 'No questions match that practice set' : 'No questions to practise yet'}
        description={all?.length ? 'Loosen a filter and try again, or pick a different topic.' : 'This subject is still being filled. Check the Papers tab meanwhile.'}
        action={<Link className={buttonClasses('secondary')} to={backTo.to}>{backTo.label}</Link>}
      />
    )
  }

  if (finished) {
    const results = qs.map((q) => ({ q, r: session.results[q.id] }))
    const got = results.filter((x) => x.r === 'done').length
    const missed = results.filter((x) => x.r === 'review')
    const pct = Math.round((got / Math.max(1, qs.length)) * 100)
    const groups = new Map<string, { name: string; got: number; total: number }>()
    for (const { q, r } of results) {
      const id = q.topicIds[0] ?? ''
      const g = groups.get(id) ?? { name: (id && topicById(syllabus, id)?.name) || 'Not yet sorted into a topic', got: 0, total: 0 }
      g.total++; if (r === 'done') g.got++
      groups.set(id, g)
    }
    const retry = () => { persist({ sig, ids: missed.map((x) => x.q.id), idx: 0, results: {} }); setReveal(false) }
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="card p-6 text-center">
          <Trophy className="w-10 h-10 text-flame mx-auto" aria-hidden />
          <h2 className="font-display text-3xl font-extrabold mt-2">{got} of {qs.length} nailed</h2>
          <p className="text-ink-2 mt-1">{pct >= 80 ? 'Brilliant work. Keep that momentum.' : pct >= 50 ? 'Solid. A bit more practice on the tricky ones and you are there.' : 'Every miss is a lesson. Review those and go again.'}</p>
          <div className="mt-4"><ProgressBar value={pct} colorClass={subject.cls.bar} /></div>
        </div>
        <div className="card p-5 mt-4">
          <h3 className="font-display font-bold mb-3">By topic</h3>
          <ul className="space-y-3">
            {[...groups.entries()].map(([id, g]) => (
              <li key={id}>
                <div className="flex justify-between text-sm"><span className="font-semibold text-ink">{g.name}</span><span className="text-ink-2">{g.got}/{g.total}</span></div>
                <ProgressBar value={(g.got / g.total) * 100} colorClass={subject.cls.bar} height="sm" />
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5 flex flex-col sm:flex-row gap-2">
          {missed.length > 0 && <Button onClick={retry} leftIcon={<RotateCcw className="w-4 h-4" />}>Practise mistakes again ({missed.length})</Button>}
          <Button variant="secondary" onClick={() => { persist(build(pool, n, sig)); setReveal(false) }}>New session</Button>
          <Link className={buttonClasses('secondary')} to={backTo.to}>{backTo.label}</Link>
        </div>
      </div>
    )
  }

  if (!cur) return null
  const total = qs.length
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-2">
        <Link to={backTo.to} className="text-sm font-semibold text-ink-2 hover:text-ink focus-ring rounded">Quit practice</Link>
        <span className="text-sm text-ink-2 font-semibold" aria-live="polite">Question {session.idx + 1} of {total}</span>
      </div>
      <ProgressBar value={(session.idx / total) * 100} colorClass={subject.cls.bar} />

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span className="font-display font-bold">Q{cur.number}</span>
        <span className="text-sm text-ink-2">{paperLabel(cur)}</span>
        <LevelBadge level={cur.level} />
        {cur.marks > 0 && <Badge>{cur.marks} marks</Badge>}
      </div>

      <div className="mt-3 space-y-2">
        {cur.images.length ? cur.images.map((src, i) => <ScanImage key={src} src={src} alt={`Question ${cur.number}, part ${i + 1}`} className="shadow-soft" />)
          : <div className="card p-5 whitespace-pre-wrap">{cur.text}</div>}
      </div>

      <div className="mt-5">
        {!reveal ? (
          <Button variant="secondary" size="lg" className="w-full sm:w-auto" onClick={() => setReveal(true)} leftIcon={<Eye className="w-5 h-5" />}>Reveal mark scheme</Button>
        ) : (
          <div className="card p-4 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold">Mark scheme</h3>
              <Button variant="ghost" size="sm" onClick={() => setReveal(false)} leftIcon={<EyeOff className="w-4 h-4" />}>Hide</Button>
            </div>
            {cur.mcqAnswer && (
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-semibold text-ink-2">Correct answer</span>
                <span className={cn('inline-flex items-center justify-center w-14 h-14 rounded-card font-display text-3xl font-extrabold', subject.cls.soft, subject.cls.text)}>{cur.mcqAnswer}</span>
              </div>
            )}
            <div className="space-y-2">{cur.msImages.map((src, i) => <ScanImage key={src} src={src} alt={`Mark scheme, part ${i + 1}`} />)}</div>
            {!cur.msImages.length && !cur.mcqAnswer && <p className="text-sm text-ink-2">No cropped mark scheme yet. Check the full mark scheme on the question page.</p>}
          </div>
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sticky bottom-16 lg:bottom-3 z-10 bg-bg/90 backdrop-blur py-2 -mx-1 px-1">
        <button type="button" onClick={() => answer('review')} className="h-12 rounded-control border border-conf-amber text-conf-amber font-bold inline-flex items-center justify-center gap-2 hover:bg-conf-amber/10 focus-ring cursor-pointer"><RotateCcw className="w-4 h-4" aria-hidden />Not yet</button>
        <button type="button" onClick={() => answer('done')} className="h-12 rounded-control bg-conf-green text-white font-bold inline-flex items-center justify-center gap-2 hover:brightness-110 focus-ring cursor-pointer"><Check className="w-4 h-4" aria-hidden />Got it</button>
      </div>
      <div className="text-center"><button type="button" onClick={() => answer('skip')} className="text-sm text-ink-3 hover:text-ink inline-flex items-center gap-1 focus-ring rounded cursor-pointer"><SkipForward className="w-3.5 h-3.5" aria-hidden />Skip this one</button></div>
    </div>
  )
}
