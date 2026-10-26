import { ArrowRight, UserRound } from 'lucide-react'
import { Button } from '../ui'
import Reveal from './Reveal'
import { useStart } from './useStart'

export default function CTASection() {
  const { openAuth, tryAsGuest } = useStart()
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="rounded-[22px] bg-ink text-bg px-6 py-12 sm:px-12 text-center relative overflow-hidden">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_120%,rgb(var(--flame)/0.45),transparent_70%)]" />
            <div className="relative">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">Ready to cook your A Levels?</h2>
              <p className="mt-3 text-bg/75 max-w-lg mx-auto">Pick your subjects, rate the syllabus and get your first topic done tonight.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
                <Button size="lg" onClick={openAuth} rightIcon={<ArrowRight className="w-4 h-4" />}>Start revising, free</Button>
                <Button size="lg" variant="secondary" onClick={tryAsGuest} leftIcon={<UserRound className="w-4 h-4" />}>Try without an account</Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
