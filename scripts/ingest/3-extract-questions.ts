import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import katex from 'katex'
import { callVision, extractJson } from '../lib/claude.ts'
import { pdfToImages, resolveDataPath } from '../lib/pdf.ts'
import { isDone, markDone } from '../lib/progress.ts'
import type { PaperManifestEntry, RawQuestion, RawPart, ExtractedQuestion } from '../lib/types.ts'

const QP_SYSTEM = `You are extracting exam questions from a Cambridge CIE A Level past paper.
Return ONLY valid JSON, no prose, no markdown fences.`

function qpUserPrompt(pageLabel: string): string {
  return `Extract ALL questions that START on ${pageLabel}.
Return a JSON array of question objects:
[
  {
    "questionNumber": 1,
    "parts": [
      {
        "partLabel": "a",
        "marks": 3,
        "content": "KaTeX-mixed text of the question. Inline math: $...$, display math: $$...$$",
        "hasDiagram": false,
        "diagramBoundingBox": null,
        "continuesOnNextPage": false
      }
    ]
  }
]

Rules:
- partLabel is null for questions with no lettered parts
- Use KaTeX-compatible LaTeX inside $ for inline and $$ for display math
- Preserve ALL mathematical notation, symbols, subscripts, superscripts exactly
- Include the marks value [N] at the END of content as part of the text
- For diagrams/graphs/figures: set hasDiagram true and diagramBoundingBox as {x, y, w, h} where values are fractions 0-1 of the page dimensions
- If a question/part continues on the next page: set continuesOnNextPage true on the LAST part
- Skip any instructions pages or formulae lists — only return actual exam questions`
}

const MS_SYSTEM = `You are extracting mark scheme answers from a Cambridge CIE A Level mark scheme.
Return ONLY valid JSON, no prose, no markdown fences.`

const MS_USER = `Extract the mark scheme for all questions on this page.
Return a JSON array:
[
  {
    "questionNumber": 1,
    "partLabel": "a",
    "markScheme": "KaTeX-mixed text of the mark scheme answer",
    "hasDiagram": false,
    "diagramBoundingBox": null
  }
]
Rules:
- Use same KaTeX conventions as question papers ($...$ inline, $$...$$ display)
- Include mark allocation notes (B1, M1, A1 etc.) as plain text
- partLabel is null for questions with no parts`

function validateLatex(content: string): boolean {
  // Extract all $...$ and $$...$$ segments and validate each
  const segments = [...content.matchAll(/\$\$?([\s\S]+?)\$\$?/g)]
  for (const [, latex] of segments) {
    try {
      katex.renderToString(latex, { throwOnError: true })
    } catch {
      return false
    }
  }
  return true
}

async function cropDiagram(
  pageFile: string,
  bbox: { x: number; y: number; w: number; h: number },
  outputFile: string,
): Promise<void> {
  const meta = await sharp(pageFile).metadata()
  const pw = meta.width ?? 2480
  const ph = meta.height ?? 3508
  await sharp(pageFile)
    .extract({
      left: Math.round(bbox.x * pw),
      top: Math.round(bbox.y * ph),
      width: Math.round(bbox.w * pw),
      height: Math.round(bbox.h * ph),
    })
    .toFile(outputFile)
}

async function extractFromPdf(
  pdfPath: string,
  pagesDir: string,
  isMarkScheme: boolean,
): Promise<{ page: number; raw: unknown[] }[]> {
  const pages = await pdfToImages(pdfPath, pagesDir)
  const results: { page: number; raw: unknown[] }[] = []

  for (let i = 0; i < pages.length; i++) {
    const current = pages[i]
    const next = pages[i + 1]
    const imagePaths = next ? [current.filePath, next.filePath] : [current.filePath]
    const pageLabel = next
      ? `page ${current.pageNumber} (page ${next.pageNumber} shown as context)`
      : `page ${current.pageNumber}`

    try {
      const raw = await callVision(
        imagePaths,
        isMarkScheme ? MS_SYSTEM : QP_SYSTEM,
        isMarkScheme ? MS_USER : qpUserPrompt(pageLabel),
      )
      const parsed = extractJson<unknown[]>(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        results.push({ page: current.pageNumber, raw: parsed })
      }
    } catch {
      console.warn(`     ⚠ Page ${current.pageNumber}: parse error, skipping`)
    }
  }
  return results
}

function flattenQP(
  entry: PaperManifestEntry,
  rawPages: { page: number; raw: unknown[] }[],
  pagesDir: string,
): { questions: Partial<ExtractedQuestion>[]; pendingCrops: { file: string; bbox: { x: number; y: number; w: number; h: number }; pageFile: string }[] } {
  const questions: Partial<ExtractedQuestion>[] = []
  const pendingCrops: { file: string; bbox: { x: number; y: number; w: number; h: number }; pageFile: string }[] = []

  // Track continuation fragments
  const pendingContinuation = new Map<string, Partial<ExtractedQuestion>>()

  for (const { page, raw } of rawPages) {
    const pageFile = path.join(pagesDir, `page.${String(page).padStart(4, '0')}.png`)

    for (const rq of raw as RawQuestion[]) {
      for (const part of rq.parts) {
        const key = `${rq.questionNumber}-${part.partLabel ?? 'main'}`
        const existingFrag = pendingContinuation.get(key)

        const qId = `${entry.paperId}-q${rq.questionNumber}-${part.partLabel ?? 'main'}`

        let diagramPageFile: string | undefined
        if (part.hasDiagram && part.diagramBoundingBox) {
          diagramPageFile = path.join(pagesDir, `q${rq.questionNumber}-${part.partLabel ?? 'main'}-diagram.png`)
          pendingCrops.push({ file: diagramPageFile, bbox: part.diagramBoundingBox, pageFile })
        }

        const q: Partial<ExtractedQuestion> = {
          id: qId,
          paperId: entry.paperId,
          subjectId: entry.subjectId,
          year: entry.year,
          session: entry.session,
          paperNumber: entry.paperNumber,
          variant: entry.variant,
          level: entry.level,
          questionNumber: rq.questionNumber,
          partLabel: part.partLabel ?? undefined,
          marks: part.marks,
          content: existingFrag ? `${existingFrag.content ?? ''} ${part.content}`.trim() : part.content,
          hasDiagram: part.hasDiagram || !!(existingFrag?.hasDiagram),
          diagramPageFile: diagramPageFile ?? existingFrag?.diagramPageFile,
          markScheme: '',
          markSchemeHasDiagram: false,
          latexValid: validateLatex(part.content),
        }

        if (part.continuesOnNextPage) {
          pendingContinuation.set(key, q)
        } else {
          pendingContinuation.delete(key)
          questions.push(q)
        }
      }
    }
  }

  // Add any remaining continuations that never resolved
  for (const q of pendingContinuation.values()) {
    questions.push(q)
  }

  return { questions, pendingCrops }
}

function mergeMarkScheme(
  questions: Partial<ExtractedQuestion>[],
  msPages: { page: number; raw: unknown[] }[],
): void {
  const msMap = new Map<string, { markScheme: string; hasDiagram: boolean }>()
  for (const { raw } of msPages) {
    for (const item of raw as { questionNumber: number; partLabel: string | null; markScheme: string; hasDiagram: boolean }[]) {
      const key = `${item.questionNumber}-${item.partLabel ?? 'main'}`
      msMap.set(key, { markScheme: item.markScheme, hasDiagram: item.hasDiagram })
    }
  }

  for (const q of questions) {
    const key = `${q.questionNumber}-${q.partLabel ?? 'main'}`
    const ms = msMap.get(key)
    if (ms) {
      q.markScheme = ms.markScheme
      q.markSchemeHasDiagram = ms.hasDiagram
    }
  }
}

async function processPaper(entry: PaperManifestEntry): Promise<void> {
  const { paperId, subjectId } = entry

  if (isDone('extracted', paperId)) {
    process.stdout.write('.')
    return
  }

  const qpPath = resolveDataPath(entry.qpFile)
  const msPath = resolveDataPath(entry.msFile)

  if (!fs.existsSync(qpPath) || !fs.existsSync(msPath)) {
    console.warn(`\n  ⚠  ${paperId}: PDF files missing, run 2-fetch-papers first`)
    return
  }

  console.log(`\n  📄 ${paperId}`)

  const pagesDir = resolveDataPath(`extracted/${subjectId}/${paperId}`)
  const msPagesDir = resolveDataPath(`extracted/${subjectId}/${paperId}-ms`)
  fs.mkdirSync(pagesDir, { recursive: true })
  fs.mkdirSync(msPagesDir, { recursive: true })

  const [qpRaw, msRaw] = await Promise.all([
    extractFromPdf(qpPath, pagesDir, false),
    extractFromPdf(msPath, msPagesDir, true),
  ])

  const { questions, pendingCrops } = flattenQP(entry, qpRaw, pagesDir)
  mergeMarkScheme(questions, msRaw)

  // Crop diagrams
  for (const { file, bbox, pageFile } of pendingCrops) {
    if (fs.existsSync(pageFile)) {
      await cropDiagram(pageFile, bbox, file)
    }
  }

  const invalidCount = questions.filter(q => !q.latexValid).length
  if (invalidCount > 0) {
    console.warn(`     ⚠ ${invalidCount} questions with invalid LaTeX (flagged, not skipped)`)
  }

  const outFile = resolveDataPath(`extracted/${subjectId}/${paperId}/questions.json`)
  fs.writeFileSync(outFile, JSON.stringify(questions, null, 2))
  markDone('extracted', paperId)
  console.log(`     ✅ ${questions.length} questions extracted`)
}

// Load all manifests and process
const SUBJECTS = ['mathematics', 'physics', 'computer-science']

console.log('🔬 Extracting questions from PDFs...\n')
for (const subjectId of SUBJECTS) {
  const manifestPath = resolveDataPath(`papers/${subjectId}-manifest.json`)
  if (!fs.existsSync(manifestPath)) {
    console.log(`  ⏭  ${subjectId}: no manifest, run 2-fetch-papers first`)
    continue
  }

  const manifest: PaperManifestEntry[] = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
  console.log(`\n── ${subjectId}: ${manifest.length} papers ──`)

  for (const entry of manifest) {
    await processPaper(entry)
  }
  console.log()
}

console.log('\n✅ Extraction complete.')
