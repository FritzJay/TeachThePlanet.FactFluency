import { jsonFetch, handleError, validateResponse } from './request'
import { ITeacher, IUser } from '../interfaces'

export const saveSignUpTeacher = async (email: string, password: string): Promise<{ user: IUser, teacher: ITeacher }> => {
  const functionName = 'saveSignUpTeacher'
  try {
    const response = await jsonFetch(
      `${process.env.REACT_APP_API_URL}/teachers/sign-up`,
      {
        body: {
          email,
          password,
        },
        method: 'PUT',
      }
    )
    validateResponse(functionName, response)
    return response.teacher
  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const saveSignInTeacher = async (email: string, password: string): Promise<{ user: IUser, teacher: ITeacher }> => {
  const functionName = 'saveSignInTeacher'
  try {
    const response = await jsonFetch(
      `${process.env.REACT_APP_API_URL}/teachers/sign-in`,
      {
        body: {
          email,
          password,
        },
        method: 'POST',
      }
    )
    validateResponse(functionName, response)
    return {
      user: response.user,
      teacher: response.teacher
    }
  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const saveUpdateTeacher = async (token: string, { id, ...updates }: ITeacher): Promise<ITeacher> => {
  const functionName = 'saveUpdateTeacher'
  try {
    const response = await jsonFetch(
      `${process.env.REACT_APP_API_URL}/teachers/`,
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
    return response.teacher
  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const saveRemoveTeacher = async (token: string, teacherId: string): Promise<ITeacher> => {
  const functionName = 'saveUpdateTeacher'
  try {
    const response = await jsonFetch(
      `${process.env.REACT_APP_API_URL}/teachers/`,
      {
        body: { teacherId },
        method: 'DELETE',
        token,
      }
    )
    validateResponse(functionName, response)
    return response.teacher
  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}