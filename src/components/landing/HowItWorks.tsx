const steps = [
  {
    number: '01',
    title: 'Sign in with Google',
    description: 'One click to get started. No passwords, no forms — just your Google account.',
  },
  {
    number: '02',
    title: 'Choose your subject',
    description: 'Pick from Maths, Physics, or Computer Science. Select AS or A Level topics.',
  },
  {
    number: '03',
    title: 'Practice & improve',
    description: 'Work through topical questions, review full solutions, and track your progress.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-brand-text mb-4">
            How it works
          </h2>
          <p className="font-body text-lg text-slate-500">
            Get started in under 30 seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-16">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-brand-primary text-white font-body font-bold text-xl rounded-2xl flex items-center justify-center">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-brand-primary/15 -translate-y-1/2 ml-4" />
                )}
              </div>
              <h3 className="font-body font-bold text-brand-text text-lg mb-3">
                {step.title}
              </h3>
              <p className="font-body text-sm text-slate-500 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
