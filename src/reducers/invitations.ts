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
      const newState = Object.assign({}, state)
      delete newState[action.id]
      return newState
    }

    default:
      return state
  }
}