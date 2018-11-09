import { hideLoading, showLoading } from 'react-redux-loading' 
import { login } from 'src/lib/Api/Sessions';
import { IUser } from "src/lib/Interfaces";

export const RECEIVE_USER = 'RECEIVE_USER'

export function receiveUser (user: IUser) {
  return {
    type: RECEIVE_USER,
    user
  }
}

export function handleReceiveUser (email: string, password: string, userType: string) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const { user, token } = await login(email, password, userType)
    dispatch(receiveUser({ ...user, token }))

    dispatch(hideLoading())
  }
}