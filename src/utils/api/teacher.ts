import { handleError } from './request'
import { ITeacherUser } from '../interfaces'

export const saveSignUpTeacher = async (email: string, password: string): Promise<ITeacherUser> => {
  const functionName = 'saveSignUpTeacher'
  const query = `
    mutation createTeacher($input: CreateTeacherInput!) {
      createTeacher(input: $input) {
        id,
        name,
        courses {
          id,
          code,
          grade,
          name,
          testParameters {
            id,
            duration,
            numbers,
            operators,
            questions,
            randomQuestions
          }
        },
        user {
          email,
          role
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
        variables: {
          input: {
            user: { email, password },
          },
        },
        operationName: 'createTeacher',
      })
    })
    const { data, errors } = await response.json()
    const { courses, ...rest } = data.createTeacher
    
    if (errors !== undefined) {
      throw errors[0]
    }
    
    return {
      ...rest,
      classes: courses
    }
    
  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const saveGetTeacher = async (token: string): Promise<ITeacherUser> => {
  const functionName = 'saveGetTeacher'
  const query = `
    query teacher($id: ObjID) {
      teacher(id: $id) {
        id,
        name,
        courses {
          id,
          code,
          grade,
          name,
          testParameters {
            id,
            duration,
            numbers,
            operators,
            questions,
            randomQuestions
          }
        },
        user {
          email,
          role
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
        'Authorization': 'jwt ' + token
      },
      body: JSON.stringify({
        query,
        operationName: 'teacher',
      })
    })
    const { data, errors } = await response.json()
    const { courses, ...rest } = data.teacher

    if (errors !== undefined) {
      throw errors[0]
    }

    return {
      ...rest,
      classes: courses
    }

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
