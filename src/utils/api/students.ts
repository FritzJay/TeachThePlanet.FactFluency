import { jsonFetch, handleError, validateResponse } from './request'
import { INewStudentParameters, IStudent } from '../interfaces'

export const saveAddStudent = async (token: string, classId: string, student: INewStudentParameters): Promise<IStudent> => {
  const functionName = 'saveAddStudent'
  try {
    const response = await jsonFetch(
      `${process.env.REACT_APP_API_URL}/students/`,
      {
        body: {
          classId,
          student,
        },
        method: 'PUT',
        token,
      }
    )
    validateResponse(functionName, response)
    return response.student
  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const saveUpdateStudent = async (token: string, { id, ...updates }: IStudent): Promise<IStudent> => {
  const functionName = 'saveUpdateStudent'
  try {
    const response = await jsonFetch(
      `${process.env.REACT_APP_API_URL}/students/`,
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
    throw error
  }
}

export const saveRemoveStudent = async (token: string, classId: string, studentId: string): Promise<IStudent> => {
  const functionName = 'saveUpdateStudent'
  try {
    const response = await jsonFetch(
      `${process.env.REACT_APP_API_URL}/students/`,
      {
        body: {
          classId,
          studentId,
        },
        method: 'DELETE',
        token,
      }
    )
    validateResponse(functionName, response)
    return response.student
  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}