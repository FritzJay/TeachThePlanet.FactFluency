export interface ITeacherUser {
  id: string
  name: string
  classes: IClass[]
  user: IUser
}

export interface ITeacher {
  id: string
  name: string
}

export interface IStudentUser {
  id: string
  name: string
  classes: IClass[]
  user: IUser
}

export interface IStudent {
  id: string
  name: string
  tests?: ITest[]
}

export interface IUser {
  email: string
  token: string
}

export interface IClass {
  id: string
  name: string
  code: string
  grade: string
  testParameters: ITestParameters
  students: IStudent[]
}

export interface ITestParameters {
  id: string
  duration: number
  operators: string[]
  numbers: number[]
  questions: number
  randomQuestions: number
}


/* API Update Interfaces */

export interface INewClassParameters {
  grade: string
  name: string
}

export interface INewStudentParameters {
  grade: string
  name: string
}

export interface IUpdateTestParameters {
  duration: number
  operators: string[]
  numbers: number[]
  questions: number
  randomQuestions: number
}

/* Fact Fluency Interfaces */

export interface ITest {
  id: string
  duration?: number
  start?: number
  end?: number
  questions: IQuestion[]
  testResults?: ITestResults
  number: number
  operator: string
}

export interface IQuestion {
  id: string
  question: string
  studentAnswer?: number
  correctAnswer?: number
  start?: number
  end?: number
}

export interface ITestResults {
  total: number
  needed: number
  correct: number
  incorrect: IQuestion
  quickest: IQuestion
}