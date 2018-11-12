import { IStudent } from '../utils'

export const ADD_STUDENT = 'ADD_STUDENT'
export const UPDATE_STUDENT = 'UPDATE_STUDENT'
export const REMOVE_STUDENT = 'REMOVE_STUDENT'

export const addStudent = (classId: string, student: IStudent) => ({
  type: ADD_STUDENT,
  classId,
  student,
})

export const updateStudent = (classId: string, updates: IStudent) => ({
  type: UPDATE_STUDENT,
  classId,
  student: updates,
})

export const removeStudent = (classId: string, studentId: string) => ({
  type: REMOVE_STUDENT,
  classId,
  studentId,
})