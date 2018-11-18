import {
  SET_NEW_TEST_PARAMETERS,
  REMOVE_NEW_TEST_PARAMETERS,
  RECEIVE_TEST,
  REMOVE_TEST,
  REMOVE_TEST_RESULTS,
  UPDATE_TEST,
  RECEIVE_TEST_RESULTS,
} from '../actions/factFluency'
import { SIGN_IN_STUDENT } from 'src/actions/students'
import { CLEAR_STORE } from '../actions/shared'
import { IClass } from 'src/utils'

export default function factFluency (state: any = {}, action: any) {
  switch (action.type) {
    case CLEAR_STORE:
      return {}

    case SIGN_IN_STUDENT:
      const formattedClasses = action.student.classes
        ? action.student.classes.reduce((acc: object, cls: IClass) => ({ ...acc, [cls.id]: cls }), {})
        : {}
      return {
        ...state,
        ...action.student,
        classes: formattedClasses,
        activeClass: Object.keys(formattedClasses)[0]
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