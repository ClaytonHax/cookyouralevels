import { useEffect, useMemo, useState } from 'react'
import { GraduationCap, Pencil, Plus, Sparkles, Trash2 } from 'lucide-react'
import { useGradeSubjects, useGrades, useProfile } from '../hooks/useUserData'
import { addGrade, addGradeSubject, deleteGrade, deleteGradeSubject, updateGrade, updateGradeSubject } from '../lib/userStore'
import type { Grade, GradeSubject } from '../lib/userStore'
import { getSubject } from '../lib/subjects'
import { chronological, formatDate, gapLabel, gradeGap, gradeToPoints, progressToTarget, weightedAverage, weightedPoints } from '../lib/grades'
import { Button, Card, EmptyState, Modal, ProgressBar, SkeletonText } from '../components/ui'
import GradeCoin from '../components/grades/GradeCoin'
import Sparkline from '../components/grades/Sparkline'
import GradeForm from '../components/grades/GradeForm'
import SubjectForm from '../components/grades/SubjectForm'
import { cn } from '../lib/cn'

function SubjectPick({ subject, active, onClick }: { subject: GradeSubject; active: boolean; onClick: () => void }) {
  const { grades } = useGrades(subject.id)
  const avg = weightedAverage(grades)
  return (
    <button type="button" onClick={onClick} aria-pressed={active}
      className={cn('card text-left p-3.5 flex items-center gap-3 min-w-[220px] sm:min-w-0 cursor-pointer focus-ring transition-shadow',
        active ? 'ring-2 ring-flame' : 'hover:shadow-lift')}>
      <GradeCoin grade={avg} />
      <span className="min-w-0">
        <span className="block font-bold text-ink truncate">{subject.name}</span>
        <span className="block text-xs text-ink-3">{subject.code ? `${subject.code} · ` : ''}Target {subject.target}</span>
      </span>
    </button>
  )
}

function SubjectDetail({ subject, onEdit, onDelete }: { subject: GradeSubject; onEdit: () => void; onDelete: () => void }) {
  const { grades, loading } = useGrades(subject.id)
  const [editing, setEditing] = useState<Grade | 'new' | null>(null)
  const [delGrade, setDelGrade] = useState<Grade | null>(null)

  const pts = weightedPoints(grades)
  const avg = weightedAverage(grades)
  const gap = gradeGap(avg, subject.target)
  const pct = Math.round(progressToTarget(pts, subject.target) * 100)
  const reached = gap !== null && gap <= 0
  const sorted = useMemo(() => [...chronological(grades)].reverse(), [grades])
  const best = grades.length ? [...grades].sort((a, b) => gradeToPoints(b.grade) - gradeToPoints(a.grade))[0].grade : null

  return (
    <div className="space-y-5">
      <Card padding="lg">
        <div className="flex flex-wrap items-start gap-5">
          <div className="flex flex-col items-center gap-1">
            <GradeCoin grade={avg} size="lg" />
            <span className="text-xs font-bold text-ink-3">{pts !== null ? `${pts.toFixed(1)} / 6` : 'Predicted'}</span>
          </div>
          <div className="flex-1 min-w-[200px] space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h2 className="font-display text-2xl font-extrabold text-ink truncate">{subject.name}</h2>
                <p className="text-sm text-ink-2">{subject.code ? `${subject.code} · ` : ''}{grades.length} grade{grades.length === 1 ? '' : 's'} logged{best ? ` · best ${best}` : ''}</p>
              </div>
              <div className="flex shrink-0">
                <button type="button" onClick={onEdit} aria-label={`Edit ${subject.name}`} className="w-9 h-9 grid place-items-center rounded-control text-ink-2 hover:bg-surface-2 cursor-pointer"><Pencil className="w-4 h-4" /></button>
                <button type="button" onClick={onDelete} aria-label={`Delete ${subject.name}`} className="w-9 h-9 grid place-items-center rounded-control text-ink-2 hover:bg-surface-2 hover:text-conf-red cursor-pointer"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-bold text-ink">Progress to {subject.target}</span>
                <span className={cn('font-semibold', reached ? 'text-conf-green' : 'text-ink-2')}>{reached ? (gap === 0 ? 'On target' : gapLabel(gap)) : gapLabel(gap)}</span>
              </div>
              <ProgressBar value={pct} colorClass={reached ? 'bg-conf-green' : 'bg-flame'} height="md" label={`Progress to target ${subject.target}`} />
            </div>
            <Sparkline grades={grades} target={subject.target} />
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display text-xl font-extrabold text-ink">Assessments</h3>
        <Button size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setEditing('new')}>Add grade</Button>
      </div>

      {loading ? <SkeletonText lines={3} /> : sorted.length === 0 ? (
        <EmptyState icon={<GraduationCap className="w-6 h-6" />} title="No grades yet"
          description={`Log your first test, mock or coursework result and we'll predict where you're heading for ${subject.name}.`}
          action={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setEditing('new')}>Add a grade</Button>} />
      ) : (
        <Card padding="none" className="overflow-hidden">
          <ul>
            {sorted.map((g) => (
              <li key={g.id} className="flex items-center gap-3 px-4 py-3 border-t border-border first:border-t-0">
                <GradeCoin grade={g.grade} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-ink text-sm truncate">{g.title}</p>
                  <p className="text-xs text-ink-3 truncate">{g.type} · weight {g.weight}{g.date ? ` · ${formatDate(g.date)}` : ''}</p>
                </div>
                <button type="button" onClick={() => setEditing(g)} aria-label={`Edit ${g.title}`} className="w-9 h-9 grid place-items-center rounded-control text-ink-2 hover:bg-surface-2 cursor-pointer"><Pencil className="w-4 h-4" /></button>
                <button type="button" onClick={() => setDelGrade(g)} aria-label={`Delete ${g.title}`} className="w-9 h-9 grid place-items-center rounded-control text-ink-2 hover:bg-surface-2 hover:text-conf-red cursor-pointer"><Trash2 className="w-4 h-4" /></button>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <GradeForm open={editing !== null} grade={editing && editing !== 'new' ? editing : null} onClose={() => setEditing(null)}
        onSave={(data) => {
          if (editing && editing !== 'new') void updateGrade(subject.id, editing.id, data)
          else addGrade(subject.id, data)
          setEditing(null)
        }} />
      <Modal open={!!delGrade} onClose={() => setDelGrade(null)} title="Delete this grade?" size="sm"
        footer={<><Button variant="secondary" onClick={() => setDelGrade(null)}>Keep it</Button>
          <Button variant="danger" data-autofocus onClick={() => { if (delGrade) void deleteGrade(subject.id, delGrade.id); setDelGrade(null) }}>Delete</Button></>}>
        <p className="text-sm text-ink-2">"{delGrade?.title}" will be removed from your average.</p>
      </Modal>
    </div>
  )
}

export default function Grades() {
  const { subjects, loading } = useGradeSubjects()
  const { profile } = useProfile()
  const [selected, setSelected] = useState<string | null>(null)
  const [form, setForm] = useState<GradeSubject | 'new' | null>(null)
  const [del, setDel] = useState<GradeSubject | null>(null)

  useEffect(() => {
    if (!subjects.length) { if (selected) setSelected(null); return }
    if (!selected || !subjects.some((s) => s.id === selected)) setSelected(subjects[0].id)
  }, [subjects, selected])

  const current = subjects.find((s) => s.id === selected)
  const missing = (profile?.subjects ?? []).map((id) => getSubject(id)).filter((s): s is NonNullable<typeof s> => !!s && !subjects.some((g) => g.code === s.code))

  const prefill = () => {
    let first: string | null = null
    for (const s of missing) { const id = addGradeSubject({ name: s.name, code: s.code, target: 'A' }); first ??= id }
    if (first) setSelected(first)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-ink">Grades</h1>
          <p className="text-ink-2 mt-1">Log results, watch your predicted grade, and see how far you are from your target.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {subjects.length > 0 && missing.length > 0 && <Button variant="secondary" leftIcon={<Sparkles className="w-4 h-4" />} onClick={prefill}>Add my subjects</Button>}
          <Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setForm('new')}>Add subject</Button>
        </div>
      </div>

      {loading ? <SkeletonText lines={5} /> : subjects.length === 0 ? (
        <EmptyState icon={<GraduationCap className="w-6 h-6" />} title="Track your grades"
          description={missing.length ? 'Start with your A Level subjects, then log every test, mock and piece of coursework to see your predicted grade.' : 'Add a subject, set a target grade, then log your results as they come in.'}
          action={<div className="flex gap-2 flex-wrap justify-center">
            {missing.length > 0 && <Button leftIcon={<Sparkles className="w-4 h-4" />} onClick={prefill}>Add my {missing.length} subject{missing.length === 1 ? '' : 's'}</Button>}
            <Button variant={missing.length ? 'secondary' : 'primary'} leftIcon={<Plus className="w-4 h-4" />} onClick={() => setForm('new')}>Add a subject</Button>
          </div>} />
      ) : (
        <>
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible" role="group" aria-label="Subjects">
            {subjects.map((s) => <SubjectPick key={s.id} subject={s} active={s.id === selected} onClick={() => setSelected(s.id)} />)}
          </div>
          {current && <SubjectDetail key={current.id} subject={current} onEdit={() => setForm(current)} onDelete={() => setDel(current)} />}
        </>
      )}

      <SubjectForm open={form !== null} subject={form && form !== 'new' ? form : null} onClose={() => setForm(null)}
        onSave={(data) => {
          if (form && form !== 'new') void updateGradeSubject(form.id, data)
          else setSelected(addGradeSubject(data))
          setForm(null)
        }} />
      <Modal open={!!del} onClose={() => setDel(null)} title={`Delete ${del?.name ?? 'subject'}?`} description="All of its grades will be deleted too. This can't be undone." size="sm"
        footer={<><Button variant="secondary" onClick={() => setDel(null)}>Keep it</Button>
          <Button variant="danger" data-autofocus onClick={() => { if (del) void deleteGradeSubject(del.id); setDel(null) }}>Delete subject</Button></>}>
        <p className="text-sm text-ink-2">Your other subjects stay untouched.</p>
      </Modal>
    </div>
  )
}
