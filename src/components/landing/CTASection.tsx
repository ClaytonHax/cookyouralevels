import { ArrowRight } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function CTASection() {
  const { openAuth } = useAuth()

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-primary/20 rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-4">
          Start cooking your A Levels today.
        </h2>
        <p className="font-body text-lg text-indigo-200 mb-10 max-w-md mx-auto">
          Free to use. No credit card. Sign up with your email and get practising immediately.
        </p>
        <button
          onClick={openAuth}
          className="inline-flex items-center gap-3 px-8 py-4 bg-brand-cta hover:bg-emerald-600 text-white font-body font-bold text-base rounded-2xl transition-colors duration-150 cursor-pointer"
        >
          Sign in
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}
