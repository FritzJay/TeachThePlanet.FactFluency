import { showLoading, hideLoading } from 'react-redux-loading'
import {
  saveCreateInvitation,
} from '../utils/api'
import { addInvitation } from '../actions/invitations'

export const handleCreateInvitation = (token: string, classId: string, email: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    try {
      await saveCreateInvitation(token, classId, email)
      dispatch(addInvitation(classId, email))
    } finally {
      dispatch(hideLoading())
    }
  }
}