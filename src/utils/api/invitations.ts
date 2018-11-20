import { handleError } from "./request"
import { ICourseInvitation, IClass } from "../interfaces"

export const saveCreateInvitation = async (token: string, classId: string, email: string): Promise<ICourseInvitation> => {
  const functionName = 'saveCreateInvitation'
  const query = `
    mutation createCourseInvitation($input: CreateCourseInvitationInput!) {
      createCourseInvitation(input: $input) {
        id
        createdAt
        course {
          id
          name
          teacher {
            id
            name
          }
        }
        student {
          id
          name
          createdAt
          updatedAt
          changePasswordRequired
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
        'Authorization': 'jwt ' + token,
      },
      body: JSON.stringify({
        query,
        variables: {
          input: {
            courseId: classId,
            email,
          },
        },
        operationName: 'createCourseInvitation',
      })
    })
    const { data, errors } = await response.json()
    
    if (errors !== undefined) {
      throw errors[0].message
    }
    
    return data.createCourseInvitation
    
  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const saveRemoveInvitation = async (token: string, id: string): Promise<string> => {
  const functionName = 'saveRemoveInvitation'
  const query = `
    mutation removeCourseInvitation($id: ObjID!) {
      removeCourseInvitation(id: $id)
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
        variables: { id },
        operationName: 'removeCourseInvitation',
      })
    })
    const { data, errors } = await response.json()
    
    if (errors !== undefined) {
      throw errors[0].message
    }
    
    return data.removeCourseInvitation.id
    
  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const saveAcceptInvitation = async (token: string, id: string): Promise<IClass> => {
  const functionName = 'saveAcceptInvitation'
  const query = `
    mutation acceptCourseInvitation($id: ObjID!) {
      acceptCourseInvitation(id: $id) {
        id
        code
        grade
        name
        students {
          id
          changePasswordRequired
        }
        teacher {
          id
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
      }
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
        variables: { id },
        operationName: 'acceptCourseInvitation',
      })
    })
    const { data, errors } = await response.json()
    
    if (errors !== undefined) {
      throw errors[0].message
    }
    
    return data.acceptCourseInvitation
    
  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}
