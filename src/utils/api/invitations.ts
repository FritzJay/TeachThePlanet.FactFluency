import { handleError } from "./request"

export const saveCreateInvitation = async (token: string, classId: string, email: string): Promise<void> => {
  const functionName = 'saveCreateInvitation'
  const query = `
    mutation createCourseInvitation($input: CreateCourseInvitationInput!) {
      createCourseInvitation(input: $input) {
        id,
        invitations {
          id,
          name
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
