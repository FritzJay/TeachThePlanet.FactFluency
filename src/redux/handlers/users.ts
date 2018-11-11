import { hideLoading, showLoading } from 'react-redux-loading' 
import { getCached, IUser } from 'src/lib'
import { login, signup } from 'src/lib/Api/Sessions'
import { 
  receiveUser,
  rehydrateUser,
} from '../actions/user'

export function handleLoginUser (email: string, password: string, userType: string, cb?: (user: IUser) => void) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const { user, token } = await login(email, password, userType)
    dispatch(receiveUser({ ...user, token }))

    dispatch(hideLoading())

    if (cb !== undefined) {
      cb({ ...user, token })
    }
  }
}

export function handleSignUpUser (email: string, password: string, userType: string, cb?: (user: IUser) => void) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const { user, token } = await signup(email, password, userType)
    dispatch(receiveUser({ ...user, token }))

    dispatch(hideLoading())

    if (cb !== undefined) {
      cb({ ...user, token })
    }
  }
}

export function handleRehydrateUser (cb?: () => void) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const user = await getCached('user')
    if (user !== null && user !== {}) {
      dispatch(rehydrateUser(user))
    }

    dispatch(hideLoading())

    if (cb !== undefined) {
      cb()
    }
  }
}