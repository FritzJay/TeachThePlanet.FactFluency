import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {
  saveSignInTeacher,
  saveSignUpTeacher,
  saveGetTeacher,
} from '../api'
import { addUser } from '../actions/user'
import { signInTeacher } from 'src/actions/teacherHome'

export const handleSignUpTeacher = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    try {
      const teacher = await saveSignUpTeacher(email, password)
      const token = await saveSignInTeacher(email, password)
      dispatch(addUser({
        ...teacher.user,
        token,
      }))
      dispatch(signInTeacher(teacher))
    } finally {
      dispatch(hideLoading())
    }
  }
}

export const handleSignInTeacher = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    try {
      const token = await saveSignInTeacher(email, password)
      const teacher = await saveGetTeacher(token)
      dispatch(addUser({
        ...teacher.user,
        token,
      }))
      dispatch(signInTeacher(teacher))
    } finally {
      dispatch(hideLoading())
    }
  }
}
