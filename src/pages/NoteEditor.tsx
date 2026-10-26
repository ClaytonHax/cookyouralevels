import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Pin, PinOff, Trash2 } from 'lucide-react'
import { useNoteById } from '../hooks/useUserData'
import { useSyllabus } from '../hooks/useContent'
import { allTopics } from '../lib/content'
import { deleteNote, updateNote } from '../lib/userStore'
import type { Note } from '../lib/userStore'
import { SUBJECTS } from '../lib/subjects'
import type { SubjectId } from '../types/content'
import { Button, EmptyState, Modal, Select, SkeletonText, buttonClasses } from '../components/ui'
import { useNoteDraft } from '../components/notes/useNoteDraft'
import NoteEditorPane from '../components/notes/NoteEditorPane'
import AttachmentChip from '../components/notes/AttachmentChip'

function Editor({ note }: { note: Note }) {
  const navigate = useNavigate()
  const draft = useNoteDraft(note)
  const [confirm, setConfirm] = useState(false)
  const { data: syllabus } = useSyllabus(note.subjectId)
  const topics = syllabus ? allTopics(syllabus) : []

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') { e.preventDefault(); draft.saveNow() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [draft])

  const remove = () => { draft.discard(); void deleteNote(note.id); setConfirm(false); navigate('/notes', { replace: true }) }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-2">
        <Link to="/notes" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-2 hover:text-ink rounded-control focus-ring min-h-[40px]">
          <ArrowLeft className="w-4 h-4" aria-hidden /> All notes
        </Link>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" aria-pressed={note.pinned} leftIcon={note.pinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
            onClick={() => void updateNote(note.id, { pinned: !note.pinned })}>{note.pinned ? 'Unpin' : 'Pin'}</Button>
          <Button variant="ghost" size="sm" leftIcon={<Trash2 className="w-4 h-4" />} onClick={() => setConfirm(true)} className="hover:!text-conf-red">Delete</Button>
        </div>
      </div>

      <NoteEditorPane draft={draft} layout="split" minHeight="min-h-[55vh]" />

      <fieldset className="rounded-card border border-border bg-surface p-4">
        <legend className="px-1 text-sm font-bold text-ink">Attached to</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <Select label="Subject" value={note.subjectId ?? ''}
            onChange={(e) => void updateNote(note.id, { subjectId: (e.target.value || undefined) as SubjectId | undefined, topicId: undefined, questionId: undefined })}>
            <option value="">None (general note)</option>
            {SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </Select>
          <Select label="Topic" disabled={!note.subjectId} value={note.topicId ?? ''}
            onChange={(e) => void updateNote(note.id, { topicId: e.target.value || undefined })}>
            <option value="">{note.subjectId ? 'No topic' : 'Choose a subject first'}</option>
            {topics.map((t) => <option key={t.id} value={t.id}>{t.number} {t.name}</option>)}
          </Select>
        </div>
        {note.subjectId && <div className="mt-3"><AttachmentChip note={note} /></div>}
      </fieldset>

      <Modal open={confirm} onClose={() => setConfirm(false)} title="Delete this note?" description="This can't be undone." size="sm"
        footer={<><Button variant="secondary" onClick={() => setConfirm(false)}>Keep it</Button><Button variant="danger" data-autofocus onClick={remove}>Delete note</Button></>}>
        <p className="text-sm text-ink-2">"{draft.title || 'Untitled note'}" will be removed.</p>
      </Modal>
    </div>
  )
}

export default function NoteEditor() {
  const { noteId } = useParams()
  const { note, loading } = useNoteById(noteId)
  if (loading) return <SkeletonText lines={6} />
  if (!note) return (
    <EmptyState title="Note not found" description="It may have been deleted. Head back to your notes to pick another or start a new one."
      action={<Link to="/notes" className={buttonClasses('secondary')}>Back to notes</Link>} />
  )
  return <Editor key={note.id} note={note} />
}
