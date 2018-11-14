import { hideLoading, showLoading } from "react-redux-loading"
import {
  fetchTestResults,
  saveSignUpStudent,
  saveSignInStudent,
  saveNewTest,
  INewTestParameters
} from "src/utils/api"
import { 
  receiveTest,
  receiveTestResults,
  rehydrateFactFluency,
} from '../actions/factFluency'
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

export function handleReceiveTest (token: string, { classID, num, operator }: INewTestParameters) {
  return async (dispatch: any) => {
    dispatch(showLoading())
    const test = await saveNewTest(token, {
      classID,
      num,
      operator
    })
    console.log('Test from handleReceiveTest', test)
    dispatch(receiveTest(test))
    dispatch(hideLoading())
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