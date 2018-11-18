import { handleError } from './request'
import { ITest, ITestResults } from '../interfaces';

export interface INewTestParameters {
  classID: string
  num: number
  operator: string
}

export const saveNewTest = async (token: string, studentID: string, { classID, num, operator }: INewTestParameters): Promise<ITest> => {
  const functionName = 'saveNewTest'
  const query = `
    mutation createTest($input:CreateTestInput!) {
      createTest(input: $input) {
        id,
        duration,
        start,
        end,
        questions {
          question,
          studentAnswer,
          correctAnswer,
          start,
          end
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
            courseId: classID,
            studentId: studentID,
            number: num,
            operator,
          }
        },
        operationName: 'createTest',
      })
    })
    const { data, errors } = await response.json()

    if (errors !== undefined) {
      throw errors[0]
    }

    return data.createTest

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}

export const saveTestResults = async (token: string, test: ITest): Promise<ITestResults> => {
  const functionName = 'saveTestResults'
  const query = `
    mutation gradeTest($token: String!, $test: TestInput!) {
      gradeTest(token: $token, test: $test) {
        total
        needed
        correct
        incorrect {
          question
          studentAnswer
          correctAnswer
          start
          end
        }
        quickest {
          question
          studentAnswer
          correctAnswer
          start
          end
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
        variables: { token, test }
      })
    })
    const { data, errors } = await response.json()

    if (errors !== undefined) {
      throw errors[0]
    }

    return data.gradeTest

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}