import { hideLoading, showLoading } from 'react-redux-loading' 
import { login, signup } from 'src/lib/Api/Sessions';
import { IUser } from "src/lib/Interfaces";
import { Caching } from 'src/lib/lib';

export const REHYDRATE_USER = 'REHYDRATE_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const RECEIVE_USER = 'RECEIVE_USER'

export function rehydrateUser (user: any) {
  return {
    type: REHYDRATE_USER,
    user,
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

export function handleRehydrateUser () {
  return async (dispatch: any) => {
    const user = await Caching.getCached('user')
    console.log(user)
    if (user !== null && user !== {}) {
      dispatch(rehydrateUser(user))
    }
  }
}