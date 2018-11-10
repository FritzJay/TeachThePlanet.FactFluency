import { hideLoading, showLoading } from "react-redux-loading";
import { getCached } from "src/lib";
import { fetchAvailableTests, fetchNewTest, fetchTestResults } from "src/lib/Api/Tests";
import { IAvailableTests, INewTestParameters, ITest, ITestResults } from "src/lib/Interfaces";

export const REHYDRATE_FACT_FLUENCY = 'REHYDRATE_FACT_FLUENCY'
export const RECEIVE_AVAILABLE_TESTS = 'RECEIVE_AVAILABLE_TESTS'
export const REMOVE_AVAILABLE_TESTS = 'REMOVE_AVAILABLE_TESTS'
export const SET_NEW_TEST_PARAMETERS = 'SET_TEST_PARAMETERS'
export const REMOVE_TEST_PARAMETERS = 'REMOVE_TEST_PARAMETERS'
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

export function receiveAvailableTests (availableTests: IAvailableTests) {
  return {
    type: RECEIVE_AVAILABLE_TESTS,
    availableTests,
  }
}

export function removeAvailableTests () {
  return {
    type: REMOVE_AVAILABLE_TESTS,
    availableTests: null,
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
    type: REMOVE_TEST_PARAMETERS,
    testParameters: null,
  }
}

export function receiveTest (test: ITest) {
  return {
    type: RECEIVE_TEST,
    test,
  }
}

export function updateTest (test: ITest) {
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

export function handleReceiveAvailableTests (token: string) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const availableTests = await fetchAvailableTests(token)
    dispatch(receiveAvailableTests(availableTests))

    dispatch(hideLoading())
  }
}

export function handleReceiveTest (token: string, newTestParameters: INewTestParameters) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const test = await fetchNewTest(token, {
      number: newTestParameters.testNumber.number,
      operator: newTestParameters.operator,
    })
    dispatch(receiveTest(test))

    dispatch(hideLoading())
  }
}

export function handleReceiveTestResults (token: string, test: ITest) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const testResults = await fetchTestResults(token, test)
    dispatch(receiveTestResults(testResults))

    dispatch(hideLoading())
  }
}

export function handleRehydrateFactFluency () {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const factFluency = await getCached('factFluency')
    dispatch(rehydrateFactFluency(factFluency))

    dispatch(hideLoading())
  }
}