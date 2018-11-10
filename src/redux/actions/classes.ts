import { hideLoading, showLoading } from 'react-redux-loading' 
import {
  deleteClass as fetchDeleteClass,
  fetchClasses,
  updateClass as fetchUpdateClass,
} from 'src/lib/Api/Classes';
import { IClass } from 'src/lib/Interfaces';

export const DELETE_CLASS = 'DELETE_CLASS'
export const RECEIVE_CLASS_LIST = 'RECEIVE_CLASS_LIST'
export const REMOVE_SELECTED_CLASS = 'REMOVE_SELECTED_CLASS'
export const SET_SELECTED_CLASS = 'SET_SELECTED_CLASS'
export const UPDATE_CLASS = 'UPDATE_CLASS'

export function receiveClassList (classList: IClass[]) {
  return {
    type: RECEIVE_CLASS_LIST,
    classList,
  }
}

export function setSelectedClass (selectedClass: string) {
  return {
    type: SET_SELECTED_CLASS,
    selectedClass,
  }
}

export function removeSelectedClass () {
  return {
    type: REMOVE_SELECTED_CLASS
  }
}

export function deleteClass (id: string) {
  return {
    type: DELETE_CLASS,
    id,
  }
}

export function updateClass (updates: IClass) {
  return {
    type: UPDATE_CLASS,
    updates
  }
}

export function handleReceiveClassList (token: string) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const classList = await fetchClasses(token)
    dispatch(receiveClassList(classList))

    dispatch(hideLoading())
  }
}

export function handleDeleteClass (token: string, id: string) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    await fetchDeleteClass(token, id)
    dispatch(deleteClass(id))
    dispatch(removeSelectedClass())

    dispatch(hideLoading())
  }
}

export function handleUpdateClass (token: string, updates: IClass) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    await fetchUpdateClass(token, updates)
    dispatch(updateClass(updates))

    dispatch(hideLoading())
  }
}