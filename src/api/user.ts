import { handleError } from './request'
import { ChangePasswordRequiredError, IStudentUser, ITeacherUser } from 'src/utils'

export const saveSignInStudent = async (email: string, password: string): Promise<string> => {
  const functionName = 'saveSignInStudent'
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, username: email, password, role: 'student' })
    })
    const { error, token, changePasswordRequired } = await response.json()

    if (error !== undefined) {
      throw error
    }

    if (changePasswordRequired === true) {
      throw new ChangePasswordRequiredError()
    }

    return token

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const saveSignUpStudent = async (email: string, password: string): Promise<IStudentUser> => {
  const functionName = 'saveSignUpStudent'
  const query = `
    mutation createStudent($input: CreateStudentInput!) {
      createStudent(input: $input) {
        id
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
        variables: {
          input: {
            user: { email, username: email, password },
          },
        },
        operationName: 'createStudent',
      })
    })
    const { data, errors } = await response.json()
    
    if (errors !== undefined) {
      throw errors[0]
    }
    
    return data.createStudent
    
  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const saveSignUpTeacher = async (email: string, password: string): Promise<ITeacherUser> => {
  const functionName = 'saveSignUpTeacher'
  const query = `
    mutation createTeacher($input: CreateTeacherInput!) {
      createTeacher(input: $input) {
        id
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
        variables: {
          input: {
            user: { email, password },
          },
        },
        operationName: 'createTeacher',
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

export const saveSignInTeacher = async (email: string, password: string): Promise<string> => {
  const functionName = 'saveSignInTeacher'
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password, role: 'teacher' })
    })
    const { error, token } = await response.json()

    if (error !== undefined) {
      throw error
    }

    return token

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}
