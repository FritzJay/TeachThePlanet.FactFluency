import { jsonFetch, handleError, validateResponse } from './request'
import { ITest, ITestResults } from '../interfaces';

export const fetchNewTest = async (token: string, testParameters: { operator: string, number: number }): Promise<ITest> => {
  const functionName = 'fetchNewTest'
  try {
    const response = await jsonFetch(
      `${process.env.REACT_APP_API_URL}/tests/new`, {
        body: testParameters,
        method: "POST",
        token,
      })
    validateResponse(functionName, response)
    return response.test
  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const fetchTestResults = async (token: string, test: ITest): Promise<ITestResults> => {
  const functionName = 'fetchNewTest'
  try {
    const response = await jsonFetch(
      `${process.env.REACT_APP_API_URL}/tests/grade`, {
        body: test,
        method: "POST",
        token,
      })
    validateResponse(functionName, response)
    return response.testResults
  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}