import { IClass } from 'src/lib/Interfaces';
import {
  DELETE_CLASS,
  RECEIVE_CLASS_LIST,
  REMOVE_SELECTED_CLASS,
  SET_SELECTED_CLASS,
  UPDATE_CLASS,
} from '../actions/classes'

export default function classes (state: any = {}, action: any) {
  switch (action.type) {
    case RECEIVE_CLASS_LIST:
      return {
        ...state,
        classList: action.classList,
      }

    case SET_SELECTED_CLASS:
      return {
        ...state,
        selectedClass: action.selectedClass
      }

    case REMOVE_SELECTED_CLASS:
      const { selectedClass, ...allExceptSelectedClass } = state
      return allExceptSelectedClass

    case DELETE_CLASS:
      return {
        ...state,
        classList: state.classList
          ? state.classList.filter((cls: IClass) => cls._id !== action.id)
          : []
      }

    case UPDATE_CLASS:
      return {
        ...state,
        classList: state.classList
          ? state.classList.map((cls: IClass) => (
            cls._id.toString() === action.updates._id.toString()
              ? action.updates
              : cls))
          : []
      }

    default:
      return state
  }
}