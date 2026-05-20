import 'dotenv/config'
import fs from 'fs'
import path from 'path'

const REQUIRED_ENV = ['ANTHROPIC_API_KEY', 'GOOGLE_APPLICATION_CREDENTIALS', 'FIREBASE_STORAGE_BUCKET']

const DIRS = [
  'scripts/data/syllabuses',
  'scripts/data/papers/mathematics',
  'scripts/data/papers/physics',
  'scripts/data/papers/computer-science',
  'scripts/data/extracted/mathematics',
  'scripts/data/extracted/physics',
  'scripts/data/extracted/computer-science',
  'scripts/data/classified/mathematics',
  'scripts/data/classified/physics',
  'scripts/data/classified/computer-science',
]

console.log('🔧 Setting up Cook Your A Levels ingest pipeline\n')

// Check env vars
let ok = true
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(`  ✗ Missing ${key}`)
    ok = false
  } else {
    console.log(`  ✓ ${key}`)
  }
}

if (!ok) {
  console.error('\nCopy scripts/.env.example to scripts/.env and fill in values.')
  process.exit(1)
}

// Check service account file exists
const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS!
if (!fs.existsSync(path.resolve(credPath))) {
  console.error(`\n✗ Service account file not found: ${credPath}`)
  process.exit(1)
}
console.log(`  ✓ Service account file found`)

// Create data directories
console.log('\n📁 Creating data directories...')
for (const dir of DIRS) {
  fs.mkdirSync(path.resolve(dir), { recursive: true })
  console.log(`  ✓ ${dir}`)
}

// Initialise empty progress file if missing
const progressFile = path.resolve('scripts/.progress.json')
if (!fs.existsSync(progressFile)) {
  fs.writeFileSync(progressFile, JSON.stringify({
    fetched: [], extracted: [], classified: [], uploaded: [], syllabuses: [],
  }, null, 2))
  console.log('\n  ✓ Created .progress.json')
}

console.log('\n✅ Setup complete. Run scripts in order: 1-syllabus → 2-papers → 3-extract → 4-classify → 5-upload')
