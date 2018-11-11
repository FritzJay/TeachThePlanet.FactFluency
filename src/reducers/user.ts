import {
  ADD_USER,
  UPDATE_USER,
  REMOVE_USER,
} from '../actions/user'

export default function user (state: IUser = {}, action: any) {
  switch (action.type) {
    case ADD_USER || UPDATE_USER:
      return {
        ...state,
        ...action.user
      }

    case REMOVE_USER:
      return {}

    default:
      return state
  }
}