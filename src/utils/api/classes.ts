import { IClass, INewClassParameters } from ".."
import { handleError } from "./request"


export const fetchClass = async (token: string, classID: string): Promise<IClass> => {
  const functionName = 'fetchClass'
  const query = `
    query getClass($token: String!, $id: String!) {
      getClass(token: $token, id: $id) {
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
        variables: { token, id: classID }
      })
    })
    const { data, errors } = await response.json()

    if (errors !== undefined) {
      throw errors[0]
    }

    return data.getClass

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const saveAddClass = async (token: string, grade: string, name: string): Promise<IClass> => {
  const functionName = 'saveAddClass'
  const query = `
    mutation createCourse($input: CreateCourseInput!) {
      createCourse(input: $input) {
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
          input: { grade, name }
        },
        operationName: 'createCourse',
      })
    })
    const { data, errors } = await response.json()

    if (errors !== undefined) {
      throw errors[0]
    }

    return data.createCourse

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const saveUpdateClass = async (token: string, classID: string, updates: INewClassParameters): Promise<IClass> => {
  const functionName = 'saveUpdateClass'
  const query = `
    mutation changeClass($token: String!, $updates: ClassInput!) {
      changeClass(token: $token, updates: $updates) {
        id,
        name,
        code,
        grade
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
        variables: { token, updates: { id: classID, ...updates }}
      })
    })
    const { data, errors } = await response.json()

    if (errors !== undefined) {
      throw errors[0]
    }

    return data.changeClass

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const saveRemoveClass = async (token: string, classID: string) => {
  const functionName = 'saveRemoveClass'
  const query = `
    mutation removeClass($token: String!, $id: String!) {
      removeClass(token: $token, id: $id)
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
        variables: { token, id: classID }
      })
    })
    const { errors } = await response.json()

    if (errors !== undefined) {
      throw errors[0]
    }

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}