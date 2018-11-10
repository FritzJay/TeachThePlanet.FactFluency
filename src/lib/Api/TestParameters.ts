import { jsonFetch } from "..";
import { IRequest, ITestParameters } from "../Interfaces";

export const fetchTestParameters = async (token: string, classID: string): Promise<ITestParameters> => {
  const request: IRequest = {
    method: "GET",
    token
  }

  try {
    const response = await jsonFetch(`${process.env.REACT_APP_API_URL}/test-parameters/${classID}`, request)
    
    if (response.error !== undefined) {
      throw (response.error)
    }

    return response.testParameters

  } catch(error) {
    console.warn('fetchTestParameters failed with error', error)
    throw error
  }
}

export const updateTestParameters = async (token: string, { _id, ...testParams }: ITestParameters) => {
  const request: IRequest = {
    body: {
      testParametersID: _id,
      updates: testParams
    },
    method: "PATCH",
    token
  }

  try {
    const response = await jsonFetch(`${process.env.REACT_APP_API_URL}/test-parameters/`, request)
    
    if (response.error !== undefined) {
      throw (response.error)
    }

    return response.testParameters

  } catch(error) {
    console.warn('updateTestParameters failed with error', error)
    throw error
  }
}