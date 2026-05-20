import 'dotenv/config'
import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import { isDone, markDone } from '../lib/progress.ts'
import type { PaperManifestEntry, Session } from '../lib/types.ts'

const YEAR_RANGE = { from: 2015, to: 2024 }

const SUBJECTS = [
  { subjectId: 'mathematics',       code: '9709' },
  { subjectId: 'physics',           code: '9702' },
  { subjectId: 'computer-science',  code: '9618' },
]

// papacambridge filename pattern: 9709_s23_qp_11.pdf
// session codes: s=may-june, w=oct-nov, m=feb-march
const SESSION_MAP: Record<string, Session> = {
  s: 'may-june',
  w: 'oct-nov',
  m: 'feb-march',
}

function parsePaperFilename(filename: string): {
  code: string
  session: Session
  year: number
  type: 'qp' | 'ms'
  paperNumber: number
  variant: number
} | null {
  const m = filename.match(/^(\d{4})_([smw])(\d{2})_(qp|ms)_(\d)(\d)\.pdf$/i)
  if (!m) return null
  const [, code, sessionChar, yearSuffix, type, paperStr, variantStr] = m
  const session = SESSION_MAP[sessionChar.toLowerCase()]
  if (!session) return null
  const year = 2000 + parseInt(yearSuffix, 10)
  if (year < YEAR_RANGE.from || year > YEAR_RANGE.to) return null
  return {
    code,
    session,
    year,
    type: type.toLowerCase() as 'qp' | 'ms',
    paperNumber: parseInt(paperStr, 10),
    variant: parseInt(variantStr, 10),
  }
}

function makePaperId(subjectId: string, year: number, session: Session, paperNumber: number, variant: number): string {
  return `${subjectId}-${year}-${session}-p${paperNumber}v${variant}`
}

async function downloadFile(url: string, dest: string): Promise<void> {
  const response = await axios.get(url, { responseType: 'arraybuffer', timeout: 60_000 })
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.writeFileSync(dest, Buffer.from(response.data))
}

async function delay(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms))
}

async function scrapePaperLinks(code: string): Promise<{ filename: string; url: string }[]> {
  // papacambridge organises papers at a URL like:
  // https://papacambridge.com/past-papers/cambridge-international-as-a-level/9709/
  const baseUrl = `https://papacambridge.com/past-papers/cambridge-international-as-a-level/${code}/`
  console.log(`  🌐 Scraping ${baseUrl}`)

  const { data: html } = await axios.get(baseUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CookYourALevels/1.0)' },
    timeout: 30_000,
  })
  const $ = cheerio.load(html)

  const links: { filename: string; url: string }[] = []
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') ?? ''
    const filename = href.split('/').pop() ?? ''
    if (/^\d{4}_[smw]\d{2}_(qp|ms)_\d\d\.pdf$/i.test(filename)) {
      links.push({
        filename,
        url: href.startsWith('http') ? href : `https://papacambridge.com${href}`,
      })
    }
  })

  // De-duplicate
  const seen = new Set<string>()
  return links.filter(l => {
    if (seen.has(l.filename)) return false
    seen.add(l.filename)
    return true
  })
}

async function fetchSubjectPapers(subjectId: string, code: string): Promise<void> {
  const manifestPath = path.resolve(`scripts/data/papers/${subjectId}-manifest.json`)
  const manifest: PaperManifestEntry[] = []

  const links = await scrapePaperLinks(code)
  console.log(`  Found ${links.length} paper links`)

  // Group QP + MS by paperId
  const byPaper = new Map<string, { qp?: string; ms?: string; qpUrl?: string; msUrl?: string; meta: ReturnType<typeof parsePaperFilename> }>()

  for (const { filename, url } of links) {
    const meta = parsePaperFilename(filename)
    if (!meta || meta.code !== code) continue

    const paperId = makePaperId(subjectId, meta.year, meta.session, meta.paperNumber, meta.variant)
    const entry = byPaper.get(paperId) ?? { meta }
    if (meta.type === 'qp') {
      entry.qp = filename
      entry.qpUrl = url
    } else {
      entry.ms = filename
      entry.msUrl = url
    }
    byPaper.set(paperId, entry)
  }

  console.log(`  ${byPaper.size} unique papers`)

  for (const [paperId, { qp, ms, qpUrl, msUrl, meta }] of byPaper) {
    if (!meta || !qp || !ms || !qpUrl || !msUrl) {
      console.log(`  ⚠  ${paperId}: missing QP or MS, skipping`)
      continue
    }

    if (isDone('fetched', paperId)) {
      process.stdout.write('.')
      continue
    }

    const qpDest = path.resolve(`scripts/data/papers/${subjectId}/${paperId}.pdf`)
    const msDest = path.resolve(`scripts/data/papers/${subjectId}/${paperId}-ms.pdf`)

    try {
      await downloadFile(qpUrl, qpDest)
      await delay(1500)
      await downloadFile(msUrl, msDest)
      await delay(1500)

      manifest.push({
        paperId,
        subjectId,
        year: meta.year,
        session: meta.session,
        paperNumber: meta.paperNumber,
        variant: meta.variant,
        level: meta.paperNumber <= 2 ? 'AS' : 'A2',
        qpFile: `papers/${subjectId}/${paperId}.pdf`,
        msFile: `papers/${subjectId}/${paperId}-ms.pdf`,
      })

      markDone('fetched', paperId)
      process.stdout.write(`\n  ↓  ${paperId}`)
    } catch (err) {
      console.warn(`\n  ✗  ${paperId}: ${(err as Error).message}`)
    }
  }

  // Merge with existing manifest
  let existing: PaperManifestEntry[] = []
  if (fs.existsSync(manifestPath)) {
    existing = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
  }
  const merged = [...existing]
  for (const e of manifest) {
    if (!merged.find(m => m.paperId === e.paperId)) merged.push(e)
  }
  fs.writeFileSync(manifestPath, JSON.stringify(merged, null, 2))
  console.log(`\n  ✅ ${subjectId}: ${merged.length} papers in manifest`)
}

console.log('📄 Fetching past papers from papacambridge...\n')
for (const { subjectId, code } of SUBJECTS) {
  console.log(`\n── ${subjectId} (${code}) ──`)
  await fetchSubjectPapers(subjectId, code)
}
console.log('\n✅ All papers fetched.')
