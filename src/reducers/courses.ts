import {
  ADD_CLASS,
  UPDATE_CLASS,
  REMOVE_CLASS,
} from '../actions/courses'

import {
  ADD_STUDENT,
  UPDATE_STUDENT,
  REMOVE_STUDENT_FROM_COURSE,
  SIGN_IN_STUDENT,
} from '../actions/students'
import students from './students'

import { 
  UPDATE_TEST_PARAMETERS,
} from '../actions/testParameters'
import testParameters from './testParameters'

import { ADD_INVITATION, REMOVE_INVITATION } from 'src/actions/courseInvitations'
import invitations from './courseInvitations'

import { CLEAR_STORE } from '../actions/shared'
import { formatCourses } from './utils'
import { SIGN_IN_TEACHER } from 'src/actions/teacherHome';

export default function courses (state: any = {}, action: any) {
  switch (action.type) {
    case SIGN_IN_STUDENT:
      return formatCourses(action.student.courses)

    case SIGN_IN_TEACHER:
      return formatCourses(action.teacher.courses)

    case CLEAR_STORE:
      return {}

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
          students: state[action.class.id]
            ? students(state[action.class.id].students, action)
            : {}
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