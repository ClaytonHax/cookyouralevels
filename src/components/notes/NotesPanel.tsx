import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDown, NotebookPen, Pin, Plus, Trash2 } from 'lucide-react'
import { useNotes } from '../../hooks/useUserData'
import { useSyllabus } from '../../hooks/useContent'
import { topicById } from '../../lib/content'
import { createNote, deleteNote } from '../../lib/userStore'
import type { Note } from '../../lib/userStore'
import type { SubjectId } from '../../types/content'
import { Button, Skeleton } from '../ui'
import { useNoteDraft } from './useNoteDraft'
import NoteEditorPane from './NoteEditorPane'

export interface NotesPanelProps {
  subjectId?: SubjectId
  topicId?: string
  questionId?: string
  compact?: boolean
}

function snippet(body: string) {
  return body.replace(/[#*`>$_\-\[\]]/g, '').replace(/\s+/g, ' ').trim().slice(0, 120)
}

function InlineNote({ note, onClose }: { note: Note; onClose: () => void }) {
  const draft = useNoteDraft(note)
  return (
    <div className="rounded-control border border-border bg-surface-2/50 p-3 space-y-3 animate-fade-in">
      <NoteEditorPane draft={draft} layout="toggle" minHeight="min-h-[160px]" />
      <div className="flex items-center justify-between">
        <Link to={`/notes/${note.id}`} className="text-sm font-semibold text-flame-strong dark:text-flame hover:underline">Open full editor</Link>
        <Button size="sm" variant="secondary" onClick={() => { draft.saveNow(); onClose() }}>Done</Button>
      </div>
    </div>
  )
}

/** Notes attached to a topic / question / subject, with quick create and inline editing. */
export default function NotesPanel({ subjectId, topicId, questionId, compact }: NotesPanelProps) {
  const navigate = useNavigate()
  const { notes, loading } = useNotes({ subjectId, topicId, questionId })
  const { data: syllabus } = useSyllabus(topicId ? subjectId : undefined)
  const [openId, setOpenId] = useState<string | null>(null)

  const create = () => {
    const topicName = topicId ? topicById(syllabus ?? undefined, topicId)?.name : undefined
    const title = questionId ? `Question ${questionId.split('_q').pop()} notes` : topicName ?? ''
    const id = createNote({ subjectId, topicId, questionId, title, body: '' })
    if (compact) setOpenId(id)
    else navigate(`/notes/${id}`)
  }

  return (
    <section aria-label="My notes" className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display font-bold text-ink inline-flex items-center gap-2">
          <NotebookPen className="w-4 h-4 text-flame" aria-hidden /> My notes
          {notes.length > 0 && <span className="text-sm font-semibold text-ink-3">{notes.length}</span>}
        </h3>
        <Button size="sm" variant="secondary" leftIcon={<Plus className="w-4 h-4" />} onClick={create}>New note</Button>
      </div>

      {loading ? <Skeleton className="h-14 w-full" /> : notes.length === 0 ? (
        <p className="text-sm text-ink-2 rounded-control border border-dashed border-border px-4 py-5 text-center">
          No notes here yet. Jot down a formula, a tricky step or a reminder, and it will live right here.
        </p>
      ) : (
        <ul className="space-y-2">
          {notes.map((n) => (
            <li key={n.id}>
              {openId === n.id ? <InlineNote note={n} onClose={() => setOpenId(null)} /> : (
                <div className="card px-3.5 py-2.5 flex items-center gap-2">
                  <button type="button" className="flex-1 min-w-0 text-left cursor-pointer rounded-control focus-ring py-0.5"
                    onClick={() => (compact ? setOpenId(n.id) : navigate(`/notes/${n.id}`))}>
                    <span className="flex items-center gap-1.5 font-bold text-ink text-sm truncate">
                      {n.pinned && <Pin className="w-3.5 h-3.5 text-flame shrink-0" aria-label="Pinned" />}
                      <span className="truncate">{n.title || 'Untitled note'}</span>
                    </span>
                    {n.body && <span className="block text-xs text-ink-2 truncate">{snippet(n.body)}</span>}
                  </button>
                  {compact && <ChevronDown className="w-4 h-4 text-ink-3 shrink-0" aria-hidden />}
                  <button type="button" aria-label={`Delete ${n.title || 'untitled note'}`}
                    onClick={() => { if (window.confirm('Delete this note?')) void deleteNote(n.id) }}
                    className="w-8 h-8 grid place-items-center rounded-control text-ink-3 hover:text-conf-red hover:bg-surface-2 cursor-pointer shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
