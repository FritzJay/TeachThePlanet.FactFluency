import { hideLoading, showLoading } from "react-redux-loading"
import {
  fetchAvailableTests,
  fetchNewTest,
  fetchTestResults,
  saveSignUpStudent,
  saveSignInStudent
} from "src/utils/api"
import { 
  receiveAvailableTests,
  receiveTest,
  receiveTestResults,
  rehydrateFactFluency,
} from '../actions/factFluency'
import { INewTestParameters } from "src/utils/tempInterfaces"
import { ITest, getCached } from "src/utils"
import { addUser } from "src/actions/user"
import { signInStudent } from "src/actions/students"

export const handleSignUpStudent = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    const student = await saveSignUpStudent(email, password)
    dispatch(addUser(student.user))
    dispatch(signInStudent(student))
    dispatch(hideLoading())
  }
}

export const handleSignInStudent = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    const student = await saveSignInStudent(email, password)
    dispatch(addUser(student.user))
    dispatch(signInStudent(student))
    dispatch(hideLoading())
  }
}

export function handleReceiveAvailableTests (token: string, cb?: any) {
  return async (dispatch: any) => {
    dispatch(showLoading())
    const availableTests = await fetchAvailableTests(token)
    dispatch(receiveAvailableTests(availableTests))
    dispatch(hideLoading())
    if (cb !== undefined) {
      cb()
    }
  }
}

export function handleReceiveTest (token: string, newTestParameters: INewTestParameters, cb?: any) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const test = await fetchNewTest(token, {
      number: newTestParameters.testNumber.number,
      operator: newTestParameters.operator,
    })
    dispatch(receiveTest(test))

    dispatch(hideLoading())

    if (cb !== undefined) {
      cb()
    }
  }
}

export function handleReceiveTestResults (token: string, test: ITest, cb?: any) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const testResults = await fetchTestResults(token, test)
    dispatch(receiveTestResults(testResults))

    dispatch(hideLoading())

    if (cb !== undefined) {
      cb()
    }
  }
}

export function handleRehydrateFactFluency (cb?: any) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const factFluency = await getCached('factFluency')
    dispatch(rehydrateFactFluency(factFluency))

    dispatch(hideLoading())

    if (cb !== undefined) {
      cb()
    }
  }
}