import { 
  SIGN_IN_TEACHER,
} from '../actions/teacherHome'

import {
  ADD_TEACHER,
  UPDATE_TEACHER,
  REMOVE_TEACHER,
} from '../actions/teachers'

import {
  ADD_CLASS,
  UPDATE_CLASS,
  REMOVE_CLASS,
} from '../actions/classes'
import classes from './classes'

import {
  ADD_STUDENT,
  UPDATE_STUDENT,
  REMOVE_STUDENT,
} from '../actions/students'

import { UPDATE_TEST_PARAMETERS } from '../actions/testParameters'

import { CLEAR_STORE } from '../actions/shared'

import { IClass } from 'src/utils';
import { ADD_INVITATION } from 'src/actions/invitations';

export default function teacherHome (state: any = {}, action: any) {
  switch (action.type) {
    case CLEAR_STORE: {
      return {}
    }

    case ADD_TEACHER:
    case UPDATE_TEACHER:
      throw new Error('Not implemented')
      break

    case SIGN_IN_TEACHER:
      const formattedClasses = action.teacher.classes
        ? action.teacher.classes.reduce((acc: object, cls: IClass) => ({ ...acc, [cls.id]: {
            ...cls,
            invitations: cls.invitations
              ? cls.invitations.map(({ name }: any) => name)
              : []
          }}), {})
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
    case ADD_INVITATION:
      return {
        ...state,
        classes: classes(state.classes, action)
      }

    default:
      return state
  }
}