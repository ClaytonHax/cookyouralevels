import {
  collection, query, where, orderBy, getDocs,
  doc, getDoc, limit, startAfter,
  type QueryConstraint, type DocumentSnapshot, type QueryDocumentSnapshot,
} from 'firebase/firestore'
import { db } from './firebase'
import type { Topic, Paper, Question, Level } from '../types'

export async function getTopics(subjectId: string, level: Level): Promise<Topic[]> {
  const ref = collection(db, 'subjects', subjectId, 'topics')
  // Single-field filter only — no orderBy — to avoid needing a composite index.
  // Topics are few so sorting client-side is fine.
  const q = query(ref, where('level', '==', level))
  const snap = await getDocs(q)
  return snap.docs
    .map(d => d.data() as Topic)
    .sort((a, b) => a.order - b.order)
}

export async function getPapers(subjectId: string, level: Level): Promise<Paper[]> {
  const ref = collection(db, 'subjects', subjectId, 'papers')
  // Same pattern: filter only, sort client-side.
  const q = query(ref, where('level', '==', level))
  const snap = await getDocs(q)
  return snap.docs
    .map(d => d.data() as Paper)
    .sort((a, b) => b.year - a.year)
}

export async function getTopic(subjectId: string, topicId: string): Promise<Topic | null> {
  const ref = doc(db, 'subjects', subjectId, 'topics', topicId)
  const snap = await getDoc(ref)
  return snap.exists() ? (snap.data() as Topic) : null
}

export async function getPaper(subjectId: string, paperId: string): Promise<Paper | null> {
  const ref = doc(db, 'subjects', subjectId, 'papers', paperId)
  const snap = await getDoc(ref)
  return snap.exists() ? (snap.data() as Paper) : null
}

export async function getQuestionsByTopic(
  subjectId: string,
  topicId: string,
  opts: {
    year?: number
    pageSize?: number
    afterDoc?: QueryDocumentSnapshot | null
  } = {},
): Promise<{ questions: Question[]; lastDoc: QueryDocumentSnapshot | null }> {
  const { year, pageSize = 20, afterDoc } = opts
  const ref = collection(db, 'questions')

  const constraints: QueryConstraint[] = [
    where('subjectId', '==', subjectId),
    where('topicIds', 'array-contains', topicId),
  ]
  if (year) constraints.push(where('year', '==', year))
  constraints.push(orderBy('year', 'desc'), limit(pageSize))
  if (afterDoc) constraints.push(startAfter(afterDoc))

  const snap = await getDocs(query(ref, ...constraints))
  const questions = snap.docs.map(d => d.data() as Question)
  const lastDoc = snap.docs[snap.docs.length - 1] ?? null
  return { questions, lastDoc }
}

export async function getQuestionsByPaper(paperId: string): Promise<Question[]> {
  const ref = collection(db, 'questions')
  const q = query(ref, where('paperId', '==', paperId))
  const snap = await getDocs(q)
  return snap.docs
    .map(d => d.data() as Question)
    .sort((a, b) => {
      if (a.questionNumber !== b.questionNumber) return a.questionNumber - b.questionNumber
      return (a.partLabel ?? '').localeCompare(b.partLabel ?? '')
    })
}

export type { DocumentSnapshot, QueryDocumentSnapshot }
