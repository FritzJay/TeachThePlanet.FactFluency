import { handleError } from "./request"

export const saveCreateInvitation = async (token: string, classId: string, email: string): Promise<void> => {
  const functionName = 'saveCreateInvitation'
  const query = `
    mutation createClassInvitation($input: CreateClassInvitationInput!) {
      createClassInvitation(input: $input) {
        id,
        course {
          id,
          code,
          grade,
          name
        },
        student {
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
            classId,
            email,
          },
        },
        operationName: 'createClassInvitation',
      })
    })
    const { data, errors } = await response.json()
    
    if (errors !== undefined) {
      throw errors[0].message
    }
    
    return data.createClassInvitations
    
  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}
