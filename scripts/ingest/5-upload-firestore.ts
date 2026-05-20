import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { initAdmin, db, bucket } from '../lib/firebase-admin.ts'
import { resolveDataPath } from '../lib/pdf.ts'
import { isDone, markDone } from '../lib/progress.ts'
import type { ClassifiedQuestion, Syllabus, PaperManifestEntry } from '../lib/types.ts'

const SUBJECTS = [
  { subjectId: 'mathematics',      name: 'Mathematics',      code: '9709', color: 'indigo' },
  { subjectId: 'physics',          name: 'Physics',           code: '9702', color: 'blue' },
  { subjectId: 'computer-science', name: 'Computer Science',  code: '9618', color: 'emerald' },
]

const BATCH_SIZE = 500

async function uploadDiagram(localPath: string, storagePath: string): Promise<string> {
  await bucket().upload(localPath, {
    destination: storagePath,
    metadata: { contentType: 'image/png' },
  })
  const [url] = await bucket().file(storagePath).getSignedUrl({
    action: 'read',
    expires: '2099-01-01',
  })
  return url
}

async function writeBatch(writes: { ref: FirebaseFirestore.DocumentReference; data: Record<string, unknown> }[]): Promise<void> {
  const firestore = db()
  for (let i = 0; i < writes.length; i += BATCH_SIZE) {
    const chunk = writes.slice(i, i + BATCH_SIZE)
    const batch = firestore.batch()
    for (const { ref, data } of chunk) {
      batch.set(ref, data, { merge: true })
    }
    await batch.commit()
  }
}

async function uploadSubject(subjectId: string, name: string, code: string): Promise<void> {
  const firestore = db()
  console.log(`\n── ${subjectId} ──`)

  // 1. Subject document
  await firestore.collection('subjects').doc(subjectId).set({ id: subjectId, name, code }, { merge: true })
  console.log(`  ✓ subjects/${subjectId}`)

  // 2. Topics from syllabus
  const syllabusPath = resolveDataPath(`syllabuses/${subjectId}.json`)
  if (!fs.existsSync(syllabusPath)) {
    console.warn(`  ⚠  No syllabus for ${subjectId}`)
  } else {
    const syllabus: Syllabus = JSON.parse(fs.readFileSync(syllabusPath, 'utf-8'))
    const topicWrites: { ref: FirebaseFirestore.DocumentReference; data: Record<string, unknown> }[] = []

    for (const comp of syllabus.components) {
      for (const t of comp.topics) {
        topicWrites.push({
          ref: firestore.collection('subjects').doc(subjectId).collection('topics').doc(t.id),
          data: {
            id: t.id,
            name: t.name,
            subjectId,
            level: comp.level,
            order: t.order,
            parentTopicId: comp.id,
            questionCount: 0,
          },
        })
      }
    }
    await writeBatch(topicWrites)
    console.log(`  ✓ ${topicWrites.length} topics uploaded`)
  }

  // 3. Papers + questions
  const manifestPath = resolveDataPath(`papers/${subjectId}-manifest.json`)
  if (!fs.existsSync(manifestPath)) {
    console.warn(`  ⚠  No manifest for ${subjectId}`)
    return
  }

  const manifest: PaperManifestEntry[] = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
  const topicCounts = new Map<string, number>()

  for (const entry of manifest) {
    const { paperId } = entry

    if (isDone('uploaded', paperId)) {
      process.stdout.write('.')
      continue
    }

    const classifiedPath = resolveDataPath(`classified/${subjectId}/${paperId}.json`)
    if (!fs.existsSync(classifiedPath)) {
      console.warn(`\n  ⚠  ${paperId}: not classified, skipping`)
      continue
    }

    const questions: ClassifiedQuestion[] = JSON.parse(fs.readFileSync(classifiedPath, 'utf-8'))
    console.log(`\n  📤 ${paperId}: ${questions.length} questions`)

    // Upload diagrams to Storage
    const diagramUrls = new Map<string, string>()
    for (const q of questions) {
      if (q.hasDiagram && q.diagramPageFile && fs.existsSync(q.diagramPageFile)) {
        const storagePath = `diagrams/${subjectId}/${paperId}/${path.basename(q.diagramPageFile)}`
        const url = await uploadDiagram(q.diagramPageFile, storagePath)
        diagramUrls.set(q.id, url)
      }
    }

    // Paper document
    await firestore
      .collection('subjects').doc(subjectId)
      .collection('papers').doc(paperId)
      .set({
        id: paperId,
        subjectId,
        year: entry.year,
        session: entry.session,
        paperNumber: entry.paperNumber,
        variant: entry.variant,
        level: entry.level,
        questionCount: questions.length,
      }, { merge: true })

    // Question documents (top-level collection)
    const questionWrites: { ref: FirebaseFirestore.DocumentReference; data: Record<string, unknown> }[] = []
    for (const q of questions) {
      const diagramUrl = diagramUrls.get(q.id)
      questionWrites.push({
        ref: firestore.collection('questions').doc(q.id),
        data: {
          id: q.id,
          subjectId,
          topicIds: q.topicIds,
          paperId,
          year: q.year,
          session: q.session,
          paperNumber: q.paperNumber,
          variant: q.variant,
          level: q.level,
          questionNumber: q.questionNumber,
          partLabel: q.partLabel ?? null,
          marks: q.marks,
          content: q.content,
          hasDiagram: q.hasDiagram,
          diagramUrl: diagramUrl ?? null,
          markScheme: q.markScheme,
          markSchemeHasDiagram: q.markSchemeHasDiagram,
          markSchemeUrl: null,
          latexValid: q.latexValid,
          classificationConfidence: q.classificationConfidence,
          extractedAt: new Date(),
          classifiedAt: new Date(),
        },
      })

      // Tally topic counts
      for (const topicId of q.topicIds) {
        topicCounts.set(topicId, (topicCounts.get(topicId) ?? 0) + 1)
      }
    }

    await writeBatch(questionWrites)
    markDone('uploaded', paperId)
    console.log(`     ✅ uploaded`)
  }

  // 4. Update topic questionCounts
  console.log(`\n  Updating topic question counts...`)
  const countWrites: { ref: FirebaseFirestore.DocumentReference; data: Record<string, unknown> }[] = []
  for (const [topicId, count] of topicCounts) {
    countWrites.push({
      ref: firestore.collection('subjects').doc(subjectId).collection('topics').doc(topicId),
      data: { questionCount: count },
    })
  }
  if (countWrites.length > 0) await writeBatch(countWrites)
  console.log(`  ✓ ${countWrites.length} topic counts updated`)
}

initAdmin()
console.log('🚀 Uploading to Firestore...')
for (const { subjectId, name, code } of SUBJECTS) {
  await uploadSubject(subjectId, name, code)
}
console.log('\n✅ Upload complete.')
