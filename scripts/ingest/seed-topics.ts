/**
 * Seed Firestore with the CIE topic structure for all 3 subjects.
 * Populates subjects + topics only (no questions).
 * Run this first to make the topic browser visible before running the full pipeline.
 *
 * Requires only: GOOGLE_APPLICATION_CREDENTIALS + FIREBASE_STORAGE_BUCKET in scripts/.env
 */
import 'dotenv/config'
import { initAdmin, db } from '../lib/firebase-admin.ts'

const SEED: Record<string, {
  name: string
  code: string
  components: {
    id: string
    name: string
    paperNumber: number
    level: 'AS' | 'A2'
    topics: { id: string; name: string; order: number }[]
  }[]
}> = {
  mathematics: {
    name: 'Mathematics',
    code: '9709',
    components: [
      {
        id: 'p1', name: 'Pure Mathematics 1', paperNumber: 1, level: 'AS',
        topics: [
          { id: 'p1-quadratics',           name: 'Quadratics',                order: 1 },
          { id: 'p1-functions',             name: 'Functions',                 order: 2 },
          { id: 'p1-coordinate-geometry',   name: 'Coordinate Geometry',       order: 3 },
          { id: 'p1-circular-measure',      name: 'Circular Measure',          order: 4 },
          { id: 'p1-trigonometry',          name: 'Trigonometry',              order: 5 },
          { id: 'p1-series',                name: 'Series',                    order: 6 },
          { id: 'p1-differentiation',       name: 'Differentiation',           order: 7 },
          { id: 'p1-integration',           name: 'Integration',               order: 8 },
        ],
      },
      {
        id: 'p2', name: 'Pure Mathematics 2', paperNumber: 2, level: 'A2',
        topics: [
          { id: 'p2-algebra',               name: 'Algebra',                              order: 1 },
          { id: 'p2-logs-exponentials',      name: 'Logarithmic and Exponential Functions', order: 2 },
          { id: 'p2-trigonometry',           name: 'Trigonometry',                         order: 3 },
          { id: 'p2-differentiation',        name: 'Differentiation',                      order: 4 },
          { id: 'p2-integration',            name: 'Integration',                          order: 5 },
          { id: 'p2-numerical-methods',      name: 'Numerical Methods',                    order: 6 },
        ],
      },
      {
        id: 'p3', name: 'Pure Mathematics 3', paperNumber: 3, level: 'A2',
        topics: [
          { id: 'p3-algebra',               name: 'Algebra',                              order: 1 },
          { id: 'p3-logs-exponentials',      name: 'Logarithmic and Exponential Functions', order: 2 },
          { id: 'p3-trigonometry',           name: 'Trigonometry',                         order: 3 },
          { id: 'p3-differentiation',        name: 'Differentiation',                      order: 4 },
          { id: 'p3-integration',            name: 'Integration',                          order: 5 },
          { id: 'p3-numerical-methods',      name: 'Numerical Methods',                    order: 6 },
          { id: 'p3-vectors',               name: 'Vectors',                              order: 7 },
          { id: 'p3-differential-equations', name: 'Differential Equations',               order: 8 },
          { id: 'p3-complex-numbers',        name: 'Complex Numbers',                      order: 9 },
        ],
      },
      {
        id: 'mechanics', name: 'Mechanics', paperNumber: 4, level: 'AS',
        topics: [
          { id: 'mech-forces',              name: 'Forces and Equilibrium',       order: 1 },
          { id: 'mech-kinematics',          name: 'Kinematics',                   order: 2 },
          { id: 'mech-newtons-laws',        name: "Newton's Laws of Motion",      order: 3 },
          { id: 'mech-energy',              name: 'Energy, Work and Power',       order: 4 },
          { id: 'mech-momentum',            name: 'Momentum',                     order: 5 },
        ],
      },
      {
        id: 'stats1', name: 'Probability & Statistics 1', paperNumber: 5, level: 'AS',
        topics: [
          { id: 's1-representation',        name: 'Representation of Data',        order: 1 },
          { id: 's1-permutations',          name: 'Permutations and Combinations', order: 2 },
          { id: 's1-probability',           name: 'Probability',                   order: 3 },
          { id: 's1-discrete-rv',           name: 'Discrete Random Variables',     order: 4 },
          { id: 's1-normal-distribution',   name: 'Normal Distribution',           order: 5 },
        ],
      },
      {
        id: 'stats2', name: 'Probability & Statistics 2', paperNumber: 6, level: 'A2',
        topics: [
          { id: 's2-poisson',               name: 'Poisson Distribution',                  order: 1 },
          { id: 's2-linear-combinations',   name: 'Linear Combinations of Random Variables', order: 2 },
          { id: 's2-continuous-rv',         name: 'Continuous Random Variables',            order: 3 },
          { id: 's2-sampling',              name: 'Sampling and Estimation',                order: 4 },
          { id: 's2-hypothesis-testing',    name: 'Hypothesis Testing',                     order: 5 },
        ],
      },
    ],
  },

  physics: {
    name: 'Physics',
    code: '9702',
    components: [
      {
        id: 'as-physics', name: 'AS Physics', paperNumber: 2, level: 'AS',
        topics: [
          { id: 'ph-quantities',            name: 'Physical Quantities and Units', order: 1 },
          { id: 'ph-kinematics',            name: 'Kinematics',                    order: 2 },
          { id: 'ph-dynamics',              name: 'Dynamics',                      order: 3 },
          { id: 'ph-forces',                name: 'Forces, Density and Pressure',  order: 4 },
          { id: 'ph-work-energy',           name: 'Work, Energy and Power',        order: 5 },
          { id: 'ph-deformation',           name: 'Deformation of Solids',         order: 6 },
          { id: 'ph-waves',                 name: 'Waves',                         order: 7 },
          { id: 'ph-superposition',         name: 'Superposition',                 order: 8 },
          { id: 'ph-electricity',           name: 'Electricity',                   order: 9 },
          { id: 'ph-dc-circuits',           name: 'D.C. Circuits',                 order: 10 },
          { id: 'ph-particle-physics',      name: 'Particle Physics',              order: 11 },
        ],
      },
      {
        id: 'a2-physics', name: 'A Level Physics', paperNumber: 4, level: 'A2',
        topics: [
          { id: 'ph-circular-motion',       name: 'Motion in a Circle',            order: 1 },
          { id: 'ph-gravitational-fields',  name: 'Gravitational Fields',          order: 2 },
          { id: 'ph-temperature',           name: 'Temperature',                   order: 3 },
          { id: 'ph-ideal-gases',           name: 'Ideal Gases',                   order: 4 },
          { id: 'ph-thermodynamics',        name: 'Thermodynamics',                order: 5 },
          { id: 'ph-oscillations',          name: 'Oscillations',                  order: 6 },
          { id: 'ph-electric-fields',       name: 'Electric Fields',               order: 7 },
          { id: 'ph-capacitance',           name: 'Capacitance',                   order: 8 },
          { id: 'ph-electronics',           name: 'Electronics',                   order: 9 },
          { id: 'ph-magnetic-fields',       name: 'Magnetic Fields',               order: 10 },
          { id: 'ph-em-induction',          name: 'Electromagnetic Induction',     order: 11 },
          { id: 'ph-quantum-physics',       name: 'Quantum Physics',               order: 12 },
          { id: 'ph-nuclear-physics',       name: 'Nuclear Physics',               order: 13 },
          { id: 'ph-medical-imaging',       name: 'Medical Imaging',               order: 14 },
        ],
      },
    ],
  },

  'computer-science': {
    name: 'Computer Science',
    code: '9618',
    components: [
      {
        id: 'cs-as-theory', name: 'Theory Fundamentals (AS)', paperNumber: 1, level: 'AS',
        topics: [
          { id: 'cs-data-representation',   name: 'Data Representation',           order: 1 },
          { id: 'cs-communication',         name: 'Communication and Internet',    order: 2 },
          { id: 'cs-hardware',              name: 'Hardware',                      order: 3 },
          { id: 'cs-processor',             name: 'Processor Fundamentals',        order: 4 },
          { id: 'cs-system-software',       name: 'System Software',               order: 5 },
          { id: 'cs-security',              name: 'Security, Privacy and Integrity', order: 6 },
          { id: 'cs-ethics',               name: 'Ethics and Ownership',           order: 7 },
          { id: 'cs-databases',             name: 'Databases and Data Modelling',  order: 8 },
        ],
      },
      {
        id: 'cs-as-programming', name: 'Problem-solving and Programming (AS)', paperNumber: 2, level: 'AS',
        topics: [
          { id: 'cs-algorithm-design',      name: 'Algorithm Design',              order: 1 },
          { id: 'cs-data-types',            name: 'Data Types and Structures',     order: 2 },
          { id: 'cs-programming-basics',    name: 'Programming Basics',            order: 3 },
          { id: 'cs-advanced-programming',  name: 'Advanced Programming Concepts', order: 4 },
          { id: 'cs-software-development',  name: 'Software Development',          order: 5 },
          { id: 'cs-oop',                   name: 'Object-Oriented Programming',   order: 6 },
        ],
      },
      {
        id: 'cs-a2-theory', name: 'Advanced Theory (A Level)', paperNumber: 3, level: 'A2',
        topics: [
          { id: 'cs-a2-data-representation', name: 'Data Representation (Advanced)',  order: 1 },
          { id: 'cs-a2-communication',       name: 'Communication (Advanced)',         order: 2 },
          { id: 'cs-a2-hardware',            name: 'Hardware (Advanced)',              order: 3 },
          { id: 'cs-a2-system-software',     name: 'System Software (Advanced)',       order: 4 },
          { id: 'cs-a2-security',            name: 'Security (Advanced)',              order: 5 },
          { id: 'cs-ai',                     name: 'Artificial Intelligence',          order: 6 },
          { id: 'cs-a2-algorithm',           name: 'Algorithm Design (Advanced)',      order: 7 },
          { id: 'cs-a2-data-structures',     name: 'Data Structures (Advanced)',       order: 8 },
        ],
      },
      {
        id: 'cs-a2-programming', name: 'Practical Programming (A Level)', paperNumber: 4, level: 'A2',
        topics: [
          { id: 'cs-a2-programming',        name: 'Programming (Advanced)',         order: 1 },
          { id: 'cs-a2-oop',               name: 'OOP (Advanced)',                  order: 2 },
          { id: 'cs-recursion',             name: 'Recursion',                      order: 3 },
          { id: 'cs-file-handling',         name: 'File Handling',                  order: 4 },
          { id: 'cs-testing',               name: 'Testing and Validation',         order: 5 },
        ],
      },
    ],
  },
}

async function seed(): Promise<void> {
  initAdmin()
  const firestore = db()

  for (const [subjectId, { name, code, components }] of Object.entries(SEED)) {
    // Subject document
    await firestore.collection('subjects').doc(subjectId).set(
      { id: subjectId, name, code },
      { merge: true },
    )

    let topicCount = 0
    for (const comp of components) {
      for (const t of comp.topics) {
        await firestore
          .collection('subjects').doc(subjectId)
          .collection('topics').doc(t.id)
          .set({
            id: t.id,
            name: t.name,
            subjectId,
            level: comp.level,
            order: t.order,
            parentTopicId: comp.id,
            questionCount: 0,
          }, { merge: true })
        topicCount++
      }
    }

    console.log(`✅ ${name}: ${topicCount} topics seeded`)
  }

  console.log('\nDone. Refresh the app — topics should now appear in the subject pages.')
}

seed().catch(err => { console.error(err); process.exit(1) })
