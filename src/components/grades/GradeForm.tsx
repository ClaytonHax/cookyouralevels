import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Grade, GradeInput } from '../../lib/userStore'
import { GRADES, GRADE_TYPES, percentToGrade } from '../../lib/grades'
import { Button, Input, Modal, Select } from '../ui'
import { cn } from '../../lib/cn'

const today = () => new Date().toISOString().slice(0, 10)

export default function GradeForm({ open, grade, onClose, onSave }: {
  open: boolean; grade: Grade | null; onClose: () => void; onSave: (g: GradeInput) => void
}) {
  // Remount body when the target changes so state initialises fresh.
  return (
    <Modal open={open} onClose={onClose} title={grade ? 'Edit grade' : 'Add a grade'} description="Log a test, mock or coursework result.">
      {open && <Body key={grade?.id ?? 'new'} grade={grade} onClose={onClose} onSave={onSave} />}
    </Modal>
  )
}

function Body({ grade, onClose, onSave }: { grade: Grade | null; onClose: () => void; onSave: (g: GradeInput) => void }) {
  const [title, setTitle] = useState(grade?.title ?? '')
  const [type, setType] = useState(grade?.type ?? GRADE_TYPES[0])
  const [mode, setMode] = useState<'grade' | 'pct'>('grade')
  const [letter, setLetter] = useState(grade?.grade ?? 'A')
  const [pct, setPct] = useState('')
  const [weight, setWeight] = useState(String(grade?.weight ?? 10))
  const [date, setDate] = useState(grade?.date || today())
  const [err, setErr] = useState('')

  const pctNum = parseFloat(pct)
  const final = mode === 'pct' ? (Number.isFinite(pctNum) ? percentToGrade(pctNum) : null) : letter

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return setErr('Give this assessment a name.')
    if (!final) return setErr('Enter a percentage between 0 and 100.')
    if (mode === 'pct' && (pctNum < 0 || pctNum > 100)) return setErr('Enter a percentage between 0 and 100.')
    const w = parseFloat(weight)
    onSave({ title: title.trim(), type, grade: final, weight: Number.isFinite(w) && w >= 0 ? w : 0, date })
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input label="Name" value={title} onChange={(e) => { setTitle(e.target.value); setErr('') }} placeholder="e.g. Pure 1 mock" data-autofocus maxLength={80} />
      <div className="grid grid-cols-2 gap-3">
        <Select label="Type" value={type} onChange={(e) => setType(e.target.value)}>
          {GRADE_TYPES.map((t) => <option key={t}>{t}</option>)}
          {!GRADE_TYPES.includes(type as never) && <option>{type}</option>}
        </Select>
        <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-bold text-ink" id="result-label">Result</span>
          <div role="group" aria-label="Result format" className="inline-flex rounded-control border border-border p-0.5 bg-surface-2">
            {(['grade', 'pct'] as const).map((m) => (
              <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)}
                className={cn('px-3 h-7 rounded-[8px] text-xs font-bold cursor-pointer focus-ring', mode === m ? 'bg-surface text-ink shadow-soft' : 'text-ink-2')}>
                {m === 'grade' ? 'Grade' : 'Percent'}
              </button>
            ))}
          </div>
        </div>
        {mode === 'grade' ? (
          <Select aria-labelledby="result-label" value={letter} onChange={(e) => setLetter(e.target.value)}>
            {GRADES.map((g) => <option key={g}>{g}</option>)}
          </Select>
        ) : (
          <Input aria-labelledby="result-label" type="number" inputMode="decimal" min={0} max={100} value={pct} onChange={(e) => { setPct(e.target.value); setErr('') }}
            placeholder="e.g. 78" hint={final ? `Counts as grade ${final}` : 'A* 90+, A 80+, B 70+, C 60+, D 50+, E 40+'} />
        )}
      </div>
      <Input label="Weight" type="number" inputMode="decimal" min={0} value={weight} onChange={(e) => setWeight(e.target.value)} hint="How much it counts, e.g. 10 for a 10% assessment. Bigger numbers pull the average more." />
      {err && <p role="alert" className="text-sm text-conf-red">{err}</p>}
      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit">{grade ? 'Save changes' : 'Add grade'}</Button>
      </div>
    </form>
  )
}
