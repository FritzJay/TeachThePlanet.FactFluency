import {
  RECEIVE_USER,
  REHYDRATE_USER,
  REMOVE_USER,
} from '../actions/user'

export default function user (state = {}, action: any) {
  switch (action.type) {
    case REHYDRATE_USER:
      return {
        ...state,
        ...action.user
      }

    case RECEIVE_USER:
      return {
        ...state,
        ...action.user,
      }

    case REMOVE_USER:
      return {}
      
    default:
      return state
  }
}