import {
  ADD_CLASS,
  UPDATE_CLASS,
  REMOVE_CLASS,
} from '../actions/classes'

import {
  ADD_STUDENT,
  UPDATE_STUDENT,
  REMOVE_STUDENT_FROM_COURSE,
} from '../actions/students'
import students from '../reducers/students'

import { 
  UPDATE_TEST_PARAMETERS,
} from '../actions/testParameters'
import testParameters from '../reducers/testParameters'

import { ADD_INVITATION, REMOVE_INVITATION } from 'src/actions/invitations'
import invitations from './invitations'

import { CLEAR_STORE } from '../actions/shared'

export default function classes (state: any = {}, action: any) {
  switch (action.type) {
    case CLEAR_STORE: {
      return {}
    }

    case ADD_CLASS:
      return {
        ...state,
        [action.class.id]: { ...action.class },
      }

    case UPDATE_CLASS:
      return {
        ...state,
        [action.class.id]: {
          ...state[action.class.id],
          ...action.class,
          students: students(state[action.class.id].students, action)
        },
      }

    case REMOVE_CLASS:
      const newState = Object.assign({}, state)
      delete newState[action.id]
      return newState

    case ADD_STUDENT:
    case UPDATE_STUDENT:
    case REMOVE_STUDENT_FROM_COURSE: {
      const { classId, ...remainingAction } = action

      return {
        ...state,
        [classId]: {
          ...state[classId],
          students: students(state[classId].students, remainingAction)
        }
      }
    }

    case UPDATE_TEST_PARAMETERS: {
      const { classId, ...remainingAction } = action

      return {
        ...state,
        [classId]: {
          ...state[classId],
          testParameters: testParameters(state[classId].testParameters, remainingAction)
        }
      }
    }

    case ADD_INVITATION:
    case REMOVE_INVITATION: {
      const courseInvitations = state[action.classId]
        ? state[action.classId].courseInvitations
        : {}
      return {
        ...state,
        [action.classId]: {
          ...state[action.classId],
          courseInvitations: invitations(courseInvitations, action)
        }
      }
    }

    default:
      return state
  }
}