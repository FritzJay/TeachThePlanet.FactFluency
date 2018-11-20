import { showLoading, hideLoading } from 'react-redux-loading'
import { IStudent, ICreateAccountForStudentInput } from '../utils/interfaces'
import { addStudent, removeStudentFromCourse } from 'src/actions/students'
import { saveCreateAccountForStudent, saveRemoveStudentFromCourse } from 'src/utils/api'

export const handleUpdateStudent = (token: string, classId: string, updates: IStudent) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    try {
      /*
      const updatedStudent = await saveUpdateStudent(token, updates)
      dispatch(updateStudent(classId, updatedStudent))
      */
      throw new Error('Not implemented')
    } catch (error) {
      alert('There was an error saving your changes. Please try again later.')
    } finally {
      dispatch(hideLoading())
    }
  }
}

export const handleRemoveStudentFromCourse = (token: string, classId: string, studentId: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    try {
      await saveRemoveStudentFromCourse(token, studentId, classId)
      dispatch(removeStudentFromCourse(classId, studentId))
    } finally {
      dispatch(hideLoading())
    }
  }
}

export const handleCreateStudent = (token: string, courseId: string, input: ICreateAccountForStudentInput) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    try {
      const student = await saveCreateAccountForStudent(token, courseId, input)
      dispatch(addStudent(courseId, student))
    } finally {
      dispatch(hideLoading())
    }
  }
}