import { BookOpen, FileQuestion, Files, LineChart, ListChecks, Sparkles } from 'lucide-react'
import type { ComponentType } from 'react'
import { Badge } from '../ui'
import Reveal from './Reveal'
import Section from './Section'

const pillars: { icon: ComponentType<{ className?: string }>; title: string; text: string; tone: string }[] = [
  { icon: ListChecks, title: 'Syllabus', text: 'Every learning objective, organised by topic. Rate each one red, amber or green and watch your readiness build.', tone: 'bg-maths-soft text-maths' },
  { icon: BookOpen, title: 'Notes', text: 'Curated revision notes for each topic, with proper maths. Add your own beside them.', tone: 'bg-physics-soft text-physics' },
  { icon: FileQuestion, title: 'Topical questions', text: 'Real questions cropped from real CIE papers, grouped by topic, each with its mark scheme.', tone: 'bg-flame-soft text-flame-strong dark:text-flame' },
  { icon: Files, title: 'Past papers', text: 'Every paper from 2016 on, with question paper, mark scheme and examiner report links. Log what you have done.', tone: 'bg-cs-soft text-cs' },
  { icon: LineChart, title: 'Grades', text: 'Log mock and test results against a target grade so you can see the gap and close it.', tone: 'bg-maths-soft text-maths' },
]

export default function Features() {
  return (
    <Section
      id="features"
      eyebrow="What you get"
      title="One loop, five tools, no tab juggling."
      intro="Stop hunting for the right PDF. Everything hangs off the syllabus, so every note, question and paper sits next to the topic it belongs to."
    >
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pillars.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={i * 60} className="h-full">
              <div className="card h-full p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift">
                <span className={`w-10 h-10 rounded-control flex items-center justify-center ${p.tone}`}><p.icon className="w-5 h-5" /></span>
                <h3 className="font-display font-bold text-lg text-ink mt-4">{p.title}</h3>
                <p className="text-sm text-ink-2 mt-1.5 leading-relaxed">{p.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
        <li>
          <Reveal delay={pillars.length * 60} className="h-full">
            <div className="h-full rounded-card border border-dashed border-flame/50 bg-flame-soft/60 p-5">
              <span className="w-10 h-10 rounded-control flex items-center justify-center bg-flame-strong text-white"><Sparkles className="w-5 h-5" /></span>
              <h3 className="font-display font-bold text-lg text-ink mt-4 flex items-center gap-2">AI Study Coach <Badge tone="flame">Coming soon</Badge></h3>
              <p className="text-sm text-ink-2 mt-1.5 leading-relaxed">A daily plan from your exam date and weak topics. Not live yet; you can join the waitlist once you are in.</p>
            </div>
          </Reveal>
        </li>
      </ul>
    </Section>
  )
}
