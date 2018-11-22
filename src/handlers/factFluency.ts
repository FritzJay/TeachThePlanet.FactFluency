import { hideLoading, showLoading } from 'react-redux-loading-bar'
import {
  saveTestResults,
  saveSignUpStudent,
  saveSignInStudent,
  saveGetStudent,
  saveNewTest,
  INewTestParameters
} from "src/api"
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
    const token = await saveSignInStudent(email, password)
    dispatch(addUser({
      ...student.user,
      token,
    }))
    dispatch(signInStudent(student))
    
    dispatch(hideLoading())
  }
}

export const handleSignInStudent = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    const token = await saveSignInStudent(email, password)
    const student = await saveGetStudent(token)
    dispatch(addUser({
      ...student.user,
      token,
    }))
    dispatch(signInStudent(student))
    dispatch(hideLoading())
  }
}

export function handleReceiveTest (token: string, studentID: string, { courseId, num, operator }: INewTestParameters) {
  return async (dispatch: any) => {
    dispatch(showLoading())
    const test = await saveNewTest(token, studentID, {
      courseId,
      num,
      operator
    })
    dispatch(receiveTest(test))
    dispatch(hideLoading())
  }
}

export function handleReceiveTestResults (token: string, test: ITest, cb?: any) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const testResults = await saveTestResults(token, test)
    dispatch(receiveTestResults(testResults))

    dispatch(hideLoading())
  }
}

export function handleRehydrateFactFluency (cb?: any) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const factFluency = await getCached('factFluency')
    dispatch(rehydrateFactFluency(factFluency))

    dispatch(hideLoading())
  }
}