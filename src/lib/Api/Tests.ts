import { IAvailableTests, IRequest } from "../Interfaces";
import { Requests } from "../lib";

export const getAvailableTests = async (token: string): Promise<IAvailableTests> => {
  const requestParams: IRequest = {
    method: "GET",
    token,
  }

  try {
    return await Requests.jsonFetch(`${process.env.REACT_APP_API_URL}/tests/available`, requestParams)
  } catch(error) {
    console.warn('getAvailableTests failed with error', error)
    throw error
  }
}
