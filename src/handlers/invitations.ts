import { showLoading, hideLoading } from 'react-redux-loading'
import {
  saveCreateInvitation,
} from '../utils/api'
import { addInvitation } from '../actions/invitations'

export const handleCreateInvitation = (token: string, classId: string, studentId: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    try {
      await saveCreateInvitation(token, classId, studentId)
      dispatch(addInvitation(classId, studentId))
    } catch (error) {
      alert('There was an error saving your changes. Please try again later.')
    } finally {
      dispatch(hideLoading())
    }
  }
}