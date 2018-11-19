import {
  ADD_INVITATION,
} from '../actions/invitations'

export default function invitations (state: any = [], action: any) {
  switch (action.type) {
    case ADD_INVITATION: {
      return state.concat(action.studentId)
    }

    default:
      return state
  }
}