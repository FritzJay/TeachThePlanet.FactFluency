import { IRequest, IUser } from "../Interfaces";
import { Requests } from "../lib";

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
