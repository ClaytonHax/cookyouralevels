import { FileText, CheckCircle, Brain, Zap, Target } from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Topical Past Papers',
    description: 'Questions organised by topic, not by year. Drill exactly what you need, when you need it.',
    iconStyle: 'text-brand-primary bg-brand-primary/10',
    soon: false,
  },
  {
    icon: CheckCircle,
    title: 'Worked Solutions',
    description: 'Full mark-scheme solutions with step-by-step working shown for every single question.',
    iconStyle: 'text-brand-cta bg-brand-cta/10',
    soon: false,
  },
  {
    icon: Brain,
    title: 'AI Paper Marking',
    description: 'Upload a photo of your handwritten answer and get instant, detailed feedback.',
    iconStyle: 'text-purple-500 bg-purple-100',
    soon: true,
  },
  {
    icon: Zap,
    title: 'AI Question Generation',
    description: 'Get fresh practice questions generated on any topic, at any difficulty level.',
    iconStyle: 'text-amber-500 bg-amber-100',
    soon: true,
  },
  {
    icon: Target,
    title: 'Weak Topic Finder',
    description: 'Your attempt history surfaces exactly which topics need the most work.',
    iconStyle: 'text-rose-500 bg-rose-100',
    soon: true,
  },
]

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-brand-text mb-4">
            Everything you need to ace your A Levels
          </h2>
          <p className="font-body text-lg text-slate-500 max-w-xl mx-auto">
            Built specifically for Cambridge CIE students, with AI features rolling out shortly.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="relative p-6 rounded-2xl border border-slate-100 hover:border-brand-primary/30 hover:shadow-md transition-all duration-200 cursor-default"
              >
                {feature.soon && (
                  <span className="absolute top-4 right-4 text-[10px] font-body font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
                    Coming soon
                  </span>
                )}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${feature.iconStyle}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-body font-bold text-brand-text text-base mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
