import { showLoading, hideLoading } from 'react-redux-loading'
import {
  saveCreateInvitation,
  saveRemoveInvitation,
} from '../utils/api'
import { addInvitation, removeInvitation, declineInvitation } from '../actions/invitations'

export const handleCreateInvitation = (token: string, classId: string, email: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    try {
      const invitation = await saveCreateInvitation(token, classId, email)
      dispatch(addInvitation(invitation.course.id, invitation))
    } finally {
      dispatch(hideLoading())
    }
  }
}

export const handleRemoveInvitation = (token: string, classId: string, id: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    try {
      await saveRemoveInvitation(token, id)
      dispatch(removeInvitation(classId, id))
    } finally {
      dispatch(hideLoading())
    }
  }
}

export const handleAcceptInvitation = (token: string, classId: string, courseInvitationId: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    try {
      /*
      const invitation = await saveAcceptInvitation(token, courseInvitationId)
      dispatch(addInvitation(classId, invitation))
      */
      console.log('SAVING INVITATION')
    } finally {
      dispatch(hideLoading())
    }
  }
}

export const handleDeclineInvitation = (token: string, courseInvitationId: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    try {
      await saveRemoveInvitation(token, courseInvitationId)
      dispatch(declineInvitation(courseInvitationId))
    } finally {
      dispatch(hideLoading())
    }
  }
}