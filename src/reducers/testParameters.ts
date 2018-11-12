import {
  UPDATE_TEST_PARAMETERS,
} from '../actions/testParameters'

export default function testParameters (state: any = {}, action: any) {
  switch (action.type) {
    case UPDATE_TEST_PARAMETERS:
      return action.testParameters

    default:
      return state
  }
}