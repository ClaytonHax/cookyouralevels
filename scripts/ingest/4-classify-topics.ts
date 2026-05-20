import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { anthropic, extractJson } from '../lib/claude.ts'
import { resolveDataPath } from '../lib/pdf.ts'
import { isDone, markDone } from '../lib/progress.ts'
import type { ExtractedQuestion, ClassifiedQuestion, Syllabus } from '../lib/types.ts'

const SUBJECTS = ['mathematics', 'physics', 'computer-science']

function buildTopicList(syllabus: Syllabus): string {
  const lines: string[] = []
  for (const comp of syllabus.components) {
    lines.push(`# ${comp.name} (${comp.level})`)
    for (const t of comp.topics) {
      lines.push(`  ${t.id}: ${t.name}`)
    }
  }
  return lines.join('\n')
}

async function classifyBatch(
  questions: ExtractedQuestion[],
  topicList: string,
  subjectId: string,
): Promise<ClassifiedQuestion[]> {
  // Use Anthropic Batch API for cost efficiency (50% cheaper)
  const requests = questions.map(q => ({
    custom_id: q.id,
    params: {
      model: 'claude-haiku-4-5-20251001' as const,
      max_tokens: 128,
      system: `You are classifying Cambridge CIE A Level exam questions by topic.
Return ONLY valid JSON, no prose, no markdown fences.`,
      messages: [
        {
          role: 'user' as const,
          content: `Subject: ${subjectId}

Available topics:
${topicList}

Classify this question. A question may belong to 1–3 topics.
Return JSON: {"topicIds": ["topic-id-1"], "confidence": 0.95}

Question: ${q.content.slice(0, 500)}`,
        },
      ],
    },
  }))

  // Submit batch
  console.log(`  📤 Submitting batch of ${requests.length} questions...`)
  const batch = await anthropic.messages.batches.create({ requests })
  console.log(`  Batch ID: ${batch.id}`)

  // Poll until complete
  let status = batch.processing_status
  while (status === 'in_progress') {
    await new Promise(r => setTimeout(r, 10_000))
    const updated = await anthropic.messages.batches.retrieve(batch.id)
    status = updated.processing_status
    process.stdout.write('.')
  }
  console.log(` ${status}`)

  // Collect results
  const resultMap = new Map<string, { topicIds: string[]; confidence: number }>()
  for await (const result of await anthropic.messages.batches.results(batch.id)) {
    if (result.result.type === 'succeeded') {
      const block = result.result.message.content[0]
      if (block.type === 'text') {
        try {
          const parsed = extractJson<{ topicIds: string[]; confidence: number }>(block.text)
          resultMap.set(result.custom_id, parsed)
        } catch {
          // leave unclassified
        }
      }
    }
  }

  return questions.map(q => ({
    ...q,
    topicIds: resultMap.get(q.id)?.topicIds ?? ['unclassified'],
    classificationConfidence: resultMap.get(q.id)?.confidence ?? 0,
  }))
}

async function classifySubject(subjectId: string): Promise<void> {
  const syllabusPath = resolveDataPath(`syllabuses/${subjectId}.json`)
  if (!fs.existsSync(syllabusPath)) {
    console.log(`  ⏭  ${subjectId}: no syllabus, run 1-fetch-syllabus first`)
    return
  }

  const syllabus: Syllabus = JSON.parse(fs.readFileSync(syllabusPath, 'utf-8'))
  const topicList = buildTopicList(syllabus)

  const manifestPath = resolveDataPath(`papers/${subjectId}-manifest.json`)
  if (!fs.existsSync(manifestPath)) {
    console.log(`  ⏭  ${subjectId}: no manifest`)
    return
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8')) as { paperId: string }[]

  for (const { paperId } of manifest) {
    if (isDone('classified', paperId)) {
      process.stdout.write('.')
      continue
    }

    const extractedPath = resolveDataPath(`extracted/${subjectId}/${paperId}/questions.json`)
    if (!fs.existsSync(extractedPath)) {
      console.warn(`\n  ⚠  ${paperId}: not extracted yet, skipping`)
      continue
    }

    const questions: ExtractedQuestion[] = JSON.parse(fs.readFileSync(extractedPath, 'utf-8'))
    console.log(`\n  🏷  ${paperId}: ${questions.length} questions`)

    // Split into manageable batches (Batch API supports up to 10k but keep small for speed)
    const BATCH_SIZE = 500
    const classified: ClassifiedQuestion[] = []
    for (let i = 0; i < questions.length; i += BATCH_SIZE) {
      const chunk = questions.slice(i, i + BATCH_SIZE) as ExtractedQuestion[]
      const results = await classifyBatch(chunk, topicList, subjectId)
      classified.push(...results)
    }

    const outDir = resolveDataPath(`classified/${subjectId}`)
    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(path.join(outDir, `${paperId}.json`), JSON.stringify(classified, null, 2))

    markDone('classified', paperId)
    console.log(`     ✅ classified`)
  }
}

console.log('🏷  Classifying questions by topic...\n')
for (const subjectId of SUBJECTS) {
  console.log(`\n── ${subjectId} ──`)
  await classifySubject(subjectId)
}
console.log('\n\n✅ Classification complete.')
