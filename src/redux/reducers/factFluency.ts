import {
  RECEIVE_AVAILABLE_TESTS,
  RECEIVE_TEST,
  REMOVE_AVAILABLE_TESTS,
  REMOVE_TEST_PARAMETERS,
  SET_NEW_TEST_PARAMETERS,
} from '../actions/factFluency'

export default function factFluency (state: any = {}, action: any) {
  switch (action.type) {
    case RECEIVE_AVAILABLE_TESTS:
      return {
        ...state,
        availableTests: action.availableTests,
      }
    case REMOVE_AVAILABLE_TESTS:
      const { availableTests, ...allExceptAvailableTests } = state
      return allExceptAvailableTests
    case SET_NEW_TEST_PARAMETERS:
      return {
        ...state,
        newTestParameters: action.newTestParameters
      }
    case REMOVE_TEST_PARAMETERS:
      const { testParameters, ...allExceptTestParameters } = state
      return allExceptTestParameters
    case RECEIVE_TEST:
      return {
        ...state,
        test: action.test
      }
    default:
      return state
  }
}