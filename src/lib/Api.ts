import { IClass, IRequest, IUser } from "./Interfaces";
import { Requests } from "./lib";

interface ILogin {
  user: IUser
  token: string
}

export const login = (email: string, password: string, userType: string): Promise<ILogin> => {
  const request: IRequest = {
    body: {
      email,
      password,
      userType,
    },
    method: "POST",
  };

  const url = `${process.env.REACT_APP_API_URL}/${userType.toLowerCase()}s/signin`

  return Requests.jsonFetch(url, request)
}

export const signup = async (email: string, password: string, userType: string): Promise<ILogin> => {
  const request: IRequest = {
    body: {
      email,
      password,
      userType,
    },
    method: "POST",
  }

  const url = `${process.env.REACT_APP_API_URL}/${userType.toLowerCase()}s/create`

  await Requests.jsonFetch(url, request)

  return login(email, password, userType)
}

export const getClasses = async (token: string): Promise<IClass[]> => {
  const request: IRequest = {
    method: "GET",
    token,
  }

  const url = `${process.env.REACT_APP_API_URL}/teachers/classes`

  const classes = await Requests.jsonFetch(url, request)

  return classes
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