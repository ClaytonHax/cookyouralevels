import { Link } from 'react-router-dom'
import { useSyllabus } from '../../hooks/useContent'
import { getSubject } from '../../lib/subjects'
import { topicById } from '../../lib/content'
import { cn } from '../../lib/cn'
import type { Note } from '../../lib/userStore'

/** Chip showing what a note is attached to (subject colour + topic/question), links to it. */
export default function AttachmentChip({ note, className }: { note: Pick<Note, 'subjectId' | 'topicId' | 'questionId'>; className?: string }) {
  const subject = getSubject(note.subjectId)
  const { data: syllabus } = useSyllabus(note.topicId ? note.subjectId : undefined)
  if (!subject) return null
  let label = subject.short
  let to = `/s/${subject.id}`
  if (note.questionId) { label = `${subject.short} · Question`; to = `/s/${subject.id}/q/${note.questionId}` }
  else if (note.topicId) {
    const t = topicById(syllabus ?? undefined, note.topicId)
    label = `${subject.short} · ${t ? t.name : 'Topic'}`
    to = `/s/${subject.id}/topic/${note.topicId}`
  }
  return (
    <Link to={to} onClick={(e) => e.stopPropagation()}
      className={cn('inline-flex items-center gap-1.5 max-w-full rounded-full px-2.5 py-0.5 text-xs font-bold hover:brightness-95', subject.cls.soft, subject.cls.text, className)}>
      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', subject.cls.dot)} aria-hidden />
      <span className="truncate">{label}</span>
    </Link>
  )
}
