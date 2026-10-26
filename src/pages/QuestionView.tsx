import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ExternalLink, Eye, EyeOff, FileQuestion, NotebookPen, RotateCcw, CircleDot } from 'lucide-react'
import { useSubject } from '../components/layout/SubjectLayout'
import { usePapers, useQuestions } from '../hooks/useContent'
import { useProgress } from '../hooks/useUserData'
import { paperLabel, topicById } from '../lib/content'
import { cn } from '../lib/cn'
import { Badge, Button, buttonClasses, EmptyState, Modal, SkeletonText } from '../components/ui'
import { BookmarkButton, LevelBadge, ScanImage, StatusPill } from '../components/questions/parts'
import type { QStatus } from '../components/questions/parts'
import { backPathForFrom, questionsForFrom } from '../components/questions/filters'

// NotesPanel is built by another agent; resolve it at build time so a missing file never breaks the build.
const notesModules = import.meta.glob('../components/notes/NotesPanel.tsx') as Record<string, () => Promise<{ default: React.ComponentType<any> }>>
const loadNotes = Object.values(notesModules)[0]
const NotesPanel = loadNotes ? lazy(loadNotes) : null

const PAPACAMBRIDGE = 'https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload/'

export default function QuestionView() {
  const { subject, syllabus } = useSubject()
  const { questionId } = useParams()
  const [sp] = useSearchParams()
  const from = sp.get('from')
  const navigate = useNavigate()
  const { data: all, loading } = useQuestions(subject.id)
  const { data: papers } = usePapers(subject.id)
  const { progress, setQuestionStatus, toggleBookmark } = useProgress(subject.id)
  const [reveal, setReveal] = useState(false)
  const [zoom, setZoom] = useState<string | null>(null)

  const q = all?.find((x) => x.id === questionId)
  const entry = q ? progress.questions[q.id] : undefined
  const status = entry?.s as QStatus | undefined

  const list = useMemo(() => {
    if (!q || !all) return []
    const l = questionsForFrom(from, all, progress.questions)
    if (l && l.some((x) => x.id === q.id)) return l
    return all.filter((x) => x.paperId === q.paperId).sort((a, b) => a.number - b.number)
    // progress only matters for 'bank:' status filters; freeze on question change to keep order stable while marking
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id, all, from])
  const idx = q ? list.findIndex((x) => x.id === q.id) : -1
  const prev = idx > 0 ? list[idx - 1] : undefined
  const next = idx >= 0 && idx < list.length - 1 ? list[idx + 1] : undefined
  const back = backPathForFrom(subject.id, from)

  const go = useCallback((target?: { id: string }) => {
    if (target) navigate(`/s/${subject.id}/q/${target.id}${from ? `?from=${encodeURIComponent(from)}` : ''}`)
  }, [navigate, subject.id, from])

  useEffect(() => { setReveal(false); setZoom(null); window.scrollTo({ top: 0 }) }, [questionId])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target as HTMLElement | null
      if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return
      if (document.querySelector('[role="dialog"]')) return
      if (e.key === 'ArrowLeft') { go(prev) }
      else if (e.key === 'ArrowRight') { go(next) }
      else if (e.key === 'm' || e.key === 'M') { setReveal((r) => !r) }
      else if ((e.key === 'b' || e.key === 'B') && q) { toggleBookmark(q.id) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, prev, next, q, toggleBookmark])

  if (loading) return <SkeletonText lines={8} />
  if (!q) {
    return (
      <EmptyState icon={<FileQuestion className="w-6 h-6" />} title="We couldn't find that question" description="It may have been removed or the link is out of date. Head back to the question bank to pick another."
        action={<Link className={buttonClasses('secondary')} to={`/s/${subject.id}/questions`}>Back to questions</Link>} />
    )
  }

  const paper = papers?.find((p) => p.id === q.paperId)
  const [code, sess, pv] = q.paperId.split('_')
  const fallback = (type: string) => (code && sess && pv ? `${PAPACAMBRIDGE}${code}_${sess}_${type}_${pv}.pdf` : undefined)
  const qpUrl = paper?.links.qp ?? fallback('qp')
  const msUrl = paper?.links.ms ?? fallback('ms')
  const topics = q.topicIds.map((id) => topicById(syllabus, id)).filter((t): t is NonNullable<typeof t> => !!t)
  const mark = (s: QStatus) => setQuestionStatus(q.id, status === s ? null : s)
  const hasMs = q.msImages.length > 0 || !!q.mcqAnswer

  const markBtn = (s: QStatus, label: string, Icon: typeof Check, activeCls: string) => (
    <button
      type="button" onClick={() => mark(s)} aria-pressed={status === s}
      className={cn('flex-1 sm:flex-none inline-flex items-center justify-center gap-2 h-11 px-4 rounded-control border text-sm font-semibold focus-ring cursor-pointer transition-colors',
        status === s ? activeCls : 'bg-surface text-ink border-border hover:bg-surface-2')}
    >
      <Icon className="w-4 h-4" aria-hidden />{label}
    </button>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-2 mb-3">
        <Link to={back.to} className="inline-flex items-center gap-1 text-sm font-semibold text-ink-2 hover:text-ink focus-ring rounded">
          <ChevronLeft className="w-4 h-4" aria-hidden />{back.label}
        </Link>
        {idx >= 0 && <span className="text-sm text-ink-3" aria-live="polite">{idx + 1} of {list.length}</span>}
      </div>

      <header className="card p-4 sm:p-5 mb-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-ink">Question {q.number}</h2>
            <p className="text-ink-2 text-sm mt-0.5">{paperLabel(q)}</p>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <LevelBadge level={q.level} />
              {q.marks > 0 && <Badge>{q.marks} {q.marks === 1 ? 'mark' : 'marks'}</Badge>}
              <StatusPill status={status} />
              {topics.map((t) => (
                <Link key={t.id} to={`/s/${subject.id}/topic/${t.id}`} className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold leading-5 focus-ring hover:brightness-95', subject.cls.soft, subject.cls.text)}>
                  {t.name}
                </Link>
              ))}
              {!topics.length && <span className="text-xs text-ink-3">Topic not yet assigned</span>}
            </div>
          </div>
          <BookmarkButton on={!!entry?.b} onToggle={() => toggleBookmark(q.id)} />
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {qpUrl && <a href={qpUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-flame-strong dark:text-flame hover:underline focus-ring rounded">Full question paper<ExternalLink className="w-3.5 h-3.5" aria-hidden /></a>}
          {msUrl && <a href={msUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-flame-strong dark:text-flame hover:underline focus-ring rounded">Full mark scheme<ExternalLink className="w-3.5 h-3.5" aria-hidden /></a>}
        </div>
      </header>

      <section aria-label="Question" className="space-y-2">
        {q.images.length ? q.images.map((src, i) => (
          <ScanImage key={src} src={src} alt={`Question ${q.number}, part ${i + 1} of ${q.images.length}`} onClick={() => setZoom(src)} className="shadow-soft" />
        )) : (
          <div className="card p-5 whitespace-pre-wrap text-ink">{q.text}</div>
        )}
      </section>
      <p className="mt-2 text-xs text-ink-3">Tap an image to zoom. Shortcuts: arrow keys to move, M for mark scheme, B to bookmark.</p>

      <section aria-label="Mark scheme" className="mt-6">
        {!reveal ? (
          <Button variant="secondary" size="lg" className="w-full sm:w-auto" onClick={() => setReveal(true)} leftIcon={<Eye className="w-5 h-5" />}>
            Reveal mark scheme
          </Button>
        ) : (
          <div className="card p-4 sm:p-5 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-lg font-bold">Mark scheme</h3>
              <Button variant="ghost" size="sm" onClick={() => setReveal(false)} leftIcon={<EyeOff className="w-4 h-4" />}>Hide</Button>
            </div>
            {q.mcqAnswer && (
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm text-ink-2 font-semibold">Correct answer</span>
                <span className={cn('inline-flex items-center justify-center w-16 h-16 rounded-card font-display text-4xl font-extrabold', subject.cls.soft, subject.cls.text)}>{q.mcqAnswer}</span>
              </div>
            )}
            {q.msImages.length > 0 && (
              <div className="space-y-2">
                {q.msImages.map((src, i) => (
                  <ScanImage key={src} src={src} alt={`Mark scheme, part ${i + 1} of ${q.msImages.length}`} onClick={() => setZoom(src)} />
                ))}
              </div>
            )}
            {!hasMs && (
              <p className="text-sm text-ink-2">
                We don't have a cropped mark scheme for this one yet.{' '}
                {msUrl && <a href={msUrl} target="_blank" rel="noreferrer" className="font-semibold text-flame-strong dark:text-flame hover:underline">Open the full mark scheme PDF</a>}
              </p>
            )}
          </div>
        )}
      </section>

      <section aria-label="How did it go?" className="mt-6">
        <h3 className="text-sm font-bold text-ink mb-2">How did it go?</h3>
        <div className="flex flex-wrap gap-2">
          {markBtn('done', 'Got it', Check, 'bg-conf-green text-white border-conf-green')}
          {markBtn('review', 'Needs review', RotateCcw, 'bg-conf-amber text-white border-conf-amber')}
          {markBtn('tried', 'Tried', CircleDot, 'bg-ink text-bg border-ink')}
        </div>
      </section>

      <nav aria-label="Question navigation" className="mt-6 flex items-center justify-between gap-2">
        <Button variant="secondary" disabled={!prev} onClick={() => go(prev)} leftIcon={<ArrowLeft className="w-4 h-4" />}>Previous</Button>
        <Button variant={next ? 'primary' : 'secondary'} disabled={!next} onClick={() => go(next)} rightIcon={<ArrowRight className="w-4 h-4" />}>Next</Button>
      </nav>

      {NotesPanel && (
        <section aria-label="Notes" className="mt-8">
          <h3 className="font-display text-lg font-bold flex items-center gap-2 mb-2"><NotebookPen className="w-5 h-5 text-flame" aria-hidden />Add a note</h3>
          <Suspense fallback={<SkeletonText lines={3} />}>
            <NotesPanel subjectId={subject.id} questionId={q.id} topicId={q.topicIds[0]} compact />
          </Suspense>
        </section>
      )}

      <Modal open={!!zoom} onClose={() => setZoom(null)} title={`Question ${q.number}`} size="lg">
        {zoom && <img src={zoom} alt="Full size" className="block w-full h-auto bg-white rounded-control" />}
      </Modal>
    </div>
  )
}
