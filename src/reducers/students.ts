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
        [action.student.id]: action.student,
      }

    case REMOVE_STUDENT:
      return {
        ...state,
        [action.studentId]: undefined,
      }

    default:
      return state
  }
}