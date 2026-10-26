import { useMemo, useRef } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { BookOpen, ChevronLeft, ChevronRight, FileQuestion, ListChecks, NotebookPen, Play } from 'lucide-react'
import { useSubject } from '../components/layout/SubjectLayout'
import { useNote } from '../hooks/useContent'
import { useProgress } from '../hooks/useUserData'
import { allTopics, componentForTopic, topicById } from '../lib/content'
import { readinessFor } from '../lib/progress'
import { cn } from '../lib/cn'
import { Card, EmptyState, Markdown, ProgressRing, SkeletonText, TabPanel, Tabs, buttonClasses } from '../components/ui'
import QuestionList from '../components/questions/QuestionList'
import { useTopicQuestions } from '../components/questions/hooks'
import NotesPanel from '../components/notes/NotesPanel'
import ObjectiveChecklist from '../components/syllabus/ObjectiveChecklist'
import TableOfContents from '../components/syllabus/TableOfContents'

const TABS = ['learn', 'questions', 'notes', 'checklist'] as const
type Tab = (typeof TABS)[number]

export default function TopicHub() {
  const { subject, syllabus } = useSubject()
  const { topicId } = useParams()
  const [sp, setSp] = useSearchParams()
  const { progress } = useProgress(subject.id)
  const topic = topicById(syllabus, topicId ?? '')
  const comp = topic ? componentForTopic(syllabus, topic.id) : undefined
  const tabParam = sp.get('tab')
  const tab: Tab = (TABS as readonly string[]).includes(tabParam ?? '') ? (tabParam as Tab) : 'learn'
  const setTab = (t: string) => setSp((p) => { const n = new URLSearchParams(p); if (t === 'learn') n.delete('tab'); else n.set('tab', t); return n }, { replace: true })

  const topics = useMemo(() => allTopics(syllabus), [syllabus])
  const idx = topic ? topics.findIndex((t) => t.id === topic.id) : -1
  const prev = idx > 0 ? topics[idx - 1] : undefined
  const next = idx >= 0 && idx < topics.length - 1 ? topics[idx + 1] : undefined

  const { questions } = useTopicQuestions(subject.id, topic?.id)

  if (!topic) {
    return <EmptyState icon={<BookOpen />} title="We can't find that topic" description="It may have been renamed. Head back to the syllabus and pick another one." action={<Link className={buttonClasses('secondary')} to={`/s/${subject.id}`}>Back to syllabus</Link>} />
  }

  const r = readinessFor(topic.objectives.map((o) => o.id), progress)
  const items = [
    { id: 'learn', label: 'Learn', icon: <BookOpen size={16} /> },
    { id: 'questions', label: 'Questions', icon: <FileQuestion size={16} />, count: questions.length },
    { id: 'notes', label: 'My notes', icon: <NotebookPen size={16} /> },
    { id: 'checklist', label: 'Checklist', icon: <ListChecks size={16} />, count: topic.objectives.length },
  ]

  return (
    <div className="space-y-5">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-2">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <li><Link to={`/s/${subject.id}`} className="hover:text-ink focus-ring rounded">{subject.name}</Link></li>
          {comp && <><li aria-hidden><ChevronRight size={14} className="text-ink-3" /></li><li>{comp.name}</li></>}
          <li aria-hidden><ChevronRight size={14} className="text-ink-3" /></li>
          <li aria-current="page" className="font-bold text-ink">{topic.name}</li>
        </ol>
      </nav>

      <Card className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <ProgressRing value={r.pct} size={72} stroke={7} strokeClass={subject.cls.stroke} label={`${topic.name} readiness`} />
          <div className="min-w-0">
            <div className={cn('text-xs font-bold uppercase tracking-wider', subject.cls.text)}>Topic {topic.number}{comp?.papers.length ? ` · Paper ${comp.papers.join(', ')}` : ''}</div>
            <h2 className="font-display text-2xl font-extrabold text-ink tracking-tight leading-tight">{topic.name}</h2>
            <p className="text-sm text-ink-2 mt-0.5">{r.total === 0 ? 'No objectives listed.' : r.green === r.total ? 'All objectives green. Nicely cooked.' : `${r.green} of ${r.total} objectives confident${r.total - r.rated ? ` · ${r.total - r.rated} to rate` : ''}`}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link to={`/s/${subject.id}/practice?topic=${topic.id}`} className={buttonClasses('primary', 'md')}><Play size={16} aria-hidden /> Practise this topic</Link>
          <div className="flex gap-1">
            {prev ? <Link to={`/s/${subject.id}/topic/${prev.id}`} aria-label={`Previous topic: ${prev.name}`} title={prev.name} className={buttonClasses('secondary', 'md', 'w-10 px-0')}><ChevronLeft size={18} /></Link> : <span className={buttonClasses('secondary', 'md', 'w-10 px-0 opacity-40 pointer-events-none')} aria-hidden><ChevronLeft size={18} /></span>}
            {next ? <Link to={`/s/${subject.id}/topic/${next.id}`} aria-label={`Next topic: ${next.name}`} title={next.name} className={buttonClasses('secondary', 'md', 'w-10 px-0')}><ChevronRight size={18} /></Link> : <span className={buttonClasses('secondary', 'md', 'w-10 px-0 opacity-40 pointer-events-none')} aria-hidden><ChevronRight size={18} /></span>}
          </div>
        </div>
      </Card>

      <Tabs items={items} value={tab} onChange={setTab} idPrefix="topic" label="Topic sections" />

      <TabPanel idPrefix="topic" id="learn" value={tab}>
        <LearnTab subjectId={subject.id} topicId={topic.id} accent={subject.cls.text} objectives={topic.objectives} onSeeQuestions={() => setTab('questions')} />
      </TabPanel>
      <TabPanel idPrefix="topic" id="questions" value={tab}>
        <QuestionsTab subjectId={subject.id} topicId={topic.id} questions={questions} soft={subject.cls.soft} text={subject.cls.text} />
      </TabPanel>
      <TabPanel idPrefix="topic" id="notes" value={tab}>
        <NotesPanel subjectId={subject.id} topicId={topic.id} />
      </TabPanel>
      <TabPanel idPrefix="topic" id="checklist" value={tab}>
        <Card><ObjectiveChecklist subjectId={subject.id} objectives={topic.objectives} /></Card>
      </TabPanel>
    </div>
  )
}

function LearnTab({ subjectId, topicId, accent, objectives, onSeeQuestions }: { subjectId: Parameters<typeof useNote>[0]; topicId: string; accent: string; objectives: import('../types/content').Objective[]; onSeeQuestions: () => void }) {
  const { data: note, loading } = useNote(subjectId, topicId)
  const body = useRef<HTMLDivElement>(null)
  // The page header already shows the topic name, so drop the note's own H1.
  const md = useMemo(() => (note ?? '').replace(/^\s*#\s+.*\n/, ''), [note])
  const checklist = (
    <Card padding="sm" className="p-4">
      <h3 className="font-display font-bold text-ink mb-3 flex items-center gap-2"><ListChecks size={16} className="text-flame" /> Objectives</h3>
      <ObjectiveChecklist subjectId={subjectId!} objectives={objectives} compact />
    </Card>
  )
  return (
    <div className="grid gap-6 xl:grid-cols-[13rem_minmax(0,1fr)_21rem] lg:grid-cols-[minmax(0,1fr)_20rem]">
      <aside className="hidden xl:block"><div className="sticky top-20"><TableOfContents root={body} deps={md} accent={accent} /></div></aside>
      <div className="min-w-0 order-first lg:order-none">
        {loading ? (
          <SkeletonText lines={8} />
        ) : note ? (
          <Card padding="lg" className="p-5 sm:p-7"><div ref={body}><Markdown>{md}</Markdown></div></Card>
        ) : (
          <EmptyState
            icon={<BookOpen />} title="Notes for this topic are on the way"
            description="Until then, tick through the objectives on the right and test yourself with real exam questions."
            action={<button type="button" className={buttonClasses('secondary')} onClick={onSeeQuestions}>See questions</button>}
          />
        )}
      </div>
      <aside className="min-w-0 lg:block"><div className="lg:sticky lg:top-20">{checklist}</div></aside>
    </div>
  )
}

function QuestionsTab({ subjectId, topicId, questions, soft, text }: { subjectId: Parameters<typeof useNote>[0]; topicId: string; questions: import('../types/content').Question[]; soft: string; text: string }) {
  const [sp, setSp] = useSearchParams()
  const paper = sp.get('paper') ?? ''
  const year = sp.get('year') ?? ''
  const set = (k: string, v: string) => setSp((p) => { const n = new URLSearchParams(p); if (!v || n.get(k) === v) n.delete(k); else n.set(k, v); return n }, { replace: true })
  const papers = useMemo(() => [...new Set(questions.map((q) => q.paper))].sort((a, b) => a - b), [questions])
  const years = useMemo(() => [...new Set(questions.map((q) => q.year))].sort((a, b) => b - a), [questions])
  const filtered = useMemo(() => questions.filter((q) => (!paper || String(q.paper) === paper) && (!year || String(q.year) === year)), [questions, paper, year])

  const chip = (active: boolean, label: string, onClick: () => void, key: string) => (
    <button key={key} type="button" aria-pressed={active} onClick={onClick} className={cn('px-3 min-h-9 rounded-full text-sm font-bold focus-ring cursor-pointer transition-colors', active ? cn(soft, text) : 'bg-surface-2 text-ink-2 hover:text-ink')}>{label}</button>
  )
  return (
    <div className="space-y-4">
      {questions.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-ink-2" aria-live="polite">{filtered.length === questions.length ? `${questions.length} questions on this topic` : `${filtered.length} of ${questions.length} questions`}</p>
          {papers.length > 1 && <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by paper">{papers.map((p) => chip(paper === String(p), `Paper ${p}`, () => set('paper', String(p)), `p${p}`))}</div>}
          {years.length > 1 && <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by year">{years.map((y) => chip(year === String(y), String(y), () => set('year', String(y)), `y${y}`))}</div>}
        </div>
      )}
      <QuestionList
        subjectId={subjectId!}
        questions={filtered}
        from={`topic:${topicId}`}
        emptyHint={questions.length ? 'No questions match those filters. Clear a chip to see more.' : 'No questions are tagged to this topic yet. Check the question bank or past papers meanwhile.'}
      />
    </div>
  )
}
