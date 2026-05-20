/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6366F1',
          secondary: '#818CF8',
          cta: '#10B981',
          bg: '#F5F3FF',
          text: '#1E1B4B',
          dark: '#312E81',
        },
      },
      fontFamily: {
        heading: ['"Crimson Pro"', 'Georgia', 'serif'],
        body: ['"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
