/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: v('bg'),
        surface: { DEFAULT: v('surface'), 2: v('surface-2') },
        border: v('border'),
        ink: { DEFAULT: v('ink'), 2: v('ink-2'), 3: v('ink-3') },
        flame: { DEFAULT: v('flame'), strong: v('flame-strong'), soft: v('flame-soft') },
        maths: { DEFAULT: v('maths'), soft: v('maths-soft') },
        physics: { DEFAULT: v('physics'), soft: v('physics-soft') },
        cs: { DEFAULT: v('cs'), soft: v('cs-soft') },
        conf: { red: v('conf-red'), amber: v('conf-amber'), green: v('conf-green') },
        // Legacy tokens, mapped onto the new system so unmigrated screens keep working.
        brand: {
          primary: v('flame-strong'),
          secondary: v('flame'),
          cta: v('flame-strong'),
          bg: v('bg'),
          text: v('ink'),
          dark: '#1C1917',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        heading: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: { card: '14px', control: '10px' },
      boxShadow: {
        soft: '0 1px 2px rgb(0 0 0 / .04), 0 4px 16px rgb(0 0 0 / .04)',
        lift: '0 2px 4px rgb(0 0 0 / .06), 0 12px 32px rgb(0 0 0 / .08)',
      },
      transitionTimingFunction: { out: 'cubic-bezier(.2,.7,.2,1)' },
      keyframes: {
        'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } },
        'pop-in': { from: { opacity: 0, transform: 'translateY(6px) scale(.98)' }, to: { opacity: 1, transform: 'none' } },
        'sheet-in': { from: { transform: 'translateY(100%)' }, to: { transform: 'none' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        'fade-in': 'fade-in .18s ease-out both',
        'pop-in': 'pop-in .2s cubic-bezier(.2,.7,.2,1) both',
        'sheet-in': 'sheet-in .25s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
}
