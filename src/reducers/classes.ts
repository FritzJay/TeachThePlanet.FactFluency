import {
  ADD_CLASS,
  UPDATE_CLASS,
  REMOVE_CLASS,
} from '../actions/classes'

import {
  ADD_STUDENT,
  UPDATE_STUDENT,
  REMOVE_STUDENT,
} from '../actions/students'
import students from '../reducers/students'

import { 
  UPDATE_TEST_PARAMETERS,
} from '../actions/testParameters'
import testParameters from '../reducers/testParameters'
import { CLEAR_STORE } from '../actions/shared';

export default function classes (state: any = {}, action: any) {
  switch (action.type) {
    case CLEAR_STORE: {
      return {}
    }

    case ADD_CLASS:
      return {
        ...state,
        [action.class.id]: action.class,
      }

    case UPDATE_CLASS:
      console.log(state)
      console.log(action)
      return {
        ...state,
        [action.class.id]: {
          ...state[action.class.id],
          ...action.class,
        },
      }

    case REMOVE_CLASS:
      const newState = Object.assign({}, state)
      delete newState[action.id]
      return newState

    case ADD_STUDENT:
    case UPDATE_STUDENT:
    case REMOVE_STUDENT: {
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

    default:
      return state
  }
}