import { showLoading, hideLoading } from 'react-redux-loading'
import { IStudent, ICreateAccountForStudentInput } from '../utils/interfaces'
import { addStudent, removeStudentFromCourse, signInStudent } from 'src/actions/students'
import {
  saveCreateAccountForStudent,
  saveRemoveStudentFromCourse,
  saveSignInStudent,
  saveChangeStudentPassword,
  saveGetStudent,
  saveRemovePendingStudent
} from 'src/api'
import { addUser } from 'src/actions/user'

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

export const handleRemovePendingStudent = (token: string, classId: string, studentId: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    try {
      await saveRemovePendingStudent(token, studentId, classId)
      dispatch(removeStudentFromCourse(classId, studentId))
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

export const handleChangeStudentPassword = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    try {
      await saveChangeStudentPassword(email, password)
      const token = await saveSignInStudent(email, password)
      const student = await saveGetStudent(token)
      dispatch(addUser({
        ...student.user,
        token,
      }))
      dispatch(signInStudent(student))
    } finally {
      dispatch(hideLoading())
    }
  }
}