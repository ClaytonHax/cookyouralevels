import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NotebookPen, Pin, Plus, Search } from 'lucide-react'
import { useNotes } from '../hooks/useUserData'
import { createNote } from '../lib/userStore'
import type { Note } from '../lib/userStore'
import { SUBJECTS } from '../lib/subjects'
import { Button, Card, EmptyState, Input, Select, SkeletonText } from '../components/ui'
import AttachmentChip from '../components/notes/AttachmentChip'

export function snippet(body: string, n = 140) {
  return body.replace(/\$\$?[^$]*\$\$?/g, ' [maths] ').replace(/[#*`>_\[\]]/g, '').replace(/\s+/g, ' ').trim().slice(0, n)
}

export function timeAgo(ms: number) {
  const d = Date.now() - ms
  const m = Math.floor(d / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m} min ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h} h ago`
  const days = Math.floor(h / 24)
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`
  return new Date(ms).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

function NoteCard({ note }: { note: Note }) {
  return (
    <Card interactive padding="none" className="relative">
      <div className="p-4 space-y-2 h-full flex flex-col">
        <h3 className="font-display font-bold text-ink flex items-start gap-1.5">
          {note.pinned && <Pin className="w-4 h-4 text-flame mt-1 shrink-0" aria-label="Pinned" />}
          <Link to={`/notes/${note.id}`} className="focus-ring rounded after:absolute after:inset-0 after:content-[''] line-clamp-2 break-words">
            {note.title || 'Untitled note'}
          </Link>
        </h3>
        <p className="text-sm text-ink-2 line-clamp-3 break-words flex-1">{snippet(note.body) || <span className="text-ink-3">Empty note</span>}</p>
        <div className="flex items-center justify-between gap-2 pt-1 relative z-10">
          <div className="min-w-0"><AttachmentChip note={note} /></div>
          <time className="text-xs text-ink-3 shrink-0" dateTime={new Date(note.updatedAt).toISOString()}>{timeAgo(note.updatedAt)}</time>
        </div>
      </div>
    </Card>
  )
}

export default function Notes() {
  const { notes, loading } = useNotes()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [subject, setSubject] = useState('')

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return notes.filter((n) => (!subject || n.subjectId === subject) && (!t || n.title.toLowerCase().includes(t) || n.body.toLowerCase().includes(t)))
  }, [notes, q, subject])
  const pinned = filtered.filter((n) => n.pinned)
  const rest = filtered.filter((n) => !n.pinned)

  const create = () => navigate(`/notes/${createNote({ title: '', body: '', subjectId: subject ? (subject as Note['subjectId']) : undefined })}`)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-ink">Notes</h1>
          <p className="text-ink-2 mt-1">Your own words, formulas and reminders, all in one place.</p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />} onClick={create}>New note</Button>
      </div>

      {notes.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
          <div className="relative">
            <Search className="w-4 h-4 text-ink-3 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden />
            <Input aria-label="Search notes" placeholder="Search notes" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          <Select aria-label="Filter by subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">All subjects</option>
            {SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </Select>
        </div>
      )}

      {loading ? <SkeletonText lines={5} /> : notes.length === 0 ? (
        <EmptyState icon={<NotebookPen className="w-6 h-6" />} title="No notes yet"
          description="Start a note here, or open any topic or question and add one there. Notes attached to a topic or question show up right where you need them."
          action={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={create}>Write your first note</Button>} />
      ) : filtered.length === 0 ? (
        <EmptyState icon={<Search className="w-6 h-6" />} title="No notes match"
          description="Try a different search or clear the subject filter."
          action={<Button variant="secondary" onClick={() => { setQ(''); setSubject('') }}>Clear filters</Button>} />
      ) : (
        <>
          {pinned.length > 0 && (
            <section aria-labelledby="pinned-h" className="space-y-3">
              <h2 id="pinned-h" className="text-sm font-bold uppercase tracking-wide text-ink-3">Pinned</h2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{pinned.map((n) => <li key={n.id}><NoteCard note={n} /></li>)}</ul>
            </section>
          )}
          {rest.length > 0 && (
            <section aria-labelledby="all-h" className="space-y-3">
              {pinned.length > 0 && <h2 id="all-h" className="text-sm font-bold uppercase tracking-wide text-ink-3">All notes</h2>}
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{rest.map((n) => <li key={n.id}><NoteCard note={n} /></li>)}</ul>
            </section>
          )}
        </>
      )}
    </div>
  )
}
