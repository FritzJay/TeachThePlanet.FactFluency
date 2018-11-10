import { hideLoading, showLoading } from 'react-redux-loading' 
import { login, signup } from 'src/lib/Api/Sessions';
import { IUser } from "src/lib/Interfaces";

export const LOGIN_USER = 'RECEIVE_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const RECEIVE_USER = 'RECEIVE_USER'

export function loginUser (user: IUser) {
  return {
    type: LOGIN_USER,
    user
  }
}

export function receiveUser (user: IUser) {
  return {
    type: RECEIVE_USER,
    user
  }
}

export function removeUser () {
  return {
    type: REMOVE_USER,
    user: null
  }
}

export function handleLoginUser (email: string, password: string, userType: string) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const { user, token } = await login(email, password, userType)
    dispatch(receiveUser({ ...user, token }))

    dispatch(hideLoading())
  }
}

export function handleSignUpUser (email: string, password: string, userType: string) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const { user, token } = await signup(email, password, userType)
    dispatch(receiveUser({ ...user, token }))

    dispatch(hideLoading())
  }
}