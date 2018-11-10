import { jsonFetch } from "..";
import { IClass, IRequest } from "../Interfaces";

export const fetchClasses = async (token: string): Promise<IClass[]> => {
  const request: IRequest = {
    method: "GET",
    token,
  }

  try {
    const response = await jsonFetch(`${process.env.REACT_APP_API_URL}/teachers/classes`, request)

    if (response.error !== undefined) {
      throw (response.error)
    }

    return response.classes

  } catch(error) {
    console.warn('fetchClasses failed with error', error)
    throw error
  }
}

export const createClass = async (token: string, grade: string, name: string): Promise<IClass> => {
  const request: IRequest = {
    body: { grade, name },
    method: "PUT",
    token,
  }

  try {
    const response = await jsonFetch(`${process.env.REACT_APP_API_URL}/classes/`, request)
  
    if (response.error !== undefined) {
      throw (response.error)
    }

    return response.class

  } catch(error) {
    console.warn('updateClass failed with error', error)
    throw error
  }
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

  try {
    const response = await jsonFetch(`${process.env.REACT_APP_API_URL}/classes/`, request)

    if (response.error !== undefined) {
      throw (response.error)
    }

    return response.cls

  } catch(error) {
    console.warn('updateClass failed with error', error)
    throw error
  }
}

export const deleteClass = async (token: string, classID: string) => {
  const request: IRequest = {
    body: { classID },
    method: "DELETE",
    token
  }

  try {
    const response = await jsonFetch(`${process.env.REACT_APP_API_URL}/classes/`, request)
  
    if (response.error !== undefined) {
      throw (response.error)
    }

    return response.cls

  } catch(error) {
    console.warn('deleteClass failed with error', error)
    throw error
  }
}