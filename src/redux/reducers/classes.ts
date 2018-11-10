import {
  RECEIVE_CLASS_LIST,
  SET_SELECTED_CLASS,
} from '../actions/classes'

export default function classes (state = {}, action: any) {
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

    default:
      return state
  }
}