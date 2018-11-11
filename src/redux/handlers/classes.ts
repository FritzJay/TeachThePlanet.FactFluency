import { hideLoading, showLoading } from 'react-redux-loading' 
import {
  createClass as fetchCreateClass,
  deleteClass as fetchDeleteClass,
  fetchClasses,
  fetchTestParameters,
  getCached,
  IClass,
  updateClass as fetchUpdateClass,
} from 'src/lib'
import {
  createClass,
  deleteClass,
  receiveClassList,
  receiveTestParameters,
  rehydrateClasses,
  removeSelectedClass,
  updateClass,
} from '../actions/classes'

export function handleReceiveClassList (token: string, cb?: any) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const classList = await fetchClasses(token)
    dispatch(receiveClassList(classList))

    dispatch(hideLoading())

    if (cb !== undefined) {
      cb()
    }
  }
}

export function handleDeleteClass (token: string, id: string, cb?: (cls: IClass) => void) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const cls = await fetchDeleteClass(token, id)
    dispatch(deleteClass(id))
    dispatch(removeSelectedClass())

    dispatch(hideLoading())

    if (cb !== undefined) {
      cb(cls)
    }
  }
}

export function handleUpdateClass (token: string, updates: IClass, cb?: (cls: IClass) => void) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const cls = await fetchUpdateClass(token, updates)
    dispatch(updateClass(updates))

    dispatch(hideLoading())

    if (cb !== undefined) {
      cb(cls)
    }
  }
}

export function handleCreateClass (token: string, grade: string, name: string, cb?: (cls: IClass) => void) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const newClass = await fetchCreateClass(token, grade, name)
    dispatch(createClass(newClass))

    dispatch(hideLoading())

    if (cb !== undefined) {
      cb(newClass)
    }
  }
}

export function handleRehydrateClasses (cb?: any) {
  return async (dispatch: any) => {
    const classes = await getCached('classes')

    dispatch(rehydrateClasses(classes))

    if (cb !== undefined) {
      cb()
    }
  }
}

export function handleReceiveTestParameters (token: string, selectedClass: string, cb?: any) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const testParameters = await fetchTestParameters(token, selectedClass)
    dispatch(receiveTestParameters(testParameters))

    dispatch(hideLoading())

    if (cb !== undefined) {
      cb()
    }
  }
}