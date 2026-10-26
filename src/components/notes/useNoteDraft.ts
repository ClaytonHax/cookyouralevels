import { useCallback, useEffect, useRef, useState } from 'react'
import { updateNote } from '../../lib/userStore'
import type { Note } from '../../lib/userStore'

export type SaveStatus = 'idle' | 'dirty' | 'saved'

/** Local draft of a note with debounced autosave (~600ms) and flush on unmount. */
export function useNoteDraft(note: Pick<Note, 'id' | 'title' | 'body'>) {
  const [title, setTitleState] = useState(note.title)
  const [body, setBodyState] = useState(note.body)
  const [status, setStatus] = useState<SaveStatus>('idle')
  const latest = useRef({ title: note.title, body: note.body })
  const dirty = useRef(false)
  const timer = useRef<number>()
  const id = note.id

  const flush = useCallback(() => {
    window.clearTimeout(timer.current)
    if (!dirty.current) return
    dirty.current = false
    void updateNote(id, { title: latest.current.title, body: latest.current.body })
    setStatus('saved')
  }, [id])

  const schedule = useCallback(() => {
    dirty.current = true
    setStatus('dirty')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(flush, 600)
  }, [flush])

  const setTitle = useCallback((v: string) => { latest.current.title = v; setTitleState(v); schedule() }, [schedule])
  const setBody = useCallback((v: string) => { latest.current.body = v; setBodyState(v); schedule() }, [schedule])

  // flush pending edits when leaving / switching note
  useEffect(() => () => flush(), [flush])
  useEffect(() => {
    const onHide = () => flush()
    window.addEventListener('beforeunload', onHide)
    return () => window.removeEventListener('beforeunload', onHide)
  }, [flush])

  const discard = useCallback(() => { dirty.current = false; window.clearTimeout(timer.current) }, [])

  return { title, body, setTitle, setBody, status, saveNow: flush, discard }
}
