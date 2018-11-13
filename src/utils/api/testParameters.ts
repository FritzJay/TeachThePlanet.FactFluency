import { ITestParameters, IUpdateTestParameters } from ".."
import { handleError } from "./request"


export const fetchTestParameters = async (token: string, testParametersID: string): Promise<ITestParameters> => {
  const functionName = 'fetchTestParameters'
  const query = `
    query getTestParameters($token: String!, $id: String!) {
      getTestParameters(token: $token, id: $id) {
        id
        duration
        numbers
        operators
        questions
        randomQuestions
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
        variables: { token, id: testParametersID }
      })
    })
    const { data, errors } = await response.json()

    if (errors !== undefined) {
      throw errors[0]
    }

    return data.getTestParameters

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const saveUpdateTestParameters = async (token: string, testParametersID: string, updates: IUpdateTestParameters): Promise<ITestParameters> => {
  const functionName = 'saveUpdateTestParameters'
  const query = `
    mutation changeTestParameters($token: String!, $updates: TestParametersInput!) {
      changeTestParameters(token: $token, updates: $updates) {
        id
        duration
        numbers
        operators
        questions
        randomQuestions
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
        variables: { token, updates: { id: testParametersID, ...updates }}
      })
    })
    const { data, errors } = await response.json()

    if (errors !== undefined) {
      throw errors[0]
    }

    return data.changeTestParameters

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}
