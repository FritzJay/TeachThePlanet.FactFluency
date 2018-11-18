import { showLoading, hideLoading } from 'react-redux-loading'
import {
  saveSignInTeacher,
  saveSignUpTeacher,
  saveGetTeacher,
} from '../utils/api'
import { addUser } from '../actions/user'
import { signInTeacher } from 'src/actions/teacherHome'

export const handleSignUpTeacher = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    const teacher = await saveSignUpTeacher(email, password)
    const token = await saveSignInTeacher(email, password)
    dispatch(addUser({
      ...teacher.user,
      token,
    }))
    dispatch(signInTeacher(teacher))
    dispatch(hideLoading())
  }
}

export const handleSignInTeacher = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    const token = await saveSignInTeacher(email, password)
    const teacher = await saveGetTeacher(token)
    dispatch(addUser({
      ...teacher.user,
      token,
    }))
    dispatch(signInTeacher(teacher))
    dispatch(hideLoading())
  }
}