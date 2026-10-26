# Zishao Grades

Cambridge (A Level) grades tracker. React + Vite + Tailwind, Firebase email/password auth + Firestore, soft/neumorphic design. Deploys to Vercel.

## Demo mode
With no Firebase keys in `.env`, the app runs in demo mode: any email signs in and data is saved in the browser (localStorage). Use "Try sample data" on the empty dashboard to preview it.

## Setup

1. **Firebase**: create a project at console.firebase.google.com
   - Authentication → Sign-in method → enable **Email/Password**
   - Firestore Database → create (production mode) → paste `firestore.rules` into the Rules tab
   - Project settings → add a Web app → copy the config
2. **Env**: `cp .env.example .env` and fill in your Firebase keys
3. **Run**: `npm install && npm run dev`
4. **Deploy to Vercel**: push to GitHub, import at vercel.com, framework "Vite", add the same env vars in project settings.

## Data model
`users/{uid}/subjects` → name, code, target grade
`users/{uid}/subjects/{id}/grades` → title, type, grade, weight, date