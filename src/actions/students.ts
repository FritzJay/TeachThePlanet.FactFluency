import { IStudent } from '../utils'

export const ADD_STUDENT = 'ADD_STUDENT'
export const SIGN_IN_STUDENT = 'SIGN_IN_STUDENT'
export const UPDATE_STUDENT = 'UPDATE_STUDENT'
export const REMOVE_STUDENT_FROM_COURSE = 'REMOVE_STUDENT_FROM_COURSE'

export const addStudent = (classId: string, student: IStudent) => ({
  type: ADD_STUDENT,
  classId,
  student,
})

export const signInStudent = (student: IStudent) => ({
  type: SIGN_IN_STUDENT,
  student,
})

export const updateStudent = (classId: string, updates: IStudent) => ({
  type: UPDATE_STUDENT,
  classId,
  student: updates,
})

export const removeStudentFromCourse = (classId: string, studentId: string) => ({
  type: REMOVE_STUDENT_FROM_COURSE,
  classId,
  studentId,
})