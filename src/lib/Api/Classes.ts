import { IClass, IRequest } from "../Interfaces";
import { Requests } from "../lib";

export const getClasses = async (token: string): Promise<{ classes: IClass[] }> => {
  const request: IRequest = {
    method: "GET",
    token,
  }

  const url = `${process.env.REACT_APP_API_URL}/teachers/classes`

  return await Requests.jsonFetch(url, request)
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