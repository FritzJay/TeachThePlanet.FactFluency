import {
  ADD_INVITATION,
  REMOVE_INVITATION,
} from '../actions/courseInvitations'

import { SIGN_IN_STUDENT } from 'src/actions/students'

import { CLEAR_STORE } from 'src/actions/shared'
import { convertArrayOfObjectsWithIdsIntoObject } from './utils'

export default function courseInvitations (state: any = {}, action: any) {
  switch (action.type) {
    case CLEAR_STORE:
      return {}

    case SIGN_IN_STUDENT:
      return convertArrayOfObjectsWithIdsIntoObject(action.student.courseInvitations)
      
    case ADD_INVITATION: {
      return {
        ...state,
        [action.invitation.id]: action.invitation
      }
    }

    case REMOVE_INVITATION: {
      const newState = Object.assign({}, state)
      delete newState[action.id]
      return newState
    }

    default:
      return state
  }
}