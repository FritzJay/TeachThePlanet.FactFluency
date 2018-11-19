import {
  SET_NEW_TEST_PARAMETERS,
  REMOVE_NEW_TEST_PARAMETERS,
  RECEIVE_TEST,
  REMOVE_TEST,
  REMOVE_TEST_RESULTS,
  UPDATE_TEST,
  RECEIVE_TEST_RESULTS,
  UPDATE_ACTIVE_CLASS,
} from '../actions/factFluency'

import {
  SIGN_IN_STUDENT,
  ADD_STUDENT,
  UPDATE_STUDENT,
  REMOVE_STUDENT
} from 'src/actions/students'

import {
  REMOVE_CLASS,
  UPDATE_CLASS,
  ADD_CLASS
} from 'src/actions/classes'
import classes from './classes'

import {
  ADD_INVITATION,
  REMOVE_INVITATION
} from 'src/actions/invitations'

import {
  formatClasses,
  formatCourseInvitations,
} from './utils'

import { UPDATE_TEST_PARAMETERS } from 'src/actions/testParameters'
import { CLEAR_STORE } from '../actions/shared'

export default function factFluency (state: any = {}, action: any) {
  switch (action.type) {
    case CLEAR_STORE:
      return {}

    case SIGN_IN_STUDENT:
      const formattedClasses = formatClasses(action.student.classes)
      return {
        ...state,
        ...action.student,
        classes: formattedClasses,
        activeClass: Object.keys(formattedClasses)[0],
        courseInvitations: formatCourseInvitations(action.student.courseInvitations),
      }

    case SET_NEW_TEST_PARAMETERS:
      return {
        ...state,
        newTestParameters: action.newTestParameters
      }

    case REMOVE_NEW_TEST_PARAMETERS: {
      const { testParameters, ...rest } = state
      return rest
    }

    case RECEIVE_TEST:
      return {
        ...state,
        test: action.test
      }

    case REMOVE_TEST: {
      const { test, ...rest } = state
      return rest
    }

    case UPDATE_TEST: {
      const { testTwo, ...rest } = state
      return {
        ...rest,
        test: action.test
      }
    }

    case RECEIVE_TEST_RESULTS:
      return {
        ...state,
        testResults: action.testResults
      }

    case REMOVE_TEST_RESULTS: {
      const { testResults, ...rest } = state
      return rest
    }

    case REMOVE_CLASS:
    case UPDATE_CLASS:
    case ADD_CLASS:
    case ADD_STUDENT:
    case UPDATE_STUDENT:
    case REMOVE_STUDENT:
    case UPDATE_TEST_PARAMETERS:
    case ADD_INVITATION:
    case REMOVE_INVITATION:
      return {
        ...state,
        classes: classes(state.classes, action)
      }

    case UPDATE_ACTIVE_CLASS:
      return {
        ...state,
        activeClass: state.classes
          ? state.classes[action.id]
          : {}
      }

    default:
      return state
  }
}