import { IAvailableTests, IRequest, ITest, ITestResults } from "../Interfaces";
import { Requests } from "../lib";

export const fetchAvailableTests = async (token: string): Promise<IAvailableTests> => {
  const requestParams: IRequest = {
    method: "GET",
    token,
  }

  try {
    const response = await Requests.jsonFetch(`${process.env.REACT_APP_API_URL}/tests/available`, requestParams)

    if (response.error !== undefined) {
      throw (response.error)
    }

    return response.availableTests
    
  } catch(error) {
    console.warn('fetchAvailableTests failed with error', error)
    throw error
  }
}

export const fetchNewTest = async (token: string, testParameters: { operator: string, number: number }): Promise<ITest> => {
  const request: IRequest = {
    body: testParameters,
    method: "POST",
    token,
  }

  try {
    return await Requests.jsonFetch(`${process.env.REACT_APP_API_URL}/tests/new`, request)
  } catch (error) {
    console.warn('fetchNewTest failed with error', error)
    throw error
  }
}

export const fetchTestResults = async (token: string, test: ITest): Promise<ITestResults> => {
  const requestParams: IRequest = {
    body: test,
    method: "POST",
    token,
  }

  try {
    const response = await Requests.jsonFetch(`${process.env.REACT_APP_API_URL}/tests/grade`, requestParams)
    
    if (response.error !== undefined) {
      throw response.error
    }

    return response.testResults

  } catch(error) {
    console.warn('fetchTestResults failed with error', error)
    throw error
  }
}