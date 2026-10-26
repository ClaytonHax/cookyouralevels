import { ChevronDown } from 'lucide-react'
import Section from './Section'

const faqs = [
  { q: 'Is it really free?', a: 'Yes. Everything on the site is free to use. An account just syncs your progress between devices; without one it is saved on the device you are using.' },
  { q: 'Which syllabus is this for?', a: 'Cambridge International AS & A Level: Mathematics (9709), Physics (9702) and Computer Science (9618). Topics follow the official syllabus structure.' },
  { q: 'Where do the questions come from?', a: 'They are cropped from real CIE past papers and sorted by syllabus topic, with the matching mark scheme alongside. We do not invent exam questions.' },
  { q: 'Where do the past papers come from?', a: 'The papers page links out to PapaCambridge, which hosts question papers, mark schemes and examiner reports. We never re-host full PDFs; we just organise the links.' },
  { q: 'What about the AI coach?', a: 'It is coming soon and nothing AI runs on the site yet. You can join the waitlist from the Coach page once you are in.' },
  { q: 'Are you affiliated with Cambridge?', a: 'No. This is an independent study tool and is not endorsed by Cambridge University Press & Assessment.' },
]

export default function FAQ() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Quick answers." className="bg-surface-2/50 border-t border-border">
      <div className="max-w-3xl space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="group card px-5 py-1 open:shadow-lift">
            <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none font-display font-bold text-ink focus-ring rounded-control [&::-webkit-details-marker]:hidden">
              {f.q}
              <ChevronDown className="w-5 h-5 text-ink-3 shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden />
            </summary>
            <p className="text-ink-2 leading-relaxed pb-4 -mt-1">
              {f.a}{' '}
              {f.q.startsWith('Where do the past') && (
                <a className="text-flame-strong dark:text-flame underline underline-offset-2 font-bold" href="https://pastpapers.papacambridge.com/" target="_blank" rel="noreferrer">Visit PapaCambridge</a>
              )}
            </p>
          </details>
        ))}
      </div>
    </Section>
  )
}
