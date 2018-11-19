import {
  ADD_INVITATION,
  REMOVE_INVITATION,
} from '../actions/invitations'

export default function invitations (state: any = {}, action: any) {
  switch (action.type) {
    case ADD_INVITATION: {
      return {
        ...state,
        [action.invitation.id]: action.invitation
      }
    }

    case REMOVE_INVITATION: {
      return {
        ...state,
        [action.id]: undefined
      }
    }

    default:
      return state
  }
}