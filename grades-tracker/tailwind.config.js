/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F472B6',
        'primary-strong': '#BE185D',
        secondary: '#FBCFE8',
        cta: '#16A34A',
        surface: '#FDF2F8',
        ink: '#831843',
      },
      fontFamily: {
        display: ['"Varela Round"', 'sans-serif'],
        body: ['"Nunito Sans"', 'sans-serif'],
      },
      boxShadow: {
        soft: '8px 8px 20px #f3d4e3, -8px -8px 20px #ffffff',
        softsm: '4px 4px 10px #f3d4e3, -4px -4px 10px #ffffff',
        lift: '0 18px 40px -12px rgba(190, 24, 93, 0.28)',
        glow: '0 10px 24px -8px rgba(190, 24, 93, 0.55)',
        inset: 'inset 4px 4px 8px #f3d4e3, inset -4px -4px 8px #ffffff',
      },
      borderRadius: {
        card: '1.25rem',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.6)', opacity: 0 },
          '70%': { transform: 'scale(1.08)', opacity: 1 },
          '100%': { transform: 'scale(1)' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% 0' },
          to: { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.35s ease-out both',
        pop: 'pop 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.2) both',
        shimmer: 'shimmer 1.6s linear infinite',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
