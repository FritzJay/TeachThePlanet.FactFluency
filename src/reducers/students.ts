import {
  ADD_STUDENT,
  UPDATE_STUDENT,
  REMOVE_STUDENT,
} from '../actions/students'

export default function students (state: any = {}, action: any) {
  switch (action.type) {
    case ADD_STUDENT:
    case UPDATE_STUDENT:
      return {
        ...state,
        [action.student.id]: { ...action.student },
      }

    case REMOVE_STUDENT:
      const newState = Object.assign({}, state)
      delete newState[action.studentId]
      return newState

    default:
      return state
  }
}