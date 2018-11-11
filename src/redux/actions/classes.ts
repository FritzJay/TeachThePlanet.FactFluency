import { IClass, ITestParameters } from 'src/lib';
export const REHYDRATE_CLASSES = 'REHYDRATE_CLASS'
export const CREATE_CLASS = 'CREATE_CLASS'
export const DELETE_CLASS = 'DELETE_CLASS'
export const RECEIVE_CLASS_LIST = 'RECEIVE_CLASS_LIST'
export const REMOVE_SELECTED_CLASS = 'REMOVE_SELECTED_CLASS'
export const REMOVE_TEST_PARAMETERS = 'REMOVE_TEST_PARAMETERS'
export const SET_SELECTED_CLASS = 'SET_SELECTED_CLASS'
export const UPDATE_CLASS = 'UPDATE_CLASS'
export const RECEIVE_TEST_PARAMETERS = 'RECEIVE_TEST_PARAMETERS'

export function rehydrateClasses (classes: any) {
  return {
    type: REHYDRATE_CLASSES,
    classes,
  }
}

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

export function createClass (newClass: IClass) {
  return {
    type: CREATE_CLASS,
    newClass
  }
}

export function receiveTestParameters (testParameters: ITestParameters) {
  return {
    type: RECEIVE_TEST_PARAMETERS,
    testParameters
  }
}

export function removeTestParameters () {
  return {
    type: REMOVE_TEST_PARAMETERS
  }
}