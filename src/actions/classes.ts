import { IClass } from '../utils/interfaces'

export const ADD_CLASS = 'ADD_CLASS'
export const UPDATE_CLASS = 'UPDATE_CLASS'
export const REMOVE_CLASS = 'REMOVE_CLASS'

export const addClass = (cls: IClass) => ({
  type: ADD_CLASS,
  class: cls
})

export const updateClass = (updates: IClass) => ({
  type: UPDATE_CLASS,
  class: updates
})

export const removeClass = (id: string) => ({
  type: REMOVE_CLASS,
  id,
})