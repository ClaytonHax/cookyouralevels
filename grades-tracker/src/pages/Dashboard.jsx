import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { subscribeSubjects, subscribeGrades, addSubject, deleteSubject } from '../firestore'
import { seedSampleData } from '../localStore'
import {
  weightedAverage,
  overallAverage,
  progressToTarget,
  gradeGap,
  gapLabel,
  gradeToPoints,
} from '../grades'
import GradeBadge from '../components/GradeBadge'
import ProgressBar from '../components/ProgressBar'
import Icon from '../components/Icon'
import Modal, { ConfirmModal } from '../components/Modal'
import { SubjectForm } from '../components/Forms'
import { Sparkline } from '../components/TrendChart'
import { PageSkeleton } from '../components/Skeleton'
import { useToast } from '../components/Toast'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

function heroMessage(onTarget, withGrades, total) {
  if (total === 0) return "Let's set up your subjects and start tracking."
  if (withGrades === 0) return 'Log your first grade to see how you’re doing.'
  if (onTarget === withGrades) return 'Every subject is on target. Brilliant work — keep it going!'
  if (onTarget === 0) return 'Every grade is a step. Pick one subject to push this week.'
  return `${onTarget} of ${withGrades} subjects on target — you’re getting there.`
}

function StatCard({ icon, label, value, sub, tone = 'pink', delay = 0 }) {
  const tones = {
    pink: 'bg-secondary/70 text-primary-strong',
    green: 'bg-green-100 text-green-800',
    amber: 'bg-amber-100 text-amber-800',
    violet: 'bg-violet-100 text-violet-800',
  }
  return (
    <div className="card-soft !p-5 animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <span className={`inline-grid place-items-center w-10 h-10 rounded-xl mb-3 ${tones[tone]}`}>
        <Icon name={icon} size={20} />
      </span>
      <p className="text-xs font-bold uppercase tracking-wide text-ink/70">{label}</p>
      <p className="font-display text-2xl mt-0.5 truncate">{value}</p>
      {sub && <p className="text-xs text-ink/70 mt-0.5 truncate">{sub}</p>}
    </div>
  )
}

export default function Dashboard() {
  const { user, demo } = useAuth()
  const toast = useToast()
  const [subjects, setSubjects] = useState([])
  const [gradesBySubject, setGradesBySubject] = useState({})
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [showAdd, setShowAdd] = useState(false)
  const [toDelete, setToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    return subscribeSubjects(
      user.uid,
      (subs) => {
        setSubjects(subs)
        setStatus('ready')
      },
      () => setStatus('error')
    )
  }, [user.uid])

  useEffect(() => {
    const unsubs = subjects.map((sub) =>
      subscribeGrades(
        user.uid,
        sub.id,
        (gs) => setGradesBySubject((prev) => ({ ...prev, [sub.id]: gs })),
        () => {}
      )
    )
    return () => unsubs.forEach((u) => u && u())
  }, [subjects, user.uid])

  async function onAddSubject(data) {
    await addSubject(user.uid, data)
    setShowAdd(false)
    toast(`${data.name} added`)
  }

  async function onDelete() {
    setDeleting(true)
    try {
      await deleteSubject(user.uid, toDelete.id)
      toast(`${toDelete.name} deleted`)
      setToDelete(null)
    } catch {
      toast('Could not delete the subject. Try again.', 'error')
    } finally {
      setDeleting(false)
    }
  }

  if (status === 'loading') return <PageSkeleton label="Loading your subjects…" />
  if (status === 'error') {
    return (
      <div role="alert" className="card-soft text-center py-12">
        <p className="font-display text-xl mb-2">Couldn’t load your subjects</p>
        <p className="text-ink/70 text-sm mb-5">Check your connection and refresh the page.</p>
        <button className="btn-ghost" onClick={() => window.location.reload()}>Refresh</button>
      </div>
    )
  }

  const rows = subjects.map((s) => {
    const grades = gradesBySubject[s.id] || []
    const current = weightedAverage(grades)
    return { s, grades, current, gap: gradeGap(current, s.target) }
  })
  const withGrades = rows.filter((r) => r.current)
  const onTarget = withGrades.filter((r) => r.gap <= 0).length
  const totalGrades = rows.reduce((n, r) => n + r.grades.length, 0)
  const best = [...withGrades].sort((a, b) => gradeToPoints(b.current) - gradeToPoints(a.current))[0]
  const focus = [...withGrades].filter((r) => r.gap > 0).sort((a, b) => b.gap - a.gap)[0]
  const overall = overallAverage(subjects, gradesBySubject)
  const rawFirst = (user.displayName || '').split(' ')[0]
  const firstName = rawFirst.charAt(0).toUpperCase() + rawFirst.slice(1)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-card p-6 sm:p-8 mb-6 text-white bg-gradient-to-br from-primary via-pink-600 to-ink shadow-lift animate-fade-up">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10" aria-hidden="true" />
        <div className="absolute right-24 -bottom-20 w-48 h-48 rounded-full bg-white/10" aria-hidden="true" />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
          <div className="max-w-md">
            <p className="font-semibold text-white/90">{greeting()}{firstName ? `, ${firstName}` : ''}</p>
            <h1 className="font-display text-3xl sm:text-4xl mt-1 leading-tight">Your grades at a glance</h1>
            <p className="mt-2 text-white/90">{heroMessage(onTarget, withGrades.length, subjects.length)}</p>
            <button className="btn mt-5 bg-white text-primary-strong hover:bg-pink-50 shadow-lg" onClick={() => setShowAdd(true)}>
              <Icon name="plus" size={18} strokeWidth={2.5} />
              Add subject
            </button>
          </div>
          {subjects.length > 0 && (
            <div className="flex items-center gap-4 self-start sm:self-auto bg-white/15 backdrop-blur rounded-2xl p-4 pr-6">
              <GradeBadge grade={overall} size="xl" className="!shadow-xl ring-4 ring-white/40 animate-pop" label={overall ? `Overall grade ${overall}` : 'No overall grade yet'} />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/90">Overall</p>
                <p className="font-display text-xl">{overall ? `${overall} average` : 'No grades yet'}</p>
                <p className="text-sm text-white/90">across {subjects.length} subject{subjects.length === 1 ? '' : 's'}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {subjects.length === 0 ? (
        <div className="card-soft text-center py-14 animate-fade-up">
          <div className="mx-auto mb-5 flex justify-center -space-x-3" aria-hidden="true">
            {['A*', 'A', 'B'].map((g, i) => (
              <GradeBadge key={g} grade={g} size="lg" className="ring-4 ring-white animate-float" style={{ animationDelay: `${i * 300}ms` }} />
            ))}
          </div>
          <h2 className="font-display text-2xl mb-1">No subjects yet</h2>
          <p className="text-ink/70 mb-6 max-w-sm mx-auto">
            Add a subject, set a target grade, then log your tests and mocks to watch your progress.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button className="btn-primary" onClick={() => setShowAdd(true)}>
              <Icon name="plus" size={18} strokeWidth={2.5} />
              Add your first subject
            </button>
            {demo && (
              <button className="btn-ghost" onClick={() => seedSampleData().then(() => toast('Sample subjects added'))}>
                <Icon name="sparkles" size={18} />
                Try sample data
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon="target" label="On target" value={`${onTarget}/${withGrades.length || subjects.length}`} sub={withGrades.length ? 'subjects at or above goal' : 'add grades to see'} tone="green" />
            <StatCard icon="trophy" label="Strongest" value={best ? best.s.name : '—'} sub={best ? `averaging ${best.current}` : 'no grades yet'} tone="amber" delay={60} />
            <StatCard icon="trending-up" label="Focus on" value={focus ? focus.s.name : 'All good'} sub={focus ? gapLabel(focus.gap) : 'nothing behind target'} tone="violet" delay={120} />
            <StatCard icon="file" label="Grades logged" value={totalGrades} sub={`in ${subjects.length} subject${subjects.length === 1 ? '' : 's'}`} delay={180} />
          </div>

          <div className="flex items-end justify-between mb-4">
            <h2 className="font-display text-2xl">Your subjects</h2>
            <button className="btn-ghost !min-h-[40px] !px-4 text-sm" onClick={() => setShowAdd(true)}>
              <Icon name="plus" size={16} strokeWidth={2.5} />
              Add
            </button>
          </div>

          <ul className="grid sm:grid-cols-2 gap-5" aria-label="Your subjects">
            {rows.map(({ s, grades, current, gap }, i) => {
              const reached = gap !== null && gap <= 0
              return (
                <li
                  key={s.id}
                  className="card-soft card-hover relative group animate-fade-up"
                  style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-display text-xl truncate">
                        <Link
                          to={`/subject/${s.id}`}
                          className="cursor-pointer group-hover:text-primary-strong transition-colors after:absolute after:inset-0 after:rounded-card"
                        >
                          {s.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-ink/70">
                        {s.syllabus ? `Syllabus ${s.syllabus} · ` : ''}
                        {grades.length} grade{grades.length === 1 ? '' : 's'}
                      </p>
                    </div>
                    <GradeBadge grade={current} size="lg" label={current ? `Current grade ${current}` : 'No grade yet'} />
                  </div>

                  <div className="mt-4 h-9">
                    {grades.length > 1 ? (
                      <Sparkline grades={grades} />
                    ) : (
                      <p className="text-xs text-ink/70 pt-2">Log 2+ grades to see a trend line.</p>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm mb-2">
                    <span className="font-semibold">
                      Target <span className="font-display">{s.target}</span>
                    </span>
                    <span className={`chip ${reached ? 'bg-green-100 text-green-800' : current ? 'bg-secondary/70 text-primary-strong' : 'bg-surface text-ink/70'}`}>
                      {reached && <Icon name="check" size={12} strokeWidth={3} />}
                      {gapLabel(gap)}
                    </span>
                  </div>
                  <ProgressBar value={progressToTarget(current, s.target)} reached={reached} size="sm" label={`Progress to target ${s.target}`} />

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary-strong inline-flex items-center gap-1">
                      Open <Icon name="chevron-right" size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <button
                      className="icon-btn relative z-10 !w-10 !h-10 text-ink/60 hover:!text-red-700 hover:!bg-red-50"
                      onClick={() => setToDelete(s)}
                      aria-label={`Delete subject ${s.name}`}
                      title="Delete subject"
                    >
                      <Icon name="trash" size={18} />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      )}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add a subject" description="Pick the grade you’re aiming for — you can change it later.">
        <SubjectForm onSubmit={onAddSubject} onCancel={() => setShowAdd(false)} />
      </Modal>

      <ConfirmModal
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        onConfirm={onDelete}
        busy={deleting}
        title={`Delete ${toDelete?.name || 'subject'}?`}
        body="This removes the subject and every grade logged against it. You can’t undo this."
        confirmLabel="Delete subject"
      />
    </div>
  )
}
