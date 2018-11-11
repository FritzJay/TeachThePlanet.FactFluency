import {
  ADD_TEACHER,
  UPDATE_TEACHER,
  REMOVE_TEACHER,
} from '../actions/teacher'
import {
  ADD_CLASS,
  UPDATE_CLASS,
  REMOVE_CLASS,
} from '../actions/classes'
import classes from '../reducers/classes'
import {
  ADD_STUDENT,
  UPDATE_STUDENT,
  REMOVE_STUDENT,
} from '../actions/students'
import { 
  UPDATE_TEST_PARAMETERS,
} from '../actions/testParameters'

export default function teacher (state: ITeacher = {}, action: any) {
  switch (action.type) {
    case ADD_TEACHER || UPDATE_TEACHER:
      return {
        ...state,
        ...action.teacher
      }

    case REMOVE_TEACHER:
      return {}

    case ADD_CLASS || UPDATE_CLASS || REMOVE_CLASS ||
         ADD_STUDENT || UPDATE_STUDENT || REMOVE_STUDENT ||
         UPDATE_TEST_PARAMETERS:
      return {
        ...state,
        classes: classes(state.classes, action)
      }

    default:
      return state
  }
}