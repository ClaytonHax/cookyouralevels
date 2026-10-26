import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useGradeSubjects, useProfile } from '../hooks/useUserData'
import { SUBJECTS } from '../lib/subjects'
import type { SubjectId } from '../types/content'
import { cn } from '../lib/cn'
import { BrandMark } from '../components/layout/Navbar'
import { Button, Input, Select } from '../components/ui'
import { GRADES, sessionOptions } from '../components/dashboard/examDate'
import { findGradeSubject, saveTarget } from '../components/dashboard/targets'

const STEPS = ['Subjects', 'Exam session', 'Targets']

export default function Onboarding() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { profile, loading, saveProfile } = useProfile()
  const { subjects: gradeSubjects } = useGradeSubjects()
  const options = useMemo(() => sessionOptions(), [])

  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [picked, setPicked] = useState<SubjectId[]>([])
  const [sessionKey, setSessionKey] = useState('')
  const [targets, setTargets] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [seeded, setSeeded] = useState(false)

  // Prefill once from an existing profile / account name.
  useEffect(() => {
    if (seeded || loading) return
    setName(profile?.displayName || (user && !user.isGuest ? user.displayName ?? '' : ''))
    if (profile?.subjects?.length) setPicked(profile.subjects)
    const first = options.find((o) => o.session === 's' && o.year >= new Date().getFullYear() + (new Date().getMonth() > 5 ? 1 : 0)) ?? options[0]
    const key = profile?.examYear ? `${profile.examYear}-${profile.examSession}` : first ? `${first.year}-${first.session}` : ''
    setSessionKey(key)
    setSeeded(true)
  }, [seeded, loading, profile, user, options])

  const toggle = (id: SubjectId) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  const finish = async () => {
    setBusy(true)
    const [y, s] = sessionKey.split('-')
    await saveProfile({
      displayName: name.trim(),
      subjects: picked,
      examYear: Number(y) || new Date().getFullYear() + 1,
      examSession: (s as 'm' | 's' | 'w') || 's',
    })
    for (const sub of SUBJECTS.filter((x) => picked.includes(x.id))) {
      const t = targets[sub.id]
      if (t) saveTarget(gradeSubjects, sub, t)
    }
    navigate('/dashboard', { replace: true })
  }

  const canNext = step === 0 ? picked.length > 0 : step === 1 ? !!sessionKey : true
  const mine = SUBJECTS.filter((s) => picked.includes(s.id))

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="max-w-2xl w-full mx-auto px-4 sm:px-6 pt-6 flex items-center gap-3">
        <BrandMark small />
        <span className="font-display font-extrabold text-ink tracking-tight">Cook Your A Levels</span>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-8">
        <ol className="flex items-center gap-2 mb-8" aria-label="Progress">
          {STEPS.map((label, i) => (
            <li key={label} className="flex-1" aria-current={i === step ? 'step' : undefined}>
              <div className={cn('h-1.5 rounded-full transition-colors duration-300', i <= step ? 'bg-flame' : 'bg-border')} />
              <span className={cn('block text-xs font-bold mt-1.5', i === step ? 'text-ink' : 'text-ink-3')}>{i + 1}. {label}</span>
            </li>
          ))}
        </ol>

        <div key={step} className="animate-pop-in">
          {step === 0 && (
            <section aria-labelledby="ob-h">
              <h1 id="ob-h" className="font-display font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">What are you cooking?</h1>
              <p className="text-ink-2 mt-2">Pick every subject you take. You can change this later in Settings.</p>
              <div className="mt-5 max-w-sm">
                <Input label="What should we call you?" placeholder="Your first name" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} autoComplete="given-name" />
              </div>
              <ul className="grid sm:grid-cols-3 gap-3 mt-6">
                {SUBJECTS.map((s) => {
                  const on = picked.includes(s.id)
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={on}
                        onClick={() => toggle(s.id)}
                        className={cn('w-full h-full text-left rounded-card border-2 p-4 transition-all duration-150 focus-ring cursor-pointer bg-surface', on ? `${s.cls.border} ${s.cls.soft}` : 'border-border hover:border-ink-3/50')}
                      >
                        <span className="flex items-center justify-between">
                          <span className={cn('w-3 h-3 rounded-full', s.cls.dot)} />
                          <span className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors', on ? `${s.cls.dot} border-transparent text-white` : 'border-border')}>
                            {on && <Check className="w-3 h-3" aria-hidden />}
                          </span>
                        </span>
                        <span className="block font-display font-bold text-lg text-ink mt-3">{s.name}</span>
                        <span className="block text-xs font-mono text-ink-3 mt-0.5">CIE {s.code}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          {step === 1 && (
            <section aria-labelledby="ob-h">
              <h1 id="ob-h" className="font-display font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">When is the big day?</h1>
              <p className="text-ink-2 mt-2">Pick the session you are sitting. We use it for your countdown. An approximate start is fine.</p>
              <div className="mt-6 max-w-sm">
                <Select label="Exam session" value={sessionKey} onChange={(e) => setSessionKey(e.target.value)}>
                  {options.map((o) => <option key={`${o.year}-${o.session}`} value={`${o.year}-${o.session}`}>{o.label}</option>)}
                </Select>
              </div>
            </section>
          )}

          {step === 2 && (
            <section aria-labelledby="ob-h">
              <h1 id="ob-h" className="font-display font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">Aim high. What is the target?</h1>
              <p className="text-ink-2 mt-2">Optional. Set a target grade per subject and the grades tracker will show your gap. Skip it if you are not sure yet.</p>
              <div className="mt-6 space-y-3 max-w-md">
                {mine.map((s) => {
                  const existing = findGradeSubject(gradeSubjects, s)
                  return (
                    <div key={s.id} className="card p-4 flex items-center gap-3">
                      <span className={cn('w-3 h-3 rounded-full shrink-0', s.cls.dot)} aria-hidden />
                      <span className="flex-1 font-display font-bold text-ink">{s.name}</span>
                      <label className="sr-only" htmlFor={`t-${s.id}`}>Target grade for {s.name}</label>
                      <div className="w-28">
                        <Select id={`t-${s.id}`} value={targets[s.id] ?? existing?.target ?? ''} onChange={(e) => setTargets((t) => ({ ...t, [s.id]: e.target.value }))}>
                          <option value="">No target</option>
                          {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                        </Select>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}
        </div>

        <div className="flex items-center justify-between mt-10">
          <Button variant="ghost" onClick={() => setStep((s) => s - 1)} className={step === 0 ? 'invisible' : ''} leftIcon={<ArrowLeft className="w-4 h-4" />} disabled={step === 0}>Back</Button>
          {step < STEPS.length - 1 ? (
            <Button size="lg" onClick={() => setStep((s) => s + 1)} disabled={!canNext} rightIcon={<ArrowRight className="w-4 h-4" />}>Continue</Button>
          ) : (
            <Button size="lg" onClick={finish} loading={busy} disabled={!canNext}>Let's cook</Button>
          )}
        </div>
      </main>
    </div>
  )
}
