import { hideLoading, showLoading } from "react-redux-loading";
import { fetchAvailableTests, fetchNewTest } from "src/lib/Api/Tests";
import { IAvailableTests, INewTestParameters, ITest } from "src/lib/Interfaces";

export const RECEIVE_AVAILABLE_TESTS = 'RECEIVE_AVAILABLE_TESTS'
export const REMOVE_AVAILABLE_TESTS = 'REMOVE_AVAILABLE_TESTS'
export const SET_NEW_TEST_PARAMETERS = 'SET_TEST_PARAMETERS'
export const REMOVE_TEST_PARAMETERS = 'REMOVE_TEST_PARAMETERS'
export const RECEIVE_TEST = 'RECEIVE_TEST'

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

export function handleReceiveAvailableTests (token: string) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const availableTests = await fetchAvailableTests(token)
    dispatch(receiveAvailableTests(availableTests))

    dispatch(hideLoading())
  }
}

export function handleReceiveTest (token: string, testParameters: INewTestParameters) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const test = await fetchNewTest(token, {
      number: testParameters.testNumber.number,
      operator: testParameters.operator,
    })
    dispatch(receiveTest(test))

    dispatch(hideLoading())
  }
}