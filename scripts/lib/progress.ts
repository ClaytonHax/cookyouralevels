import fs from 'fs'
import path from 'path'

const PROGRESS_FILE = path.resolve('scripts/.progress.json')

interface Progress {
  fetched: string[]     // paperIds whose PDFs are downloaded
  extracted: string[]   // paperIds whose questions are extracted
  classified: string[]  // paperIds whose questions have topicIds
  uploaded: string[]    // paperIds uploaded to Firestore
  syllabuses: string[]  // subjectIds whose syllabuses are processed
}

function load(): Progress {
  if (!fs.existsSync(PROGRESS_FILE)) {
    return { fetched: [], extracted: [], classified: [], uploaded: [], syllabuses: [] }
  }
  return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'))
}

function save(p: Progress): void {
  fs.mkdirSync(path.dirname(PROGRESS_FILE), { recursive: true })
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(p, null, 2))
}

export function isDone(stage: keyof Progress, id: string): boolean {
  return load()[stage].includes(id)
}

export function markDone(stage: keyof Progress, id: string): void {
  const p = load()
  if (!p[stage].includes(id)) {
    p[stage].push(id)
    save(p)
  }
}

export function getAll(stage: keyof Progress): string[] {
  return load()[stage]
}
