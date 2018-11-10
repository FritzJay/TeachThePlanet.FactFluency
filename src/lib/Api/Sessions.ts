import { jsonFetch } from "..";
import { IRequest, IUser } from "../Interfaces";

interface ILogin {
  user: IUser
  token: string
}

export const login = async (email: string, password: string, userType: string): Promise<ILogin> => {
  const request: IRequest = {
    body: {
      email,
      password,
      userType,
    },
    method: "POST",
  };

  const url = `${process.env.REACT_APP_API_URL}/${userType.toLowerCase()}s/signin`

  const results = await jsonFetch(url, request)

  results.user.userType = userType

  return results
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

  await jsonFetch(url, request)

  return login(email, password, userType)
}
