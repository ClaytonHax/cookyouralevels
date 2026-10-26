import { useState } from 'react'
import type { FormEvent } from 'react'
import type { GradeSubject, GradeSubjectInput } from '../../lib/userStore'
import { GRADES } from '../../lib/grades'
import { Button, Input, Modal, Select } from '../ui'

export default function SubjectForm({ open, subject, onClose, onSave }: {
  open: boolean; subject: GradeSubject | null; onClose: () => void; onSave: (s: GradeSubjectInput) => void
}) {
  return (
    <Modal open={open} onClose={onClose} title={subject ? 'Edit subject' : 'Add a subject'}>
      {open && <Body key={subject?.id ?? 'new'} subject={subject} onClose={onClose} onSave={onSave} />}
    </Modal>
  )
}

function Body({ subject, onClose, onSave }: { subject: GradeSubject | null; onClose: () => void; onSave: (s: GradeSubjectInput) => void }) {
  const [name, setName] = useState(subject?.name ?? '')
  const [code, setCode] = useState(subject?.code ?? '')
  const [target, setTarget] = useState(subject?.target ?? 'A')
  const [err, setErr] = useState('')
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return setErr('Give the subject a name.')
    onSave({ name: name.trim(), code: code.trim() || undefined, target, ...(subject?.syllabus ? { syllabus: subject.syllabus } : {}) } as GradeSubjectInput)
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      <Input label="Subject name" value={name} onChange={(e) => { setName(e.target.value); setErr('') }} placeholder="e.g. Further Mathematics" data-autofocus maxLength={60} error={err} />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Code (optional)" value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. 9231" maxLength={10} />
        <Select label="Target grade" value={target} onChange={(e) => setTarget(e.target.value)}>
          {GRADES.filter((g) => g !== 'U').map((g) => <option key={g}>{g}</option>)}
        </Select>
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit">{subject ? 'Save changes' : 'Add subject'}</Button>
      </div>
    </form>
  )
}
