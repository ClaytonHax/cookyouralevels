import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import {
  subscribeSubject,
  subscribeGrades,
  addGrade,
  updateGrade,
  deleteGrade,
  updateSubject,
  deleteSubject,
} from '../firestore'
import {
  GRADES,
  GRADE_COLORS,
  weightedAverage,
  progressToTarget,
  gradeGap,
  gapLabel,
  gradeToPoints,
  chronological,
  formatDate,
} from '../grades'
import GradeBadge from '../components/GradeBadge'
import ProgressBar from '../components/ProgressBar'
import TrendChart from '../components/TrendChart'
import Icon, { TYPE_ICONS } from '../components/Icon'
import Modal, { ConfirmModal } from '../components/Modal'
import { GradeForm, SubjectForm } from '../components/Forms'
import { PageSkeleton } from '../components/Skeleton'
import { useToast } from '../components/Toast'

function trendOf(grades) {
  const list = chronological(grades)
  if (list.length < 2) return null
  return gradeToPoints(list.at(-1).grade) - gradeToPoints(list.at(-2).grade)
}

export default function Subject() {
  const { id } = useParams()
  const { user } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [subject, setSubject] = useState(null)
  const [grades, setGrades] = useState([])
  const [status, setStatus] = useState('loading')
  const [gradeModal, setGradeModal] = useState(null) // null | 'new' | grade
  const [editSubject, setEditSubject] = useState(false)
  const [confirm, setConfirm] = useState(null) // null | { kind: 'grade', grade } | { kind: 'subject' }
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    return subscribeSubject(
      user.uid,
      id,
      (s) => {
        setSubject(s)
        setStatus('ready')
      },
      () => setStatus('error')
    )
  }, [user.uid, id])

  useEffect(() => {
    return subscribeGrades(user.uid, id, setGrades, () => toast("Couldn't load grades. Check your connection.", 'error'))
  }, [user.uid, id, toast])

  async function onSaveGrade(data) {
    if (gradeModal === 'new') {
      await addGrade(user.uid, id, data)
      toast(`${data.grade} logged for ${data.title}`)
    } else {
      await updateGrade(user.uid, id, gradeModal.id, data)
      toast('Grade updated')
    }
    setGradeModal(null)
  }

  async function onSaveSubject(data) {
    await updateSubject(user.uid, id, data)
    setEditSubject(false)
    toast('Subject updated')
  }

  async function onConfirmDelete() {
    setBusy(true)
    try {
      if (confirm.kind === 'grade') {
        await deleteGrade(user.uid, id, confirm.grade.id)
        toast('Grade deleted')
        setConfirm(null)
      } else {
        await deleteSubject(user.uid, id)
        toast(`${subject.name} deleted`)
        navigate('/')
      }
    } catch {
      toast('Could not delete. Try again.', 'error')
    } finally {
      setBusy(false)
    }
  }

  if (status === 'loading') return <PageSkeleton label="Loading subject…" />
  if (status === 'error') {
    return (
      <div role="alert" className="card-soft text-center py-12">
        <p className="font-display text-xl mb-4">Couldn’t load this subject</p>
        <button className="btn-ghost" onClick={() => window.location.reload()}>Refresh</button>
      </div>
    )
  }
  if (!subject) {
    return (
      <div className="card-soft text-center py-12">
        <p className="font-display text-xl mb-4">Subject not found</p>
        <Link to="/" className="btn-ghost">Back to dashboard</Link>
      </div>
    )
  }

  const current = weightedAverage(grades)
  const gap = gradeGap(current, subject.target)
  const reached = gap !== null && gap <= 0
  const trend = trendOf(grades)
  const bestGrade = grades.length ? [...grades].sort((a, b) => gradeToPoints(b.grade) - gradeToPoints(a.grade))[0].grade : null
  const counts = GRADES.map((g) => ({ g, n: grades.filter((x) => x.grade === g).length }))
  const maxCount = Math.max(1, ...counts.map((c) => c.n))

  return (
    <div>
      <nav aria-label="Breadcrumb" className="mb-4">
        <Link to="/" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-strong rounded-lg cursor-pointer hover:underline min-h-[44px]">
          <Icon name="chevron-left" size={16} />
          Dashboard
        </Link>
      </nav>

      {/* Summary */}
      <section className="card-soft mb-6 animate-fade-up" aria-labelledby="subject-title">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <h1 id="subject-title" className="font-display text-3xl sm:text-4xl">{subject.name}</h1>
            <p className="text-ink/70 mt-1">
              {subject.syllabus ? `Syllabus ${subject.syllabus} · ` : ''}
              {grades.length} grade{grades.length === 1 ? '' : 's'} logged
            </p>
          </div>
          <div className="flex gap-1">
            <button className="icon-btn" onClick={() => setEditSubject(true)} aria-label="Edit subject" title="Edit subject">
              <Icon name="pencil" size={18} />
            </button>
            <button className="icon-btn hover:!text-red-700 hover:!bg-red-50" onClick={() => setConfirm({ kind: 'subject' })} aria-label="Delete subject" title="Delete subject">
              <Icon name="trash" size={18} />
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4 sm:gap-6">
          <div className="text-center">
            <GradeBadge grade={current} size="xl" className="animate-pop" label={current ? `Current grade ${current}` : 'No grade yet'} />
            <p className="text-xs font-bold uppercase tracking-wide text-ink/70 mt-2">Current</p>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`chip ${reached ? 'bg-green-100 text-green-800' : 'bg-secondary/70 text-primary-strong'}`}>
                {reached ? <Icon name="trophy" size={14} /> : <Icon name="target" size={14} />}
                {gapLabel(gap)}
              </span>
              {trend !== null && (
                <span className={`chip ${trend > 0 ? 'bg-green-100 text-green-800' : trend < 0 ? 'bg-amber-100 text-amber-800' : 'bg-surface text-ink/70'}`}>
                  <Icon name={trend >= 0 ? 'trending-up' : 'trending-down'} size={14} />
                  {trend > 0 ? 'Improving' : trend < 0 ? 'Dipped last time' : 'Steady'}
                </span>
              )}
            </div>
            <ProgressBar value={progressToTarget(current, subject.target)} reached={reached} label={`Progress to target ${subject.target}`} />
            {reached && (
              <p className="text-sm font-semibold text-green-800 mt-2 inline-flex items-center gap-1.5">
                <Icon name="sparkles" size={16} /> Target reached — amazing work!
              </p>
            )}
          </div>
          <div className="text-center">
            <button
              className="rounded-full cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => setEditSubject(true)}
              aria-label={`Target ${subject.target}. Change target`}
              title="Change target"
            >
              <GradeBadge grade={subject.target} size="lg" className="ring-4 ring-secondary" label="" />
            </button>
            <p className="text-xs font-bold uppercase tracking-wide text-ink/70 mt-2">Target</p>
          </div>
        </div>
      </section>

      {grades.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <section className="card-soft lg:col-span-2 animate-fade-up" aria-labelledby="trend-h">
            <h2 id="trend-h" className="font-display text-xl mb-3">Trend</h2>
            {grades.length > 1 ? (
              <TrendChart grades={grades} target={subject.target} />
            ) : (
              <p className="text-sm text-ink/70 py-10 text-center">Log one more grade to draw your trend line.</p>
            )}
          </section>
          <section className="card-soft animate-fade-up" style={{ animationDelay: '60ms' }} aria-labelledby="dist-h">
            <h2 id="dist-h" className="font-display text-xl mb-1">Grade mix</h2>
            <p className="text-sm text-ink/70 mb-4">Best so far: <strong>{bestGrade}</strong></p>
            <ul className="space-y-2">
              {counts.map(({ g, n }) => (
                <li key={g} className="flex items-center gap-3 text-sm">
                  <span className="w-6 font-display text-right">{g}</span>
                  <span className="flex-1 h-3 rounded-full bg-surface shadow-inset overflow-hidden">
                    <span
                      className="block h-full rounded-full transition-[width] duration-700"
                      style={{ width: `${(n / maxCount) * 100}%`, backgroundColor: GRADE_COLORS[g] }}
                    />
                  </span>
                  <span className="w-5 text-right font-semibold text-ink/70">{n}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl">Grades</h2>
        <button className="btn-primary" onClick={() => setGradeModal('new')}>
          <Icon name="plus" size={18} strokeWidth={2.5} />
          Add grade
        </button>
      </div>

      {grades.length === 0 ? (
        <div className="card-soft text-center py-12">
          <span className="inline-grid place-items-center w-16 h-16 rounded-2xl bg-secondary/70 text-primary-strong mb-4">
            <Icon name="file" size={30} />
          </span>
          <h3 className="font-display text-xl mb-1">No grades yet</h3>
          <p className="text-ink/70 text-sm mb-5">Log a test, assignment or exam to see your average.</p>
          <button className="btn-primary" onClick={() => setGradeModal('new')}>Add your first grade</button>
        </div>
      ) : (
        <ul className="space-y-3" aria-label={`Grades for ${subject.name}`}>
          {grades.map((g, i) => (
            <li
              key={g.id}
              className="card-soft !p-4 flex items-center gap-4 animate-fade-up"
              style={{ animationDelay: `${Math.min(i, 10) * 35}ms` }}
            >
              <GradeBadge grade={g.grade} size="md" />
              <div className="flex-1 min-w-0">
                <p className="font-bold truncate">{g.title}</p>
                <p className="text-sm text-ink/70 flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
                  <span className="inline-flex items-center gap-1"><Icon name={TYPE_ICONS[g.type] || 'file'} size={14} />{g.type}</span>
                  <span className="inline-flex items-center gap-1"><Icon name="calendar" size={14} />{formatDate(g.date)}</span>
                  <span className="inline-flex items-center gap-1"><Icon name="weight" size={14} />×{g.weight}</span>
                </p>
              </div>
              <div className="flex shrink-0">
                <button className="icon-btn" onClick={() => setGradeModal(g)} aria-label={`Edit grade ${g.title}`} title="Edit">
                  <Icon name="pencil" size={18} />
                </button>
                <button
                  className="icon-btn hover:!text-red-700 hover:!bg-red-50"
                  onClick={() => setConfirm({ kind: 'grade', grade: g })}
                  aria-label={`Delete grade ${g.title}`}
                  title="Delete"
                >
                  <Icon name="trash" size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={Boolean(gradeModal)}
        onClose={() => setGradeModal(null)}
        title={gradeModal === 'new' ? 'Log a grade' : 'Edit grade'}
        description={`${subject.name} · target ${subject.target}`}
      >
        <GradeForm
          initial={gradeModal === 'new' ? null : gradeModal}
          onSubmit={onSaveGrade}
          onCancel={() => setGradeModal(null)}
          submitLabel={gradeModal === 'new' ? 'Save grade' : 'Save changes'}
        />
      </Modal>

      <Modal open={editSubject} onClose={() => setEditSubject(false)} title="Edit subject">
        <SubjectForm initial={subject} onSubmit={onSaveSubject} onCancel={() => setEditSubject(false)} submitLabel="Save changes" />
      </Modal>

      <ConfirmModal
        open={Boolean(confirm)}
        onClose={() => setConfirm(null)}
        onConfirm={onConfirmDelete}
        busy={busy}
        title={confirm?.kind === 'subject' ? `Delete ${subject.name}?` : 'Delete this grade?'}
        body={
          confirm?.kind === 'subject'
            ? 'This removes the subject and every grade logged against it. You can’t undo this.'
            : `“${confirm?.grade?.title}” will be removed and your average recalculated.`
        }
        confirmLabel={confirm?.kind === 'subject' ? 'Delete subject' : 'Delete grade'}
      />
    </div>
  )
}
