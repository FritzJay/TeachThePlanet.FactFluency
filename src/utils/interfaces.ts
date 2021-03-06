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
  tests: ITest[]
  user: IUser
  createdAt: number
  updatedAt: number
  changePasswordRequired?: boolean
}

export interface IStudent {
  id: string
  name: string
  tests?: ITest[]
  changePasswordRequired?: boolean
}

export interface IUser {
  email: string
  username: string
  token: string
}

export interface IClass {
  id: string
  name: string
  code: string
  grade: string
  testParameters: ITestParameters
  teacher: ITeacher
  students: IStudentUser[]
  courseInvitations: ICourseInvitation[]
  courseRequests: ICourseRequest[]
}

export interface ITestParameters {
  id: string
  duration: number
  operators: string[]
  numbers: number[]
  questions: number
  randomQuestions: number
  passing: number
}

export interface ICourseInvitation {
  id: string
  student: IStudentUser
  course: IClass
  createdAt: number
  updatedAt: number
}

export interface ICourseRequest {
  id: string
  student: IStudentUser
  course: IClass
  createdAt: number
  updatedAt: number
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

export interface ICreateAccountForStudentInput {
  name: string
  user: {
    username: string
    password: string
    firstName: string
    lastName: string
  }
}

/* Fact Fluency Interfaces */

export interface ITest {
  id: string
  duration: number
  start?: number
  end?: number
  questions: IQuestion[]
  testResults?: ITestResults
  number: number
  operator: string
  student: IStudentUser
  course?: IClass
}

export interface IQuestion {
  id: string
  question: string
  studentAnswer?: number
  correctAnswer?: number
  start?: number
  end?: number
}

export interface IDisplayQuestion {
  bottom: string
  operator: string
  start?: number
  top: string
}

export interface ITestResults {
  total: number
  needed: number
  correct: number
  incorrect: IQuestion
  quickest: IQuestion
}