import { showLoading, hideLoading } from 'react-redux-loading'
import {
  saveAddClass,
  saveUpdateClass,
  saveRemoveClass,
} from '../utils/api'
import { 
  addClass,
  updateClass,
  removeClass,
} from '../actions/classes'
import { INewClassParameters } from '../utils/interfaces'

export const handleAddClass = (token: string, cls: INewClassParameters) => {
  return async (dispatch) => {
    dispatch(showLoading())
    const newClass = await saveAddClass(token, cls)
    dispatch(addClass(newClass))
    dispatch(hideLoading())
  }
}

export const handleUpdateClass = (token: string, classId: string, updates: INewClassParameters) => {
  return async (dispatch) => {
    dispatch(showLoading)
    try {
      const updatedClass = await saveUpdateClass(token, classId, updates)
      dispatch(updateClass(updatedClass))
    } catch (error) {
      alert('There was an error saving your changes. Please try again later.')
    } finally {
      dispatch(hideLoading())
    }
  }
}

export const handleRemoveClass = (token: string, classId: string) => {
  return async (dispatch) => {
    dispatch(showLoading)
    try {
      await saveRemoveClass(token, classId)
      dispatch(removeClass(classId))
    } catch (error) {
      alert('There was an error saving your changes. Please try again later.')
    } finally {
      dispatch(hideLoading())
    }
  }
}