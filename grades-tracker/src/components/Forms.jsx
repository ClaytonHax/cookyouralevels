import { useState } from 'react'
import { GRADE_TYPES } from '../grades'
import GradePicker from './GradePicker'
import Icon, { TYPE_ICONS } from './Icon'

const today = () => new Date().toISOString().slice(0, 10)

export function SubjectForm({ initial, onSubmit, onCancel, submitLabel = 'Save subject' }) {
  const [name, setName] = useState(initial?.name || '')
  const [syllabus, setSyllabus] = useState(initial?.syllabus || '')
  const [target, setTarget] = useState(initial?.target || 'A')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!name.trim()) {
      setError('Give the subject a name.')
      return
    }
    setBusy(true)
    try {
      await onSubmit({ name: name.trim(), syllabus: syllabus.trim(), target })
    } catch {
      setError('Could not save. Check your connection and try again.')
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="sub-name" className="label-soft">Subject name</label>
          <input
            id="sub-name"
            className="input-soft"
            value={name}
            onChange={(e) => { setName(e.target.value); setError('') }}
            placeholder="e.g. Mathematics"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'sub-error' : undefined}
            autoFocus
            required
          />
        </div>
        <div>
          <label htmlFor="sub-syllabus" className="label-soft">Syllabus code</label>
          <input id="sub-syllabus" className="input-soft" value={syllabus} onChange={(e) => setSyllabus(e.target.value)} placeholder="9709" inputMode="numeric" />
        </div>
      </div>
      <GradePicker name="sub-target" legend="Target grade" value={target} onChange={setTarget} />
      {error && <p id="sub-error" role="alert" className="text-sm font-semibold text-red-700">{error}</p>}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-1">
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={busy}>
          <Icon name="check" size={18} strokeWidth={2.5} />
          {busy ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export function GradeForm({ initial, onSubmit, onCancel, submitLabel = 'Save grade' }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    type: initial?.type || 'Test',
    grade: initial?.grade || 'A',
    weight: initial?.weight ?? 1,
    date: initial?.date || today(),
  })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }))

  async function submit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Give this grade a title, like "Paper 1 mock".')
      return
    }
    setBusy(true)
    try {
      await onSubmit({ ...form, title: form.title.trim(), weight: Number(form.weight) || 0 })
    } catch {
      setError('Could not save. Check your connection and try again.')
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="g-title" className="label-soft">Title</label>
        <input
          id="g-title"
          className="input-soft"
          value={form.title}
          onChange={(e) => { set('title')(e.target.value); setError('') }}
          placeholder="e.g. Paper 1 mock"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'g-error' : undefined}
          autoFocus
          required
        />
      </div>

      <fieldset>
        <legend className="label-soft">Type</legend>
        <div className="grid grid-cols-2 gap-2">
          {GRADE_TYPES.map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="g-type" value={t} checked={form.type === t} onChange={() => set('type')(t)} className="peer sr-only" />
              <span className="flex items-center justify-center gap-1.5 rounded-xl min-h-[44px] px-2 text-sm font-semibold shadow-softsm bg-white transition-all duration-200 peer-checked:bg-secondary peer-checked:text-primary-strong peer-checked:shadow-inset peer-focus-visible:ring-2 peer-focus-visible:ring-primary-strong">
                <Icon name={TYPE_ICONS[t]} size={16} />
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <GradePicker name="g-grade" legend="Grade" value={form.grade} onChange={set('grade')} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="g-weight" className="label-soft">Weight</label>
          <input id="g-weight" type="number" min="0" step="0.5" inputMode="decimal" className="input-soft" value={form.weight} onChange={(e) => set('weight')(e.target.value)} aria-describedby="g-weight-hint" />
        </div>
        <div>
          <label htmlFor="g-date" className="label-soft">Date</label>
          <input id="g-date" type="date" className="input-soft" value={form.date} onChange={(e) => set('date')(e.target.value)} />
        </div>
        <p id="g-weight-hint" className="col-span-2 -mt-2 text-xs text-ink/70">
          Mocks count more? Give them weight 2. Keep everything at 1 for a simple average.
        </p>
      </div>

      {error && <p id="g-error" role="alert" className="text-sm font-semibold text-red-700">{error}</p>}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-1">
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={busy}>
          <Icon name="check" size={18} strokeWidth={2.5} />
          {busy ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  )
}
