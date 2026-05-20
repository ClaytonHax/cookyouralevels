export type Level = 'AS' | 'A2'

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
  questionCount: number
}

export interface Question {
  id: string
  topicId: string
  subjectId: string
  level: Level
  year: number
  paper: number
  marks: number
  content: string
  solutionId?: string
}
