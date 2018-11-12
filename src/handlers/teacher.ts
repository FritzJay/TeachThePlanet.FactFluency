import { showLoading, hideLoading } from 'react-redux-loading'
import {
  saveSignInTeacher,
  saveSignUpTeacher,
  saveUpdateTeacher,
  saveRemoveTeacher,
} from '../utils/api'
import { addUser } from '../actions/user'
import { 
  addTeacher,
  updateTeacher,
  removeTeacher,
} from '../actions/teacher'
import { ITeacher } from '../utils/interfaces'

export const handleSignUpTeacher = (email: string, password: string) => {
  return async (dispatch) => {
    dispatch(showLoading())
    const { user, teacher } = await saveSignUpTeacher(email, password)
    dispatch(addUser(user))
    dispatch(addTeacher(teacher))
    dispatch(hideLoading())
  }
}

export const handleSignInTeacher = (email: string, password: string) => {
  return async (dispatch) => {
    dispatch(showLoading())
    const { user, teacher } = await saveSignInTeacher(email, password)
    dispatch(addUser(user))
    dispatch(addTeacher(teacher))
    dispatch(hideLoading())
  }
}

export const handleUpdateTeacher = (token: string, updates: ITeacher) => {
  return async (dispatch) => {
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
  return async (dispatch) => {
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