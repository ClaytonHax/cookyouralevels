import { GRADE_COLORS, GRADE_TEXT } from '../grades'

const SIZES = {
  sm: 'w-10 h-10 text-base',
  md: 'w-12 h-12 text-lg',
  lg: 'w-16 h-16 text-2xl',
  xl: 'w-24 h-24 text-4xl',
}

export default function GradeBadge({ grade, size = 'md', label, className = '', style }) {
  return (
    <span
      className={`badge-grade ${SIZES[size]} ${className}`}
      style={{
        backgroundColor: grade ? GRADE_COLORS[grade] : '#E5D3DD',
        color: grade ? GRADE_TEXT[grade] : '#831843',
        ...style,
      }}
      role="img"
      aria-label={label || (grade ? `Grade ${grade}` : 'No grade yet')}
    >
      {grade || '–'}
    </span>
  )
}
