export type Level = 'AS' | 'A2'
export type Session = 'feb-march' | 'may-june' | 'oct-nov'

export interface SyllabusTopic {
  id: string
  name: string
  order: number
}

export interface SyllabusComponent {
  id: string
  name: string
  paperNumber: number
  level: Level
  topics: SyllabusTopic[]
}

export interface Syllabus {
  subject: string
  code: string
  components: SyllabusComponent[]
}

export interface RawPart {
  partLabel: string | null
  marks: number
  content: string
  hasDiagram: boolean
  diagramBoundingBox?: { x: number; y: number; w: number; h: number } | null
  continuesOnNextPage?: boolean
}

export interface RawQuestion {
  questionNumber: number
  parts: RawPart[]
}

export interface ExtractedQuestion {
  id: string              // {paperId}-q{N}-{partLabel|main}
  paperId: string
  subjectId: string
  year: number
  session: Session
  paperNumber: number
  variant: number
  level: Level
  questionNumber: number
  partLabel?: string
  marks: number
  content: string
  hasDiagram: boolean
  diagramPageFile?: string  // path to cropped PNG
  markScheme: string
  markSchemeHasDiagram: boolean
  markSchemeDiagramPageFile?: string
  latexValid: boolean
}

export interface ClassifiedQuestion extends ExtractedQuestion {
  topicIds: string[]
  classificationConfidence: number
}

export interface PaperManifestEntry {
  paperId: string
  subjectId: string
  year: number
  session: Session
  paperNumber: number
  variant: number
  level: Level
  qpFile: string   // relative path under data/papers/
  msFile: string
}
