import { ITestParameters, IUpdateTestParameters } from "src/utils"
import { handleError } from "./request"

export const saveUpdateTestParameters = async (token: string, testParametersID: string, input: IUpdateTestParameters): Promise<ITestParameters> => {
  const functionName = 'saveUpdateTestParameters'
  const query = `
    mutation updateTestParameters($id: ObjID!, $input: UpdateTestParametersInput!) {
      updateTestParameters(id: $id, input: $input) {
        id
        duration
        questions
        randomQuestions
        numbers
        operators
      }
    }
  `
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'jwt ' + token,
      },
      body: JSON.stringify({
        query,
        variables: { id: testParametersID, input },
        operationName: 'updateTestParameters',
      })
    })
    const { data, errors } = await response.json()

    if (errors !== undefined) {
      throw errors[0]
    }

    return data.updateTestParameters

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}
