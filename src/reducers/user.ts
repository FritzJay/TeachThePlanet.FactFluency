import {
  ADD_USER,
  UPDATE_USER,
  REMOVE_USER,
} from '../actions/user'

import { CLEAR_STORE } from '../actions/shared';

export default function user (state: any = {}, action: any) {
  switch (action.type) {
    case CLEAR_STORE: {
      return {}
    }

    case ADD_USER:
    case UPDATE_USER:
      localStorage.setItem('token', action.user ? action.user.token : '')
      return {
        ...state,
        ...action.user
      }

    case REMOVE_USER:
    case CLEAR_STORE:
      return {}

    default:
      return state
  }
}