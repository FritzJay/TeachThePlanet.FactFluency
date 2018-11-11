import { jsonFetch, handleError, validateResponse } from './request'
import { INewClassParameters, IClass } from '../interfaces'

export const saveAddClass = async (token: string, cls: INewClassParameters): Promise<IClass> => {
  const functionName = 'saveAddClass'
  try {
    const response = await jsonFetch(
      `${process.env.REACT_APP_API_URL}/classes/`,
      {
        body: { class: cls },
        method: 'PUT',
        token,
      }
    )
    validateResponse(functionName, response)
    return response.class
  } catch (error) {
    handleError(functionName, error)
  }
}

export const saveUpdateClass = async (token: string, classId: string, updates: INewClassParameters): Promise<IClass> => {
  const functionName = 'saveUpdateClass'
  try {
    const response = await jsonFetch(
      `${process.env.REACT_APP_API_URL}/classes/`,
      {
        body: {
          id: classId,
          updates,
        },
        method: 'PATCH',
        token,
      }
    )
    validateResponse(functionName, response)
    return response.class
  } catch (error) {
    handleError(functionName, error)
  }
}

export const saveRemoveClass = async (token: string, classId: string): Promise<IClass> => {
  const functionName = 'saveUpdateClass'
  try {
    const response = await jsonFetch(
      `${process.env.REACT_APP_API_URL}/classes/`,
      {
        body: { classId },
        method: 'DELETE',
        token,
      }
    )
    validateResponse(functionName, response)
    return response.class
  } catch (error) {
    handleError(functionName, error)
  }
}