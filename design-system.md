# Zishao Grades — Design System

## Style
Soft UI Evolution: subtle depth, soft shadows (not pure neumorphism), WCAG AA contrast, 200–300ms transitions.

## Palette
- Primary: #F472B6 (pink-400)
- Secondary: #FBCFE8 (pink-200)
- CTA: #22C55E (green-500)
- Background: #FDF2F8 (pink-50)
- Text: #831843 (pink-900)
- Primary actions: gradient #BE185D → #831843 with white text (AA). #F472B6 is an accent only — white text on it fails contrast.
- Surfaces: #FFFFFF with shadow `8px 8px 16px #f3d4e3, -8px -8px 16px #ffffff`
- Inset (inputs): `inset 4px 4px 8px #f3d4e3, inset -4px -4px 8px #ffffff`

## Grade colours (Cambridge)
A* #15803D · A #4ADE80 · B #FACC15 · C #FB923C · D #F87171 · E #DC2626 · U #6B7280
Light coins (A–D) use dark text from `GRADE_TEXT` in `src/grades.js`; A*, E, U use white.

## Typography
- Display: Varela Round
- Body: Nunito Sans (300–700)
- Import: `@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Varela+Round&display=swap');`

## Radius / spacing
Radius: 1rem cards, 0.75rem buttons/inputs, full for badges. Spacing on 4px grid.

## Voice
Encouraging, plain, student-friendly. No jargon.

## Signature moves
1. Soft-shadow subject cards with an inset grade-badge "coin" per grade.
2. Progress bar from current average to target grade, coloured by gap.