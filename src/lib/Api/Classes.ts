import { IClass, IRequest } from "../Interfaces";
import { Requests } from "../lib";

export const fetchClasses = async (token: string): Promise<IClass[]> => {
  const request: IRequest = {
    method: "GET",
    token,
  }

  try {
    const response = await Requests.jsonFetch(`${process.env.REACT_APP_API_URL}/teachers/classes`, request)

    if (response.error !== undefined) {
      throw (response.error)
    }

    return response.classes

  } catch(error) {
    console.warn('fetchClasses failed with error', error)
    throw error
  }
}

export const createClass = async (token: string, grade: string, name: string) => {
  const request: IRequest = {
    body: { grade, name },
    method: "PUT",
    token,
  }

  const url = `${process.env.REACT_APP_API_URL}/classes/`

  const cls = await Requests.jsonFetch(url, request)

  return cls
}

export const updateClass = async (token: string, { _id, ...classParams }: IClass) => {
  const request: IRequest = {
    body: {
      classID: _id,
      updates: classParams
    },
    method: "PATCH",
    token
  }

  const url = `${process.env.REACT_APP_API_URL}/classes/`

  const cls = await Requests.jsonFetch(url, request)

  return cls
}

export const deleteClass = async (token: string, classID: string) => {
  const request: IRequest = {
    body: { classID },
    method: "DELETE",
    token
  }

  const url = `${process.env.REACT_APP_API_URL}/classes/`

  const cls = await Requests.jsonFetch(url, request)

  return cls
}