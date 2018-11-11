
import { IUser } from "src/lib/Interfaces"

export const REHYDRATE_USER = 'REHYDRATE_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const RECEIVE_USER = 'RECEIVE_USER'

export function rehydrateUser (user: any) {
  return {
    type: REHYDRATE_USER,
    user,
  }
}

export function receiveUser (user: IUser) {
  return {
    type: RECEIVE_USER,
    user
  }
}

export function removeUser () {
  return {
    type: REMOVE_USER,
    user: null
  }
}
