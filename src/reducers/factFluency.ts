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

import { SIGN_IN_STUDENT } from 'src/actions/students'

import { CLEAR_STORE } from '../actions/shared'

export default function factFluency (state: any = {}, action: any) {
  switch (action.type) {
    case CLEAR_STORE:
      return {}

    case SIGN_IN_STUDENT:
      console.log(state)
      console.log(action)
      return {
        ...state,
        activeClass: action.student.courses && action.student.courses.length > 0
          ? action.student.courses[0].id
          : {},
        id: action.student.id,
      }

    case UPDATE_ACTIVE_CLASS:
      return {
        ...state,
        activeClass: action.id,
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

    default:
      return state
  }
}