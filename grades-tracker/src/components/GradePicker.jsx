import { GRADES, GRADE_COLORS, GRADE_TEXT } from '../grades'

// Radio group of grade "coins" — keyboard arrows work natively
export default function GradePicker({ name, value, onChange, legend }) {
  return (
    <fieldset>
      <legend className="label-soft">{legend}</legend>
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {GRADES.map((g) => {
          const checked = value === g
          return (
            <label key={g} className="relative cursor-pointer">
              <input
                type="radio"
                name={name}
                value={g}
                checked={checked}
                onChange={() => onChange(g)}
                className="peer sr-only"
              />
              <span
                className={`flex items-center justify-center aspect-square rounded-full font-display text-sm sm:text-base transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-strong peer-focus-visible:ring-offset-2 ${
                  checked ? 'shadow-glow scale-105 ring-2 ring-white' : 'shadow-softsm opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: GRADE_COLORS[g], color: GRADE_TEXT[g] }}
              >
                {g}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
