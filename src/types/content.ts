// Static content shipped in public/data/** — see docs/SPEC.md.
// These shapes are the contract between the content pipeline and the app.

export type SubjectId = 'mathematics' | 'physics' | 'computer-science'
export type Level = 'AS' | 'A2'
/** m = Feb/March, s = May/June, w = Oct/Nov */
export type SessionCode = 'm' | 's' | 'w'

export interface SubjectMeta {
  id: SubjectId
  code: string            // '9709'
  name: string            // 'Mathematics'
  short: string           // 'Maths'
}

// public/data/{subjectId}/syllabus.json
export interface Syllabus {
  subjectId: SubjectId
  code: string
  name: string
  version: string         // e.g. '2026–2027'
  pdfUrl: string          // official Cambridge syllabus PDF
  components: SyllabusComponent[]
}

export interface SyllabusComponent {
  id: string              // 'p1', 'mechanics', 'as', 'a2' … unique within subject
  name: string            // 'Pure Mathematics 1'
  level: Level
  papers: number[]        // paper numbers that examine it, e.g. [1]
  topics: SyllabusTopic[]
}

export interface SyllabusTopic {
  id: string              // kebab-case, unique within subject, e.g. 'p1-quadratics'
  number: string          // as printed in the syllabus, e.g. '1.1'
  name: string
  objectives: Objective[]
}

export interface Objective {
  id: string              // `${topicId}.${n}` e.g. 'p1-quadratics.3'
  text: string            // the learning outcome, verbatim-ish from the syllabus
}

// public/data/{subjectId}/papers.json — PaperRef[]
export interface PaperRef {
  id: string              // '9702_s24_22'  (code_sessionYY_paperVariant)
  code: string
  year: number
  session: SessionCode
  paper: number
  variant: number
  level: Level
  links: {
    qp: string
    ms?: string
    er?: string           // examiner report (per session, not per variant)
    in?: string           // insert / pre-release, if it exists
  }
  hasQuestions: boolean   // true if this paper is in questions.json
}

// public/data/{subjectId}/questions.json — Question[]
export interface Question {
  id: string              // '9702_s24_22_q3'
  subjectId: SubjectId
  paperId: string         // PaperRef.id
  year: number
  session: SessionCode
  paper: number
  variant: number
  level: Level
  number: number          // question number on the paper
  marks: number           // total marks for the whole question (0 if unknown)
  text: string            // cleaned plain text, used for search + previews
  images: string[]        // '/q/physics/9702_s24_22_q3_1.webp', in reading order
  msImages: string[]      // mark-scheme crops, same convention with _ms_
  mcqAnswer?: 'A' | 'B' | 'C' | 'D'
  topicIds: string[]      // SyllabusTopic.id — first one is the primary topic
  objectiveIds: string[]  // Objective.id
  difficulty?: 1 | 2 | 3
}

// public/data/{subjectId}/notes/{topicId}.md — curated revision notes (Markdown + $KaTeX$)
// public/data/{subjectId}/notes/index.json — string[] of topicIds that have notes
