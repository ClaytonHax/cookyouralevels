import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'
import type { Question, SubjectId } from '../../types/content'
import { useSyllabus } from '../../hooks/useContent'
import { useProgress } from '../../hooks/useUserData'
import { paperLabel, topicById } from '../../lib/content'
import { cn } from '../../lib/cn'
import { Badge, Button, EmptyState } from '../ui'
import { BookmarkButton, LevelBadge, StatusPill } from './parts'
import type { QStatus } from './parts'

export interface QuestionCardProps {
  question: Question
  topicName?: string
  status?: QStatus
  bookmarked?: boolean
  onBookmark?: () => void
  from?: string
}

export function QuestionCard({ question: q, topicName, status, bookmarked, onBookmark, from }: QuestionCardProps) {
  const href = `/s/${q.subjectId}/q/${q.id}${from ? `?from=${encodeURIComponent(from)}` : ''}`
  const img = q.images[0]
  return (
    <article className={cn('card relative group transition-shadow hover:shadow-lift focus-within:shadow-lift overflow-hidden', status === 'done' && 'border-conf-green/40')}>
      <Link to={href} className="block p-4 pr-14 focus-ring rounded-card" aria-label={`Open question ${q.number}, ${paperLabel(q)}`}>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-display font-bold text-ink">Q{q.number}</span>
          <span className="text-sm text-ink-2">{paperLabel(q)}</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <LevelBadge level={q.level} />
          {q.marks > 0 && <Badge>{q.marks} {q.marks === 1 ? 'mark' : 'marks'}</Badge>}
          {q.mcqAnswer && <Badge tone="neutral">MCQ</Badge>}
          {topicName && <Badge tone="flame" className="max-w-full truncate">{topicName}</Badge>}
          <StatusPill status={status} />
        </div>
        <div className="mt-3">
          {img ? (
            <div className="relative bg-white rounded-control overflow-hidden ring-1 ring-black/5 max-h-[180px]">
              <img src={img} alt="" loading="lazy" decoding="async" className="block w-full h-auto" />
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" aria-hidden />
            </div>
          ) : (
            <p className="text-sm text-ink-2 line-clamp-3">{q.text || 'No preview available.'}</p>
          )}
        </div>
      </Link>
      {onBookmark && <BookmarkButton on={!!bookmarked} onToggle={onBookmark} className="absolute top-2 right-2 z-10" />}
    </article>
  )
}

export interface QuestionListProps {
  subjectId: SubjectId
  questions: Question[]
  emptyHint?: string
  pageSize?: number
  /** Context for the question view: 'topic:<id>' | 'paper:<id>' | 'bank:<querystring>' */
  from?: string
}

/** Paginated list of question cards, wired to progress. */
export default function QuestionList({ subjectId, questions, emptyHint, pageSize = 20, from }: QuestionListProps) {
  const { data: syllabus } = useSyllabus(subjectId)
  const { progress, toggleBookmark } = useProgress(subjectId)
  const [shown, setShown] = useState(pageSize)
  const key = `${questions.length}:${questions[0]?.id ?? ''}`
  useEffect(() => setShown(pageSize), [key, pageSize])

  if (!questions.length) {
    return <EmptyState icon={<FileQuestion className="w-6 h-6" />} title="No questions here yet" description={emptyHint ?? 'Try changing your filters, or check back soon as more questions are added.'} />
  }
  const visible = questions.slice(0, shown)
  return (
    <div>
      <ul className="grid gap-3 md:grid-cols-2">
        {visible.map((q) => {
          const p = progress.questions[q.id]
          return (
            <li key={q.id} className="min-w-0">
              <QuestionCard
                question={q} from={from} status={p?.s} bookmarked={!!p?.b} onBookmark={() => toggleBookmark(q.id)}
                topicName={syllabus && q.topicIds[0] ? topicById(syllabus, q.topicIds[0])?.name : undefined}
              />
            </li>
          )
        })}
      </ul>
      {shown < questions.length && (
        <div className="mt-5 text-center">
          <Button variant="secondary" onClick={() => setShown((n) => n + pageSize)}>
            Show more ({questions.length - shown} left)
          </Button>
        </div>
      )}
    </div>
  )
}
