import { ITestParameters } from '../utils'

export const UPDATE_TEST_PARAMETERS = 'UPDATE_TEST_PARAMETERS'

export const updateTestParameters = (classId: string, testParameters: ITestParameters) => ({
  type: UPDATE_TEST_PARAMETERS,
  classId,
  testParameters,
})