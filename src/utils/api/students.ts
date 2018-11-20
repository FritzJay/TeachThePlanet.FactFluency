import { handleError } from './request'
import { ChangePasswordRequiredError } from '..'
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
            changePasswordRequired
            createdAt
            updatedAt
            user {
              id
              email
            }
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
          createdAt
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
            createdAt
            updatedAt
            changePasswordRequired
            user {
              id
              email
            }
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
          createdAt
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
    const { error, token, changePasswordRequired } = await response.json()

    if (error !== undefined) {
      throw error
    }

    if (changePasswordRequired) {
      throw new ChangePasswordRequiredError()
    }

    return token

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const saveChangeStudentPassword = async (email: string, password: string) => {
  const functionName = 'saveChangeStudentPassword'
  const query = `
    mutation updateNewStudent($input: UpdateNewStudentInput!) {
      updateNewStudent(input: $input) {
        id
        name
        createdAt
        updatedAt
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
        },
        user {
          email
        }
      }
    }
  `
  try {
    const user = {
      email,
      password
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: {
          input: { user },
        },
        operationName: 'updateNewStudent',
      })
    })
    const { data, errors } = await response.json()

    if (errors !== undefined) {
      throw errors[0]
    }

    return data.updateNewStudent

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
        createdAt
        updatedAt
        changePasswordRequired
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
        },
        user {
          email
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

export const saveRemoveStudentFromCourse = async (token: string, studentId: string, courseId: string): Promise<boolean> => {
  const functionName = 'saveRemoveStudentFromCourse'
  const query = `
    mutation removeStudentFromCourse($studentId: ObjID!, $courseId: ObjID!) {
      removeStudentFromCourse(studentId: $studentId, courseId: $courseId)
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
        variables: { token, courseId, studentId }
      })
    })
    const { errors, data } = await response.json()

    if (errors !== undefined) {
      throw errors[0]
    }

    return data.removeStudentFromCourse

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}
