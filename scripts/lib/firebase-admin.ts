import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import path from 'path'

let initialised = false

export function initAdmin(): void {
  if (initialised) return

  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  if (!credPath) throw new Error('GOOGLE_APPLICATION_CREDENTIALS not set')

  const serviceAccount = JSON.parse(
    readFileSync(path.resolve(credPath), 'utf-8'),
  )

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  })
  initialised = true
}

export function db(): admin.firestore.Firestore {
  return admin.firestore()
}

export function bucket(): ReturnType<admin.storage.Storage['bucket']> {
  return admin.storage().bucket()
}
