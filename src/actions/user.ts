import { IUser } from '../utils/interfaces'

export const ADD_USER = 'ADD_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const REMOVE_USER = 'REMOVE_USER'

export const addUser = (user: IUser) => ({
  type: ADD_USER,
  user
})

export const updateUser = (userID: string, updates: IUser) => ({
  type: UPDATE_USER,
  updates
})

export const removeUser = (userID: string) => ({
  type: REMOVE_USER,
  userID,
})