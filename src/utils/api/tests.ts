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
          id,
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
    mutation gradeTest($id: ObjID!, $input: GradeTestInput!) {
      gradeTest(id: $id, input: $input) {
        id,
        testResults {
          total,
          needed,
          correct,
          incorrect {
            question,
            studentAnswer,
            correctAnswer,
            start,
            end
          },
          quickest {
            question,
            studentAnswer,
            correctAnswer,
            start,
            end
          },
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
          id: test.id,
          input: {
            start: test.start,
            end: test.end,
            questions: test.questions.map(({ id, studentAnswer, start, end }) => ({ id, studentAnswer, start, end })),
          },
        },
        operationName: 'gradeTest',
      })
    })
    const { data, errors } = await response.json()

    if (errors !== undefined) {
      throw errors[0]
    }

    return data.gradeTest.testResults

  } catch (error) {
    handleError(functionName, error)
    throw error
  }
}