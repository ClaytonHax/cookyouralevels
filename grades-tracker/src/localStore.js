// On-device store with the same shape as firestore.js, used when Firebase isn't configured
const KEY = 'zishao-local-v1'
const listeners = new Set()

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { subjects: [], grades: {} }
  } catch {
    return { subjects: [], grades: {} }
  }
}

function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    // storage full or blocked — keep working in memory
  }
  memory = data
  listeners.forEach((fn) => fn())
}

let memory = load()
const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36)

function listen(fn) {
  listeners.add(fn)
  queueMicrotask(fn)
  return () => listeners.delete(fn)
}

export function subscribeSubjects(_uid, cb) {
  return listen(() => cb([...memory.subjects].sort((a, b) => a.name.localeCompare(b.name))))
}

export function subscribeSubject(_uid, id, cb) {
  return listen(() => cb(memory.subjects.find((s) => s.id === id) || null))
}

export function subscribeGrades(_uid, subjectId, cb) {
  return listen(() =>
    cb([...(memory.grades[subjectId] || [])].sort((a, b) => String(b.date).localeCompare(String(a.date))))
  )
}

export async function addSubject(_uid, { name, syllabus, target }) {
  const s = { id: uid(), name, syllabus: syllabus || '', target: target || 'A', createdAt: Date.now() }
  save({ ...memory, subjects: [...memory.subjects, s] })
  return s
}

export async function updateSubject(_uid, id, data) {
  save({ ...memory, subjects: memory.subjects.map((s) => (s.id === id ? { ...s, ...data } : s)) })
}

export async function deleteSubject(_uid, id) {
  const grades = { ...memory.grades }
  delete grades[id]
  save({ subjects: memory.subjects.filter((s) => s.id !== id), grades })
}

export async function addGrade(_uid, subjectId, { title, type, grade, weight, date }) {
  const g = { id: uid(), title, type, grade, weight: Number(weight) || 0, date, createdAt: Date.now() }
  save({ ...memory, grades: { ...memory.grades, [subjectId]: [...(memory.grades[subjectId] || []), g] } })
  return g
}

export async function updateGrade(_uid, subjectId, id, data) {
  const list = (memory.grades[subjectId] || []).map((g) =>
    g.id === id ? { ...g, ...data, weight: Number(data.weight ?? g.weight) || 0 } : g
  )
  save({ ...memory, grades: { ...memory.grades, [subjectId]: list } })
}

export async function deleteGrade(_uid, subjectId, id) {
  const list = (memory.grades[subjectId] || []).filter((g) => g.id !== id)
  save({ ...memory, grades: { ...memory.grades, [subjectId]: list } })
}

export function clearLocalData() {
  save({ subjects: [], grades: {} })
}

export async function seedSampleData() {
  const day = (n) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10)
  const sample = [
    ['Mathematics', '9709', 'A*', [['Pure 1 test', 'Test', 'B', 1, 70], ['Stats homework', 'Assignment', 'A', 0.5, 50], ['Mechanics mock', 'Mock Exam', 'A', 2, 28], ['Pure 3 test', 'Test', 'A*', 1, 6]]],
    ['Chemistry', '9701', 'A', [['Organic quiz', 'Test', 'C', 1, 62], ['Practical write-up', 'Assignment', 'B', 1, 40], ['Paper 2 mock', 'Mock Exam', 'B', 2, 12]]],
    ['English Literature', '9695', 'B', [['Poetry essay', 'Assignment', 'B', 1, 55], ['Drama test', 'Test', 'A', 1, 20]]],
  ]
  for (const [name, syllabus, target, grades] of sample) {
    const s = await addSubject(null, { name, syllabus, target })
    for (const [title, type, grade, weight, ago] of grades) {
      await addGrade(null, s.id, { title, type, grade, weight, date: day(ago) })
    }
  }
}
