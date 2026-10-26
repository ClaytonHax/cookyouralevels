import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, ExternalLink, LogOut, Monitor, Moon, Sun, Trash2, UserPlus } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useGradeSubjects, useProfile } from '../hooks/useUserData'
import { SUBJECTS } from '../lib/subjects'
import { applyTheme } from '../lib/theme'
import { setTheme as persistTheme } from '../lib/theme'
import { clearGuestData, exportGuestData } from '../lib/userStore'
import { cn } from '../lib/cn'
import type { SessionCode, SubjectId } from '../types/content'
import { Button, Card, Input, Modal, Select, useToast } from '../components/ui'
import { GRADES, sessionOptions } from '../components/dashboard/examDate'
import { findGradeSubject, saveTarget } from '../components/dashboard/targets'

function Section({ id, title, desc, children }: { id: string; title: string; desc?: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="font-display font-bold text-xl text-ink">{title}</h2>
      {desc && <p className="text-sm text-ink-2 mt-0.5">{desc}</p>}
      <Card className="mt-3">{children}</Card>
    </section>
  )
}

type Pref = 'light' | 'dark' | 'system'
function storedPref(): Pref {
  try { const v = localStorage.getItem('cyal.theme'); return v === 'light' || v === 'dark' ? v : 'system' } catch { return 'system' }
}
function choose(p: Pref) {
  if (p === 'system') {
    try { localStorage.removeItem('cyal.theme') } catch { /* ignore */ }
    applyTheme(window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    window.dispatchEvent(new Event('cyal-theme'))
  } else persistTheme(p)
}

export default function Settings() {
  const navigate = useNavigate()
  const toast = useToast()
  const { user, isGuest, firebaseEnabled, signOut, openAuth } = useAuth()
  const { profile, saveProfile } = useProfile()
  const { subjects: gradeSubjects } = useGradeSubjects()
  const options = useMemo(() => {
    const o = sessionOptions()
    if (profile && !o.some((x) => x.year === profile.examYear && x.session === profile.examSession)) {
      o.unshift({ year: profile.examYear, session: profile.examSession, label: `${{ m: 'Feb/March', s: 'May/June', w: 'Oct/Nov' }[profile.examSession]} ${profile.examYear}` })
    }
    return o
  }, [profile])

  const [name, setName] = useState('')
  useEffect(() => { setName(profile?.displayName ?? '') }, [profile?.displayName])
  const [pref, setPref] = useState<Pref>(storedPref)
  const [confirmClear, setConfirmClear] = useState(false)

  if (!profile) return null
  const mySubjects = profile.subjects

  const toggleSubject = (id: SubjectId) => {
    const next = mySubjects.includes(id) ? mySubjects.filter((s) => s !== id) : [...mySubjects, id]
    if (next.length === 0) { toast.error('Keep at least one subject.'); return }
    void saveProfile({ subjects: next })
  }

  const download = () => {
    const url = URL.createObjectURL(new Blob([exportGuestData()], { type: 'application/json' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `cook-your-a-levels-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <h1 className="font-display text-3xl font-extrabold text-ink">Settings</h1>

      <Section id="s-profile" title="Profile">
        <form
          className="flex flex-col sm:flex-row sm:items-end gap-3"
          onSubmit={(e) => { e.preventDefault(); void saveProfile({ displayName: name.trim() }); toast.success('Name saved') }}
        >
          <div className="flex-1"><Input label="Display name" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} placeholder="Your first name" /></div>
          <Button type="submit" variant="secondary" disabled={name.trim() === profile.displayName}>Save</Button>
        </form>
      </Section>

      <Section id="s-subjects" title="Subjects" desc="Choose what shows up on your dashboard and sidebar. Your progress is kept even if you hide a subject.">
        <ul className="grid sm:grid-cols-3 gap-2.5">
          {SUBJECTS.map((s) => {
            const on = mySubjects.includes(s.id)
            return (
              <li key={s.id}>
                <button
                  type="button" role="checkbox" aria-checked={on} onClick={() => toggleSubject(s.id)}
                  className={cn('w-full text-left rounded-control border-2 px-3.5 py-3 transition-colors focus-ring cursor-pointer', on ? `${s.cls.border} ${s.cls.soft}` : 'border-border hover:border-ink-3/50')}
                >
                  <span className="flex items-center gap-2"><span className={cn('w-2.5 h-2.5 rounded-full', s.cls.dot)} /><span className="font-bold text-ink">{s.name}</span></span>
                  <span className="block text-xs font-mono text-ink-3 mt-0.5">{on ? 'Selected' : 'Hidden'} · {s.code}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </Section>

      <Section id="s-exam" title="Exam session" desc="Drives the countdown on your dashboard (approximate start of the session).">
        <div className="max-w-xs">
          <Select
            label="Session"
            value={`${profile.examYear}-${profile.examSession}`}
            onChange={(e) => { const [y, s] = e.target.value.split('-'); void saveProfile({ examYear: Number(y), examSession: s as SessionCode }) }}
          >
            {options.map((o) => <option key={`${o.year}-${o.session}`} value={`${o.year}-${o.session}`}>{o.label}</option>)}
          </Select>
        </div>
      </Section>

      <Section id="s-targets" title="Target grades" desc="Shared with the grades tracker.">
        <ul className="space-y-3">
          {SUBJECTS.filter((s) => mySubjects.includes(s.id)).map((s) => (
            <li key={s.id} className="flex items-center gap-3">
              <span className={cn('w-2.5 h-2.5 rounded-full shrink-0', s.cls.dot)} aria-hidden />
              <label htmlFor={`tg-${s.id}`} className="flex-1 font-bold text-ink">{s.name}</label>
              <div className="w-32">
                <Select id={`tg-${s.id}`} value={findGradeSubject(gradeSubjects, s)?.target ?? ''} onChange={(e) => saveTarget(gradeSubjects, s, e.target.value)}>
                  <option value="">No target</option>
                  {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                </Select>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="s-theme" title="Appearance">
        <div role="radiogroup" aria-label="Theme" className="grid grid-cols-3 gap-2 max-w-md">
          {([['light', Sun, 'Light'], ['dark', Moon, 'Dark'], ['system', Monitor, 'System']] as const).map(([v, Icon, label]) => (
            <button
              key={v} type="button" role="radio" aria-checked={pref === v}
              onClick={() => { choose(v); setPref(v) }}
              className={cn('flex items-center justify-center gap-2 h-11 rounded-control border-2 text-sm font-bold transition-colors focus-ring cursor-pointer', pref === v ? 'border-flame bg-flame-soft text-flame-strong dark:text-flame' : 'border-border text-ink-2 hover:bg-surface-2')}
            >
              <Icon className="w-4 h-4" aria-hidden /> {label}
            </button>
          ))}
        </div>
      </Section>

      <Section id="s-account" title="Account">
        {isGuest ? (
          <div className="space-y-4">
            <p className="text-sm text-ink-2">You are using a guest session. Your progress lives only in this browser, so clearing site data would lose it.</p>
            <div className="flex flex-wrap gap-2">
              {firebaseEnabled && <Button onClick={openAuth} leftIcon={<UserPlus className="w-4 h-4" />}>Create an account</Button>}
              <Button variant="secondary" onClick={download} leftIcon={<Download className="w-4 h-4" />}>Export my data (JSON)</Button>
              <Button variant="ghost" className="text-conf-red hover:text-conf-red" onClick={() => setConfirmClear(true)} leftIcon={<Trash2 className="w-4 h-4" />}>Clear guest data</Button>
            </div>
            {firebaseEnabled && <p className="text-xs text-ink-3">Accounts start fresh. Export your guest data first if you want to keep a copy.</p>}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-ink-3">Signed in as</div>
              <div className="font-bold text-ink truncate">{user?.email ?? user?.displayName}</div>
            </div>
            <Button variant="secondary" leftIcon={<LogOut className="w-4 h-4" />} onClick={async () => { await signOut(); navigate('/') }}>Sign out</Button>
          </div>
        )}
        {isGuest && (
          <div className="mt-4 pt-4 border-t border-border">
            <Button variant="ghost" leftIcon={<LogOut className="w-4 h-4" />} onClick={async () => { await signOut(); navigate('/') }}>Leave guest session</Button>
            <span className="text-xs text-ink-3 ml-2">Your guest data stays on this device.</span>
          </div>
        )}
      </Section>

      <Section id="s-about" title="About &amp; credits">
        <div className="text-sm text-ink-2 space-y-2 leading-relaxed">
          <p><strong className="text-ink">Cook Your A Levels</strong> is an independent revision tool for CIE AS &amp; A Level Mathematics, Physics and Computer Science. It is not affiliated with Cambridge University Press &amp; Assessment.</p>
          <ul className="space-y-1.5">
            <li>Syllabus structure and learning objectives: <a className="text-flame-strong dark:text-flame font-bold underline underline-offset-2 inline-flex items-center gap-1" href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-subjects/" target="_blank" rel="noreferrer">Cambridge International <ExternalLink className="w-3 h-3" aria-hidden /></a></li>
            <li>Past papers, mark schemes and examiner reports are linked from <a className="text-flame-strong dark:text-flame font-bold underline underline-offset-2 inline-flex items-center gap-1" href="https://pastpapers.papacambridge.com/" target="_blank" rel="noreferrer">PapaCambridge <ExternalLink className="w-3 h-3" aria-hidden /></a>. Full PDFs are never re-hosted here.</li>
            <li>Topical question images are cropped from CIE past papers; copyright remains with the original holders.</li>
          </ul>
        </div>
      </Section>

      <Modal
        open={confirmClear} onClose={() => setConfirmClear(false)} size="sm" title="Clear guest data?"
        description="This permanently deletes your profile, progress, notes and grades stored in this browser. Export first if you want a copy."
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmClear(false)} data-autofocus>Cancel</Button>
            <Button variant="danger" onClick={() => { clearGuestData(); setConfirmClear(false); toast.success('Guest data cleared') }}>Delete everything</Button>
          </>
        }
      >
        <p className="text-sm text-ink-2">You will be taken back to setup afterwards.</p>
      </Modal>
    </div>
  )
}
