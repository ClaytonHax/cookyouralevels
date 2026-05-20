import 'dotenv/config'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { callVision, extractJson } from '../lib/claude.ts'
import { pdfToImages } from '../lib/pdf.ts'
import { isDone, markDone } from '../lib/progress.ts'
import type { Syllabus } from '../lib/types.ts'

// Cambridge CIE syllabus PDF URLs (stable direct downloads for 2023-2025 specs)
const SYLLABUSES = [
  {
    subjectId: 'mathematics',
    code: '9709',
    url: 'https://www.cambridgeinternational.org/Images/597416-2023-2025-syllabus.pdf',
  },
  {
    subjectId: 'physics',
    code: '9702',
    url: 'https://www.cambridgeinternational.org/Images/554625-2022-2024-syllabus.pdf',
  },
  {
    subjectId: 'computer-science',
    code: '9618',
    url: 'https://www.cambridgeinternational.org/Images/554614-2021-2023-syllabus.pdf',
  },
]

const SYSTEM = `You are extracting the topic/component structure from a Cambridge CIE A Level syllabus PDF.
Return ONLY valid JSON, no prose. Never use markdown fences.`

const USER = `Extract the full topic hierarchy from these syllabus pages.
Return JSON exactly matching this schema:
{
  "subject": "<subject name>",
  "code": "<syllabus code>",
  "components": [
    {
      "id": "<kebab-case id>",
      "name": "<component name>",
      "paperNumber": <number>,
      "level": "AS" or "A2",
      "topics": [
        { "id": "<kebab-case id>", "name": "<topic name>", "order": <number> }
      ]
    }
  ]
}

Rules:
- Component IDs: use lowercase kebab-case of the component name (e.g. "pure-mathematics-1" → "pure1")
- Topic IDs: prefix with component id, e.g. "pure1-quadratics"
- Include ALL topics listed in the syllabus content section
- level is "AS" for AS Level components, "A2" for A Level only components`

async function fetchSyllabus(entry: typeof SYLLABUSES[0]): Promise<void> {
  const { subjectId, code, url } = entry
  const outFile = path.resolve(`scripts/data/syllabuses/${subjectId}.json`)

  if (isDone('syllabuses', subjectId)) {
    console.log(`  ⏭  ${subjectId} — already done`)
    return
  }

  console.log(`  ↓  Downloading ${subjectId} syllabus...`)
  const pdfPath = path.resolve(`scripts/data/syllabuses/${subjectId}-syllabus.pdf`)
  const response = await axios.get(url, { responseType: 'arraybuffer' })
  fs.writeFileSync(pdfPath, Buffer.from(response.data))
  console.log(`     Saved to ${pdfPath}`)

  console.log(`  🖼  Converting to images...`)
  const imgDir = path.resolve(`scripts/data/syllabuses/${subjectId}-pages`)
  const pages = await pdfToImages(pdfPath, imgDir)
  console.log(`     ${pages.length} pages`)

  // Send pages in batches of 5 to stay under token limits
  // Focus on content pages (skip cover/TOC — usually pages 1-4)
  const contentPages = pages.slice(3)
  const batchSize = 5
  const allComponents: Syllabus['components'] = []

  for (let i = 0; i < contentPages.length; i += batchSize) {
    const batch = contentPages.slice(i, i + batchSize)
    console.log(`  🤖 Claude Vision: pages ${i + 4}–${i + 3 + batch.length}...`)
    const raw = await callVision(
      batch.map(p => p.filePath),
      SYSTEM,
      `${USER}\n\nThis is pages ${i + 4} to ${i + 3 + batch.length} of the ${code} syllabus.`,
    )

    try {
      const parsed = extractJson<{ components?: Syllabus['components'] }>(raw)
      if (parsed.components) {
        for (const comp of parsed.components) {
          const existing = allComponents.find(c => c.id === comp.id)
          if (existing) {
            // Merge topics
            for (const t of comp.topics) {
              if (!existing.topics.find(et => et.id === t.id)) {
                existing.topics.push(t)
              }
            }
          } else {
            allComponents.push(comp)
          }
        }
      }
    } catch {
      console.warn(`     ⚠ Could not parse JSON from pages ${i + 4}–${i + 3 + batch.length}, skipping`)
    }
  }

  const syllabus: Syllabus = { subject: subjectId, code, components: allComponents }
  fs.writeFileSync(outFile, JSON.stringify(syllabus, null, 2))
  markDone('syllabuses', subjectId)
  console.log(`  ✅ ${subjectId}: ${allComponents.length} components, ${allComponents.reduce((n, c) => n + c.topics.length, 0)} topics`)
}

console.log('📚 Fetching syllabuses...\n')
for (const entry of SYLLABUSES) {
  await fetchSyllabus(entry)
}
console.log('\n✅ All syllabuses done.')
