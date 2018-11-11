import { jsonFetch, handleError, validateResponse } from './request'
import { ITestParameters } from '../interfaces'

export const saveUpdateTestParameters = async (token: string, { id, ...updates }: ITestParameters): Promise<ITestParameters> => {
  const functionName = 'saveUpdateTestParameters'
  try {
    const response = await jsonFetch(
      `${process.env.REACT_APP_API_URL}/testParameters/`,
      {
        body: {
          id,
          updates,
        },
        method: 'PATCH',
        token,
      }
    )
    validateResponse(functionName, response)
    return response.student
  } catch (error) {
    handleError(functionName, error)
  }
}