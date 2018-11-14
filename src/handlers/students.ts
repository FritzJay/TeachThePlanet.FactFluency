import { showLoading, hideLoading } from 'react-redux-loading'
import { IStudent } from '../utils/interfaces'

export const handleUpdateStudent = (token: string, classId: string, updates: IStudent) => {
  return async (dispatch: any) => {
    dispatch(showLoading)
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

export const handleRemoveStudent = (token: string, classId: string, studentId: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading)
    try {
      /*
      await saveRemoveStudent(token, classId, studentId)
      dispatch(removeStudent(classId, studentId))
      */
      throw new Error('Not implemented')
    } catch (error) {
      alert('There was an error saving your changes. Please try again later.')
    } finally {
      dispatch(hideLoading())
    }
  }
}