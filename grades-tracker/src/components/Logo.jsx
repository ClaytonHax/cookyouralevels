export default function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F9A8D4" />
          <stop offset="100%" stopColor="#BE185D" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#logo-g)" />
      <path d="M8 17 20 11l12 6-12 6z" fill="#fff" />
      <path d="M13 20v5c0 2 3.2 3.5 7 3.5s7-1.5 7-3.5v-5l-7 3.5z" fill="#fff" opacity=".85" />
      <path d="M32 17v6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
