import { ITeacher } from '../utils/interfaces'

export const ADD_TEACHER = 'ADD_TEACHER'
export const UPDATE_TEACHER = 'UPDATE_TEACHER'
export const REMOVE_TEACHER = 'REMOVE_TEACHER'

export const addTeacher = (teacher: ITeacher) => ({
  type: ADD_TEACHER,
  teacher,
})

export const updateTeacher = (updates: ITeacher) => ({
  type: UPDATE_TEACHER,
  teacher: updates,
})

export const removeTeacher = (teacherID: string) => ({
  type: REMOVE_TEACHER,
  teacherID,
})