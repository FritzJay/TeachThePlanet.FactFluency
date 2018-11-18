import { ITest, ITestResults } from "src/utils/interfaces"
import { INewTestParameters } from "src/utils/api"

export const REHYDRATE_FACT_FLUENCY = 'REHYDRATE_FACT_FLUENCY'
export const SET_NEW_TEST_PARAMETERS = 'SET_NEW_TEST_PARAMETERS'
export const REMOVE_NEW_TEST_PARAMETERS = 'REMOVE_NEW_TEST_PARAMETERS'
export const RECEIVE_TEST = 'RECEIVE_TEST'
export const REMOVE_TEST = 'REMOVE_TEST'
export const RECEIVE_TEST_RESULTS = 'RECEIVE_TEST_RESULTS'
export const REMOVE_TEST_RESULTS = 'REMOVE_TEST_RESULTS'
export const UPDATE_TEST = 'UPDATE_TEST'

export function rehydrateFactFluency (factFluency: any) {
  return {
    type: REHYDRATE_FACT_FLUENCY,
    factFluency,
  }
}

export function setNewTestParameters (newTestParameters: INewTestParameters) {
  return {
    type: SET_NEW_TEST_PARAMETERS,
    newTestParameters,
  }
}

export function removeTestParameters () {
  return {
    type: REMOVE_NEW_TEST_PARAMETERS,
    testParameters: null,
  }
}

export function receiveTest (test: ITest) {
  return {
    type: RECEIVE_TEST,
    test,
  }
}

export function updateTest (test: any) {
  return {
    type: UPDATE_TEST,
    test,
  }
}

export function removeTest () {
  return {
    type: REMOVE_TEST,
    test: null,
  }
}

export function receiveTestResults (testResults: ITestResults) {
  return {
    type: RECEIVE_TEST_RESULTS,
    testResults
  }
}

export function removeTestResults () {
  return {
    type: REMOVE_TEST_RESULTS,
    testResults: null,
  }
}
