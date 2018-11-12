import { showLoading, hideLoading } from 'react-redux-loading'
import {
  saveSignInTeacher,
  saveSignUpTeacher,
} from '../utils/api'
import { addUser } from '../actions/user'
import { addTeacher } from '../actions/teacher'

export const handleSignUpTeacher = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    const teacher = await saveSignUpTeacher(email, password)
    dispatch(addUser(teacher.user))
    dispatch(addTeacher(teacher))
    dispatch(hideLoading())
  }
}

export const handleSignInTeacher = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    const teacher = await saveSignInTeacher(email, password)
    dispatch(addUser(teacher.user))
    dispatch(addTeacher(teacher))
    dispatch(hideLoading())
  }
}

/*
export const handleUpdateTeacher = (token: string, updates: ITeacher) => {
  return async (dispatch: any) => {
    dispatch(showLoading)
    try {
      const updatedTeacher = await saveUpdateTeacher(token, updates)
      dispatch(updateTeacher(updatedTeacher))
    } catch (error) {
      alert('There was an error saving your changes. Please try again later.')
    } finally {
      dispatch(hideLoading())
    }
  }
}

export const handleRemoveTeacher = (token: string, teacherId: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading)
    try {
      await saveRemoveTeacher(token, teacherId)
      dispatch(removeTeacher(teacherId))
    } catch (error) {
      alert('There was an error saving your changes. Please try again later.')
    } finally {
      dispatch(hideLoading())
    }
  }
}
*/