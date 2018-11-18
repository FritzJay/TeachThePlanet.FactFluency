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
import { INewClassParameters } from '../utils'

export const handleAddClass = (token: string, { grade, name }: INewClassParameters) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    const newClass = await saveAddClass(token, grade, name)
    dispatch(addClass(newClass))
    dispatch(hideLoading())
  }
}

export const handleUpdateClass = (token: string, classId: string, updates: INewClassParameters) => {
  return async (dispatch: any) => {
    dispatch(showLoading)
    try {
      const updatedClass = await saveUpdateClass(token, classId, updates)
      dispatch(updateClass({
        ...updatedClass,
        ...updates
      }))
    } catch (error) {
      alert('There was an error saving your changes. Please try again later.')
    } finally {
      dispatch(hideLoading())
    }
  }
}

export const handleRemoveClass = (token: string, classId: string) => {
  return async (dispatch: any) => {
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