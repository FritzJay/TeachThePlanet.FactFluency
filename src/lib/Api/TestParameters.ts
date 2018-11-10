import { jsonFetch } from "..";
import { IRequest, ITestParameters } from "../Interfaces";

export const fetchTestParameters = async (token: string, classID: string): Promise<ITestParameters> => {
  const request: IRequest = {
    method: "GET",
    token
  }

  const url = `${process.env.REACT_APP_API_URL}/test-parameters/${classID}`

  const results = await jsonFetch(url, request)

  return results.testParameters
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

  const url = `${process.env.REACT_APP_API_URL}/test-parameters/`

  const cls = await jsonFetch(url, request)

  return cls
}