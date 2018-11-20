import { 
  SIGN_IN_TEACHER,
} from '../actions/teacherHome'

import {
  ADD_TEACHER,
  UPDATE_TEACHER,
  REMOVE_TEACHER,
} from '../actions/teachers'

import {
  ADD_CLASS,
  UPDATE_CLASS,
  REMOVE_CLASS,
} from '../actions/classes'
import classes from './classes'

import {
  ADD_STUDENT,
  UPDATE_STUDENT,
  REMOVE_STUDENT_FROM_CLASS,
} from '../actions/students'

import { UPDATE_TEST_PARAMETERS } from '../actions/testParameters'

import { CLEAR_STORE } from '../actions/shared'

import {
  ADD_INVITATION,
  REMOVE_INVITATION,
} from 'src/actions/invitations'

import { formatClasses } from './utils'

export default function teacherHome (state: any = {}, action: any) {
  switch (action.type) {
    case CLEAR_STORE: {
      return {}
    }

    case ADD_TEACHER:
    case UPDATE_TEACHER:
      throw new Error('Not implemented')
      break

    case SIGN_IN_TEACHER:
      return {
        ...state,
        ...action.teacher,
        classes: formatClasses(action.teacher.courses)
      }

    case REMOVE_TEACHER:
    case CLEAR_STORE:
      return {}

    case REMOVE_CLASS:
    case UPDATE_CLASS:
    case ADD_CLASS:
    case ADD_STUDENT:
    case UPDATE_STUDENT:
    case REMOVE_STUDENT_FROM_CLASS:
    case UPDATE_TEST_PARAMETERS:
    case ADD_INVITATION:
    case REMOVE_INVITATION:
      return {
        ...state,
        classes: classes(state.classes, action)
      }

    default:
      return state
  }
}