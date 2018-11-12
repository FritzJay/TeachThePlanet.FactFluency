import {
  ADD_USER,
  UPDATE_USER,
  REMOVE_USER,
} from '../actions/user'

import { CLEAR_STORE } from 'src/actions/shared';

export default function user (state: any = {}, action: any) {
  switch (action.type) {
    case ADD_USER || UPDATE_USER:
      return {
        ...state,
        ...action.user
      }

    case REMOVE_USER || CLEAR_STORE:
      return {}

    default:
      return state
  }
}