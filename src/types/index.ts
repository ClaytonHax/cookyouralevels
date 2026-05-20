export type Level = 'AS' | 'A2'
export type Session = 'feb-march' | 'may-june' | 'oct-nov'

export interface Subject {
  id: string
  name: string
  code?: string
  levels: Level[]
  color: string
}

export interface Topic {
  id: string
  name: string
  subjectId: string
  level: Level
  order: number
  parentTopicId?: string
  questionCount: number
}

export interface Paper {
  id: string
  subjectId: string
  year: number
  session: Session
  paperNumber: number
  variant: number
  level: Level
  pdfUrl?: string
  questionCount: number
}

export interface Question {
  id: string
  subjectId: string
  topicIds: string[]
  paperId: string
  year: number
  session: Session
  paperNumber: number
  variant: number
  level: Level
  questionNumber: number
  partLabel?: string
  marks: number
  content: string          // KaTeX-mixed text: inline $...$ display $$...$$
  hasDiagram: boolean
  diagramUrl?: string
  markScheme: string
  markSchemeHasDiagram?: boolean
  markSchemeUrl?: string
  extractedAt: Date
  classifiedAt?: Date
  classificationConfidence?: number
}
