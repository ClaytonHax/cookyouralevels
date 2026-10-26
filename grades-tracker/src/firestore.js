import {
  collection,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  getDocs,
  writeBatch,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { db, firebaseReady } from './firebase'
import * as local from './localStore'

const subjectsCol = (uid) => collection(db, 'users', uid, 'subjects')
const gradesCol = (uid, subjectId) => collection(db, 'users', uid, 'subjects', subjectId, 'grades')

const remote = {
  subscribeSubjects(uid, cb, errCb) {
    return onSnapshot(
      query(subjectsCol(uid), orderBy('name')),
      (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      errCb
    )
  },

  subscribeSubject(uid, id, cb, errCb) {
    return onSnapshot(
      doc(db, 'users', uid, 'subjects', id),
      (d) => cb(d.exists() ? { id: d.id, ...d.data() } : null),
      errCb
    )
  },

  subscribeGrades(uid, subjectId, cb, errCb) {
    return onSnapshot(
      query(gradesCol(uid, subjectId), orderBy('date', 'desc')),
      (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      errCb
    )
  },

  addSubject(uid, { name, syllabus, target }) {
    return addDoc(subjectsCol(uid), {
      name,
      syllabus: syllabus || '',
      target: target || 'A',
      createdAt: serverTimestamp(),
    })
  },

  updateSubject(uid, id, data) {
    return setDoc(doc(db, 'users', uid, 'subjects', id), data, { merge: true })
  },

  // Firestore doesn't cascade, so remove the grades subcollection first
  async deleteSubject(uid, id) {
    const snap = await getDocs(gradesCol(uid, id))
    const batch = writeBatch(db)
    snap.docs.forEach((d) => batch.delete(d.ref))
    batch.delete(doc(db, 'users', uid, 'subjects', id))
    return batch.commit()
  },

  addGrade(uid, subjectId, { title, type, grade, weight, date }) {
    return addDoc(gradesCol(uid, subjectId), {
      title,
      type,
      grade,
      weight: Number(weight) || 0,
      date,
      createdAt: serverTimestamp(),
    })
  },

  updateGrade(uid, subjectId, id, data) {
    const clean = { ...data, weight: Number(data.weight) || 0 }
    delete clean.id
    return setDoc(doc(db, 'users', uid, 'subjects', subjectId, 'grades', id), clean, { merge: true })
  },

  deleteGrade(uid, subjectId, id) {
    return deleteDoc(doc(db, 'users', uid, 'subjects', subjectId, 'grades', id))
  },
}

const api = firebaseReady ? remote : local

export const {
  subscribeSubjects,
  subscribeSubject,
  subscribeGrades,
  addSubject,
  updateSubject,
  deleteSubject,
  addGrade,
  updateGrade,
  deleteGrade,
} = api
