import { addGradeSubject, updateGradeSubject } from '../../lib/userStore'
import type { GradeSubject } from '../../lib/userStore'
import type { SubjectTheme } from '../../lib/subjects'

/** Find the grades-tracker subject that represents a CYAL subject (matched by syllabus code). */
export function findGradeSubject(list: GradeSubject[], s: SubjectTheme): GradeSubject | undefined {
  return list.find((g) => g.code === s.code)
}

/** Create or update the target grade of a subject (stored as a grades-tracker subject). Empty target does nothing for new ones. */
export function saveTarget(list: GradeSubject[], s: SubjectTheme, target: string): void {
  const existing = findGradeSubject(list, s)
  if (existing) {
    if (existing.target !== target) void updateGradeSubject(existing.id, { target })
  } else if (target) {
    addGradeSubject({ name: s.name, code: s.code, target })
  }
}
