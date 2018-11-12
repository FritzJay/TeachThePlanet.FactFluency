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

export default function classes (state: any = {}, action: any) {
  switch (action.type) {
    case ADD_CLASS:
      return {
        ...state,
        [action.class.id]: action.class,
      }

    case UPDATE_CLASS:
      return {
        ...state,
        [action.class.id]: {
          ...state[action.class.id],
          ...action.class,
        },
      }

    case REMOVE_CLASS:
      return {
        ...state,
        [action.classId]: undefined,
      }

    case ADD_STUDENT || UPDATE_STUDENT || REMOVE_STUDENT: {
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