import { handleError } from './request'
import { ITeacher } from '../interfaces'

export const saveSignUpTeacher = async (email: string, password: string): Promise<ITeacher> => {
  const functionName = 'saveSignUpTeacher'
  const query = `
    mutation createTeacher($email: String!, $password: String!) {
      createTeacher(email: $email, password: $password) {
        id
        name
        classes {
          id
          code
          grade
          testParameters {
            id
            duration
            numbers
            operators
            questions
            randomQuestions
          }
          students {
            id
            name
          }
        }
        user {
          email
          token
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
        variables: { email, password }
      })
    })
    const { data, errors } = await response.json()

    if (errors !== undefined) {
      throw errors[0]
    }

    return data.createTeacher

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const saveSignInTeacher = async (email: string, password: string): Promise<ITeacher> => {
  const functionName = 'saveSignInTeacher'
  const query = `
    query getTeacher($email: String!, $password: String!) {
      getTeacher(email: $email, password: $password) {
        id
        name
        classes {
          id
          code
          grade
          testParameters {
            id
            duration
            numbers
            operators
            questions
            randomQuestions
          }
          students {
            id
            name
          }
        }
        user {
          email
          token
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
        variables: { email, password }
      })
    })
    const { data, errors } = await response.json()

    if (errors !== undefined) {
      throw errors[0]
    }

    return data.getTeacher

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

/*
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
*/