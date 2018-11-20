import { handleError } from './request'
import { IStudentUser, IStudent, ICreateAccountForStudentInput } from '../interfaces'

export const saveSignUpStudent = async (email: string, password: string): Promise<IStudentUser> => {
  const functionName = 'saveSignUpStudent'
  const query = `
    mutation createStudent($input: CreateStudentInput!) {
      createStudent(input: $input) {
        id,
        name,
        courses {
          id,
          code,
          grade,
          name,
          students {
            id
          },
          teacher {
            id,
            name
          }
          testParameters {
            id
            duration
            numbers
            operators
            questions
            randomQuestions
          }
        },
        tests {
          id,
          duration,
          start,
          end,
          questions {
            question,
            studentAnswer,
            correctAnswer,
            start,
            end,
          }
        },
        user {
          email,
          firstName,
          lastName,
          title,
          role
        },
        courseInvitations {
          id,
          course {
            id
            name
            createdAt
            teacher {
              id
              name
            }
          }
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
        operationName: 'createStudent',
      })
    })
    const { data, errors } = await response.json()
    const { courses, ...rest } = data.createStudent
    
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

export const saveGetStudent = async (token: string): Promise<IStudentUser> => {
  const functionName = 'saveGetStudent'
  const query = `
    query student($id: ObjID) {
      student(id: $id) {
        id,
        name,
        courses {
          id,
          code,
          grade,
          name,
          students {
            id
          },
          teacher {
            id,
            name
          }
          testParameters {
            id
            duration
            numbers
            operators
            questions
            randomQuestions
          }
        },
        tests {
          id,
          duration,
          start,
          end,
          questions {
            question,
            studentAnswer,
            correctAnswer,
            start,
            end,
          }
        },
        user {
          email,
          firstName,
          lastName,
          title,
          role
        },
        courseInvitations {
          id,
          course {
            id
            name
            createdAt
            teacher {
              id
              name
            }
          }
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
        operationName: 'student',
      })
    })
    const { data, errors } = await response.json()
    const { courses, ...rest } = data.student

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

export const saveSignInStudent = async (email: string, password: string): Promise<string> => {
  const functionName = 'saveSignInStudent'
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password, role: 'student' })
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

export const saveCreateAccountForStudent = async (token: string, courseId: string, input: ICreateAccountForStudentInput): Promise<IStudent> => {
  const functionName = 'saveCreateAccountForStudent'
  const query = `
    mutation createAccountForStudent($input: CreateAccountForStudentInput!) {
      createAccountForStudent(input: $input) {
        id
        name
        tests {
          id
          number
          operator
          testResults {
            id
            total
            needed
            correct
            createdAt
          }
        }
      }
    }
  `
  try {
    const { user, ...rest } = input
    const response = await fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'jwt ' + token
      },
      body: JSON.stringify({
        query,
        variables: {
          input: {
            ...rest,
            courseId,
            user: {
              ...user,
              password: 'teachtheplanet',
            },
          }
        },
        operationName: 'createAccountForStudent',
      })
    })
    const { data, errors } = await response.json()

    if (errors !== undefined) {
      throw errors[0]
    }

    return data.createAccountForStudent

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}
