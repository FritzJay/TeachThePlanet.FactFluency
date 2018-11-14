import { handleError } from './request'
import { IStudentUser } from '../interfaces'

export const saveSignUpStudent = async (email: string, password: string): Promise<IStudentUser> => {
  const functionName = 'saveSignUpStudent'
  const query = `
    mutation signUpStudent($email: String!, $password: String!) {
      signUpStudent(email: $email, password: $password) {
        id
        name
        classes {
          id
          code
          grade
          name
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

    return data.signUpStudent

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const saveSignInStudent = async (email: string, password: string): Promise<IStudentUser> => {
  const functionName = 'saveSignInStudent'
  const query = `
    query signInStudent($email: String!, $password: String!) {
      signInStudent(email: $email, password: $password) {
        id
        name
        classes {
          id
          code
          grade
          name
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

    return data.signInStudent

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}



/*
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
*/