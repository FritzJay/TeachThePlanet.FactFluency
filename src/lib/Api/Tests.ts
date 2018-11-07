import { IAvailableTests, IRequest, ITest } from "../Interfaces";
import { Requests } from "../lib";

export const fetchAvailableTests = async (token: string): Promise<IAvailableTests> => {
  const requestParams: IRequest = {
    method: "GET",
    token,
  }

  try {
    return await Requests.jsonFetch(`${process.env.REACT_APP_API_URL}/tests/available`, requestParams)
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
