import { useMemo } from 'react'
import { BellRing, CalendarCheck, Camera, Check, ListChecks, Sparkles, Wand2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useProfile, useWaitlist } from '../hooks/useUserData'
import { Badge, Button, Card } from '../components/ui'
import { useDashboardData } from '../components/dashboard/useDashboardData'
import CoachPreview from '../components/coach/CoachPreview'

const features = [
  { icon: CalendarCheck, title: 'A daily plan', text: 'Built from your exam date and the topics you rated red or amber, so every day has a clear job.' },
  { icon: ListChecks, title: 'Mark schemes, explained', text: 'Stuck on a mark scheme? Get it walked through step by step, in plain language.' },
  { icon: Camera, title: 'Mark my handwriting', text: 'Snap a photo of your working and get it marked against the scheme, method marks included.' },
  { icon: Wand2, title: 'Fresh practice', text: 'Run out of past questions on a topic? Generate new exam-style ones at the right difficulty.' },
]

export default function Coach() {
  const { user } = useAuth()
  const { profile } = useProfile()
  const { joined, join } = useWaitlist('coach')
  const ids = useMemo(() => profile?.subjects ?? [], [profile?.subjects])
  const { stats } = useDashboardData(ids)

  return (
    <div className="space-y-10">
      <header className="max-w-2xl">
        <Badge tone="flame"><Sparkles className="w-3 h-3" aria-hidden /> Coming soon</Badge>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mt-3">Your AI Study Coach</h1>
        <p className="text-lg text-ink-2 mt-3 leading-relaxed">
          A coach that knows your exam date, your weak topics and your progress, and tells you exactly what to do next. We are building it now.
        </p>
        <p className="text-sm text-ink-3 mt-2">To be upfront: nothing AI runs on this site yet. Everything else here works today.</p>
      </header>

      <div className="grid lg:grid-cols-[1fr_1.05fr] gap-8 items-start">
        <div className="space-y-4">
          <h2 className="font-display font-bold text-xl text-ink">What it will do</h2>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f.title}>
                <Card className="flex gap-3.5">
                  <span className="w-10 h-10 rounded-control bg-flame-soft text-flame flex items-center justify-center shrink-0"><f.icon className="w-5 h-5" aria-hidden /></span>
                  <div>
                    <h3 className="font-display font-bold text-ink">{f.title}</h3>
                    <p className="text-sm text-ink-2 mt-0.5 leading-relaxed">{f.text}</p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>

          <Card className="bg-flame-soft/60 border-flame/30">
            {joined ? (
              <div className="flex items-start gap-3" role="status">
                <span className="w-9 h-9 rounded-full bg-conf-green/15 text-conf-green flex items-center justify-center shrink-0"><Check className="w-5 h-5" aria-hidden /></span>
                <div>
                  <p className="font-display font-bold text-ink">You are on the list.</p>
                  <p className="text-sm text-ink-2 mt-0.5">We will let you know when the coach is ready. Keep rating your syllabus meanwhile; the more it knows, the better the plan.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <p className="font-display font-bold text-ink">Want first dibs?</p>
                  <p className="text-sm text-ink-2 mt-0.5">{user?.email ? `We will email ${user.email} when it is ready.` : 'Join the waitlist and we will let you know.'}</p>
                </div>
                <Button onClick={() => join(user?.email ?? undefined)} leftIcon={<BellRing className="w-4 h-4" />}>Notify me</Button>
              </div>
            )}
          </Card>
        </div>

        <CoachPreview stats={stats} year={profile?.examYear} session={profile?.examSession} />
      </div>
    </div>
  )
}
