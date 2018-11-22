import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {
  saveCreateInvitation,
  saveRemoveInvitation,
  saveAcceptInvitation,
} from '../api'
import { addInvitation, removeInvitation, declineInvitation } from '../actions/courseInvitations'
import { addClass } from 'src/actions/courses';

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

export const handleAcceptInvitation = (token: string, courseInvitationId: string) => {
  return async (dispatch: any) => {
    dispatch(showLoading())
    try {
      const course = await saveAcceptInvitation(token, courseInvitationId)
      dispatch(declineInvitation(courseInvitationId))
      dispatch(addClass(course))
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
