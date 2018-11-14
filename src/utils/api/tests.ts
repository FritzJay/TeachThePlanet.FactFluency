import { jsonFetch, handleError, validateResponse } from './request'
import { ITest, ITestResults } from '../interfaces';

export interface INewTestParameters {
  classID: string
  num: number
  operator: string
}

export const saveNewTest = async (token: string, { classID, num, operator }: INewTestParameters): Promise<ITest> => {
  const functionName = 'saveNewTest'
  const query = `
    mutation newTest($token: String!, $classID: String!, $number: Int!, $operator: String!) {
      newTest(token: $token, classID: $classID, number: $number, operator: $operator) {
        id,
        duration,
        start,
        end,
        questions {
          question,
          studentAnswer,
          correctAnswer,
          start,
          end
        }
      }
    }
  `
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { token, classID, number: num, operator }
      })
    })
    const { data, errors } = await response.json()

    if (errors !== undefined) {
      throw errors[0]
    }

    return data.newTest

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