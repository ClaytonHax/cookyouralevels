import Reveal from './Reveal'
import Section from './Section'

const steps = [
  { n: '1', title: 'Pick your subjects and exam date', text: 'Tell us what you take and when you sit it. We count down the days so the deadline feels real.' },
  { n: '2', title: 'Rate, learn, practise', text: 'Mark each objective red, amber or green. Read the notes for the red ones, then drill topical questions until they turn green.' },
  { n: '3', title: 'Finish with full papers', text: 'Work through past papers, log your scores and track them against your target grade.' },
]

export default function HowItWorks() {
  return (
    <Section id="how" eyebrow="How it works" title="From “where do I start?” to exam-ready.">
      <ol className="grid md:grid-cols-3 gap-4">
        {steps.map((s, i) => (
          <li key={s.n}>
            <Reveal delay={i * 80} className="h-full">
              <div className="h-full relative card p-6">
                <span className="font-display font-extrabold text-5xl text-flame/30 leading-none" aria-hidden>{s.n}</span>
                <h3 className="font-display font-bold text-lg text-ink mt-3"><span className="sr-only">Step {s.n}: </span>{s.title}</h3>
                <p className="text-sm text-ink-2 mt-2 leading-relaxed">{s.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
