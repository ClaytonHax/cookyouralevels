import { Link } from 'react-router-dom'
import { BookOpen, Dumbbell, Files, ListChecks } from 'lucide-react'
import { buttonClasses } from '../ui'

const steps = [
  { icon: ListChecks, t: 'Rate', d: 'Mark each syllabus objective red, amber or green.' },
  { icon: BookOpen, t: 'Learn', d: 'Read the notes on your reds and ambers.' },
  { icon: Dumbbell, t: 'Practise', d: 'Drill real topical questions with mark schemes.' },
  { icon: Files, t: 'Papers', d: 'Finish with full past papers and log your score.' },
]

export default function LoopCard({ firstSubject }: { firstSubject?: string }) {
  return (
    <section aria-labelledby="loop-h" className="card p-5 sm:p-6 bg-gradient-to-br from-flame-soft/70 to-surface">
      <h2 id="loop-h" className="font-display font-extrabold text-xl text-ink">Welcome. Here is how this works.</h2>
      <p className="text-sm text-ink-2 mt-1">Four steps on repeat. Your cards below fill in as you go.</p>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {steps.map((s, i) => (
          <li key={s.t} className="rounded-control bg-surface border border-border p-3.5">
            <div className="flex items-center gap-2 text-flame-strong dark:text-flame"><s.icon className="w-4 h-4" aria-hidden /><span className="text-xs font-bold">Step {i + 1}</span></div>
            <div className="font-display font-bold text-ink mt-1">{s.t}</div>
            <p className="text-xs text-ink-2 mt-0.5 leading-relaxed">{s.d}</p>
          </li>
        ))}
      </ol>
      {firstSubject && <Link to={`/s/${firstSubject}`} className={buttonClasses('primary', 'md', 'mt-5')}>Start with the syllabus</Link>}
    </section>
  )
}
