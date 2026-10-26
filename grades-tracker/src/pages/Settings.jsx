import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { clearLocalData } from '../localStore'
import { GRADES, GRADE_POINTS } from '../grades'
import GradeBadge from '../components/GradeBadge'
import Icon from '../components/Icon'
import { ConfirmModal } from '../components/Modal'
import { useToast } from '../components/Toast'

function memberSince(user) {
  const t = user.metadata?.creationTime
  if (!t) return '—'
  const d = new Date(t)
  return Number.isNaN(d.getTime()) ? t : d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
}

export default function Settings() {
  const { user, logout, demo } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [confirmClear, setConfirmClear] = useState(false)
  const initial = (user.displayName || user.email || '?').charAt(0).toUpperCase()

  async function onLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-3xl sm:text-4xl mb-6">Settings</h1>

      <section className="card-soft mb-6 animate-fade-up" aria-labelledby="acct-h">
        <h2 id="acct-h" className="sr-only">Account</h2>
        <div className="flex items-center gap-4">
          <span className="w-16 h-16 rounded-2xl grid place-items-center font-display text-2xl text-white bg-gradient-to-br from-primary to-primary-strong shadow-glow" aria-hidden="true">
            {initial}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-xl truncate">{user.displayName || 'Student'}</p>
            <p className="text-ink/70 truncate">{user.email}</p>
            <p className="text-xs text-ink/70 mt-0.5">Member since {memberSince(user)}</p>
          </div>
          <button className="btn-ghost hidden sm:inline-flex" onClick={onLogout}>
            <Icon name="log-out" size={18} />
            Log out
          </button>
        </div>
        <button className="btn-ghost w-full mt-5 sm:hidden" onClick={onLogout}>
          <Icon name="log-out" size={18} />
          Log out
        </button>
      </section>

      <section className="card-soft mb-6 animate-fade-up" style={{ animationDelay: '60ms' }} aria-labelledby="grade-h">
        <h2 id="grade-h" className="font-display text-xl mb-2">How averages work</h2>
        <p className="text-sm text-ink/80 mb-5">
          Each Cambridge grade is worth points. Your subject average is the weighted mean of those points,
          rounded to the nearest grade. Give mocks or finals a bigger weight if they matter more.
        </p>
        <ul className="grid grid-cols-7 gap-2 text-center" aria-label="Cambridge grade points">
          {GRADES.map((g) => (
            <li key={g} className="flex flex-col items-center gap-1.5">
              <GradeBadge grade={g} size="sm" />
              <span className="text-xs font-bold text-ink/70">{GRADE_POINTS[g]} pt{GRADE_POINTS[g] === 1 ? '' : 's'}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="card-soft animate-fade-up" style={{ animationDelay: '120ms' }} aria-labelledby="data-h">
        <div className="flex items-start gap-3">
          <span className="inline-grid place-items-center w-10 h-10 rounded-xl bg-green-100 text-green-800 shrink-0">
            <Icon name="shield" size={20} />
          </span>
          <div>
            <h2 id="data-h" className="font-display text-xl mb-1">Your data</h2>
            <p className="text-sm text-ink/80">
              {demo
                ? 'You’re in demo mode, so everything is saved in this browser only. Connect Firebase to sync across devices.'
                : 'Everything you add is stored in your own account and visible only to you. Deleting a subject removes its grades too.'}
            </p>
            {demo && (
              <button className="btn-ghost mt-4 text-red-700" onClick={() => setConfirmClear(true)}>
                <Icon name="trash" size={18} />
                Clear demo data
              </button>
            )}
          </div>
        </div>
      </section>

      <ConfirmModal
        open={confirmClear}
        onClose={() => setConfirmClear(false)}
        onConfirm={() => {
          clearLocalData()
          setConfirmClear(false)
          toast('Demo data cleared')
        }}
        title="Clear all demo data?"
        body="Every subject and grade saved in this browser will be removed."
        confirmLabel="Clear data"
      />
    </div>
  )
}
