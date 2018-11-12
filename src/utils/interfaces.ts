export interface IUser {
  id: string
  name: string
}

export interface IClass {
  id: string
  name: string
  code: string
  grade: string
}

export interface INewClassParameters {
  grade: string
  name: string
}

export interface IStudent {
  id: string
}

export interface INewStudentParameters {
  grade: string
  name: string
}

export interface ITeacher {
  id: string
}

export interface INewTeacherParameters {
  grade: string
  name: string
}

export interface ITestParameters {
  id: string
  duration: number
  operators: string[]
  numbers: number[]
  questions: number
  randomQuestions: number
}

export interface ITest {
  duration?: number
  start?: Date
  end?: Date
  questions: IQuestion[]
}

export interface ITestResults {
  total: number
  needed: number
  correct: number
  incorrect: IQuestion
  quickest: IQuestion
}

export interface IQuestion {
  question: string
  studentAnswer?: number
  correctAnswer?: number
  start?: Date
  end?: Date
}