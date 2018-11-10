import { IClass } from 'src/lib';
import {
  CREATE_CLASS,
  DELETE_CLASS,
  RECEIVE_CLASS_LIST,
  RECEIVE_TEST_PARAMETERS,
  REHYDRATE_CLASSES,
  REMOVE_SELECTED_CLASS,
  REMOVE_TEST_PARAMETERS,
  SET_SELECTED_CLASS,
  UPDATE_CLASS,
  UPDATE_TEST_PARAMETERS,
} from '../actions/classes'
import { CLEAR_STORE } from '../actions/shared'

export default function classes (state: any = {}, action: any) {
  switch (action.type) {
    case CLEAR_STORE:
      return {}

    case REHYDRATE_CLASSES:
      return {
        ...state,
        ...action.classes
      }

    case RECEIVE_CLASS_LIST:
      return {
        ...state,
        classList: action.classList,
      }

    case RECEIVE_TEST_PARAMETERS:
      return {
        ...state,
        testParameters: action.testParameters
      }

    case SET_SELECTED_CLASS:
      return {
        ...state,
        selectedClass: action.selectedClass
      }

    case REMOVE_SELECTED_CLASS:
      const { selectedClass, ...allExceptSelectedClass } = state
      return allExceptSelectedClass

    case REMOVE_TEST_PARAMETERS:
      const { testParameters, ...allExceptTestParameters } = state
      return allExceptTestParameters

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

    case UPDATE_TEST_PARAMETERS:
      return {
        ...state,
        testParameters: action.testParameters,
      }

    case CREATE_CLASS:
      return {
        ...state,
        classList: state.classList
          ? state.classList.concat([action.newClass])
          : []
      }

    default:
      return state
  }
}