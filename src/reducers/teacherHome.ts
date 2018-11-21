import { 
  SIGN_IN_TEACHER,
} from '../actions/teacherHome'

import {
  ADD_TEACHER,
  UPDATE_TEACHER,
  REMOVE_TEACHER,
} from '../actions/teachers'

import { CLEAR_STORE } from '../actions/shared'

export default function teacherHome (state: any = {}, action: any) {
  switch (action.type) {
    case CLEAR_STORE: {
      return {}
    }

    case ADD_TEACHER:
    case UPDATE_TEACHER:
      throw new Error('Not implemented')
      break

    case SIGN_IN_TEACHER: {
      const { courses, ...teacher } = action.teacher
      return {
        ...state,
        ...teacher
      }
    }

    case REMOVE_TEACHER:
    case CLEAR_STORE:
      return {}

    default:
      return state
  }
}