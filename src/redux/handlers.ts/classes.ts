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

export function handleCreateClass (token: string, grade: string, name: string) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const newClass = await fetchCreateClass(token, grade, name)
    dispatch(createClass(newClass))

    dispatch(hideLoading())
  }
}

export function handleRehydrateClasses () {
  return async (dispatch: any) => {
    const classes = await getCached('classes')

    dispatch(rehydrateClasses(classes))
  }
}

export function handleReceiveTestParameters (token: string, selectedClass: string) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const testParameters = await fetchTestParameters(token, selectedClass)
    dispatch(receiveTestParameters(testParameters))

    dispatch(hideLoading())
  }
}