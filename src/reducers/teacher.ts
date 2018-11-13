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

import { UPDATE_TEST_PARAMETERS } from '../actions/testParameters'

import { CLEAR_STORE } from '../actions/shared'

import { IClass } from 'src/utils';

export default function teacher (state: any = {}, action: any) {
  switch (action.type) {
    case CLEAR_STORE: {
      return {}
    }

    case ADD_TEACHER:
    case UPDATE_TEACHER:
      const formattedClasses = action.teacher.classes
        ? action.teacher.classes.reduce((acc: object, cls: IClass) => ({ ...acc, [cls.id]: cls }), {})
        : {}
      return {
        ...state,
        ...action.teacher,
        classes: formattedClasses
      }

    case REMOVE_TEACHER:
    case CLEAR_STORE:
      return {}

    case REMOVE_CLASS:
    case UPDATE_CLASS:
    case ADD_CLASS:
    case ADD_STUDENT:
    case UPDATE_STUDENT:
    case REMOVE_STUDENT:
    case UPDATE_TEST_PARAMETERS:
      return {
        ...state,
        classes: classes(state.classes, action)
      }

    default:
      return state
  }
}