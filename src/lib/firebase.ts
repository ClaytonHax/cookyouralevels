import { initializeApp } from 'firebase/app'
import type { FirebaseApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import type { Auth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import type { Firestore } from 'firebase/firestore'

const env = import.meta.env

const configured = Boolean(env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_PROJECT_ID)

let app: FirebaseApp | null = null
let authInstance: Auth | null = null
let dbInstance: Firestore | null = null

if (configured) {
  try {
    app = initializeApp({
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID,
    })
    authInstance = getAuth(app)
    dbInstance = getFirestore(app)
  } catch (e) {
    console.warn('Firebase failed to initialise; running in guest mode.', e)
  }
}

/** Firebase Auth, or null when Firebase is not configured. */
export const auth: Auth | null = authInstance
/** Firestore, or null when Firebase is not configured. */
export const db: Firestore | null = dbInstance

/** False when VITE_FIREBASE_API_KEY (or project id) is missing or init failed: the app then runs guest-only. */
export const firebaseEnabled = authInstance !== null && dbInstance !== null
