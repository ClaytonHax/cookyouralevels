import { Link } from 'react-router-dom'
import { ArrowRight, FileQuestion, Files, LineChart, NotebookPen, Sparkles } from 'lucide-react'
import { useMemo } from 'react'
import { useProfile, useNotes } from '../hooks/useUserData'
import { useAuth } from '../contexts/AuthContext'
import { SUBJECTS, getSubject } from '../lib/subjects'
import { Badge, Card, Skeleton } from '../components/ui'
import { useDashboardData } from '../components/dashboard/useDashboardData'
import { buildFocus } from '../components/dashboard/focus'
import SubjectCard from '../components/dashboard/SubjectCard'
import Countdown from '../components/dashboard/Countdown'
import LoopCard from '../components/dashboard/LoopCard'

function greeting(): string {
  const h = new Date().getHours()
  return h < 5 ? 'Burning the midnight oil' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}

function relTime(t: number): string {
  const d = Math.floor((Date.now() - t) / 86_400_000)
  return d <= 0 ? 'today' : d === 1 ? 'yesterday' : `${d} days ago`
}

export default function Dashboard() {
  const { user } = useAuth()
  const { profile } = useProfile()
  const ids = useMemo(() => (profile?.subjects ?? []), [profile?.subjects])
  const { stats, loading } = useDashboardData(ids)
  const { notes } = useNotes()

  const name = profile?.displayName?.trim() || (user && !user.isGuest ? user.displayName?.split(' ')[0] : '') || ''
  const focus = useMemo(() => buildFocus(stats), [stats])
  const anyActivity = stats.some((s) => s.hasActivity)
  const first = ids[0]
  const recent = notes.slice(0, 3)

  const quick = [
    { to: first ? `/s/${first}/questions` : '/dashboard', icon: FileQuestion, label: 'Question bank' },
    { to: first ? `/s/${first}/papers` : '/dashboard', icon: Files, label: 'Past papers' },
    { to: '/notes', icon: NotebookPen, label: 'My notes' },
    { to: '/grades', icon: LineChart, label: 'Grades' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">{greeting()}{name ? `, ${name}` : ''}.</h1>
          <p className="text-ink-2 mt-1">{anyActivity ? 'Here is where you stand. Pick up where you left off.' : 'Let us get your first topic done tonight.'}</p>
        </div>
        {profile && <Countdown year={profile.examYear} session={profile.examSession} />}
      </div>

      {!loading && !anyActivity && <LoopCard firstSubject={first} />}

      <section aria-labelledby="focus-h">
        <h2 id="focus-h" className="font-display font-bold text-xl text-ink mb-3">Today's focus</h2>
        {loading ? (
          <div className="grid md:grid-cols-3 gap-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-28" />)}</div>
        ) : focus.length === 0 ? (
          <Card><p className="text-sm text-ink-2">Nothing pressing. Open a subject and rate a topic to get suggestions.</p></Card>
        ) : (
          <ol className="grid md:grid-cols-3 gap-3">
            {focus.map((f, i) => {
              const sub = getSubject(f.subjectId)
              return (
                <li key={f.key}>
                  <Link to={f.to} className="card h-full p-4 flex gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift focus-ring group">
                    <span className={`w-10 h-10 rounded-control flex items-center justify-center shrink-0 ${sub?.cls.soft ?? 'bg-flame-soft'} ${sub?.cls.text ?? 'text-flame'}`}><f.icon className="w-5 h-5" aria-hidden /></span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-bold text-ink-3">{i + 1} of {focus.length}</span>
                      <span className="block font-display font-bold text-ink leading-snug">{f.title}</span>
                      <span className="block text-sm text-ink-2 mt-0.5 leading-snug">{f.text}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-ink-3 ml-auto shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </li>
              )
            })}
          </ol>
        )}
      </section>

      <section aria-labelledby="subj-h">
        <h2 id="subj-h" className="font-display font-bold text-xl text-ink mb-3">Your subjects</h2>
        {loading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{ids.map((id) => <Skeleton key={id} className="h-60" />)}</div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {stats.map((s) => <SubjectCard key={s.id} stats={s} />)}
          </div>
        )}
      </section>

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
        <section aria-labelledby="notes-h">
          <div className="flex items-center justify-between mb-3">
            <h2 id="notes-h" className="font-display font-bold text-xl text-ink">Recent notes</h2>
            <Link to="/notes" className="text-sm font-bold text-flame-strong dark:text-flame hover:underline underline-offset-2">All notes</Link>
          </div>
          {recent.length === 0 ? (
            <Card>
              <p className="text-sm text-ink-2">No notes yet. Add one from any question or topic and it will show up here.</p>
            </Card>
          ) : (
            <ul className="space-y-2">
              {recent.map((n) => {
                const sub = n.subjectId ? SUBJECTS.find((s) => s.id === n.subjectId) : undefined
                return (
                  <li key={n.id}>
                    <Link to={`/notes/${n.id}`} className="card flex items-center gap-3 px-4 py-3 hover:shadow-lift transition-shadow focus-ring">
                      <span className={`w-2 h-8 rounded-full ${sub?.cls.dot ?? 'bg-border'}`} aria-hidden />
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold text-ink truncate">{n.title || 'Untitled note'}</span>
                        <span className="block text-xs text-ink-3 truncate">{sub?.short ? `${sub.short} · ` : ''}Edited {relTime(n.updatedAt)}</span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        <div className="space-y-6">
          <section aria-labelledby="quick-h">
            <h2 id="quick-h" className="font-display font-bold text-xl text-ink mb-3">Quick links</h2>
            <ul className="grid grid-cols-2 gap-2">
              {quick.map((q) => (
                <li key={q.label}>
                  <Link to={q.to} className="card flex items-center gap-2.5 px-3.5 py-3 text-sm font-bold text-ink hover:shadow-lift transition-shadow focus-ring">
                    <q.icon className="w-4 h-4 text-flame" aria-hidden /> {q.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <Link to="/coach" className="block rounded-card border border-dashed border-flame/50 bg-flame-soft/60 p-4 hover:bg-flame-soft transition-colors focus-ring">
            <span className="flex items-center gap-2 font-display font-bold text-ink"><Sparkles className="w-4 h-4 text-flame" aria-hidden /> AI Study Coach <Badge tone="flame">Coming soon</Badge></span>
            <span className="block text-sm text-ink-2 mt-1">A daily plan built from your exam date and weak topics. See what is planned and join the waitlist.</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
