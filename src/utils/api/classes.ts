import { IClass, INewClassParameters } from ".."
import { handleError } from "./request"

export const saveAddClass = async (token: string, grade: string, name: string): Promise<IClass> => {
  const functionName = 'saveAddClass'
  const query = `
    mutation addClass($token: String!, $grade: String!, $name: String!) {
      addClass(token: $token, grade: $grade, name: $name) {
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
        variables: { token, grade, name }
      })
    })
    const { data, errors } = await response.json()

    if (errors !== undefined) {
      throw errors[0]
    }

    return data.addClass

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}


export const saveUpdateClass = async (token: string, classId: string, updates: INewClassParameters): Promise<IClass> => {
  throw new Error('Not implemented')
}

export const saveRemoveClass = async (token: string, classId: string): Promise<IClass> => {
  throw new Error('Not implemented')
}