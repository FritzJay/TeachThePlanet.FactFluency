import { hideLoading, showLoading } from 'react-redux-loading' 
import { fetchClasses } from 'src/lib/Api/Classes';
import { IClass } from 'src/lib/Interfaces';

export const RECEIVE_CLASS_LIST = 'RECEIVE_CLASS_LIST'
export const SET_SELECTED_CLASS = 'SET_SELECTED_CLASS'

export function receiveClassList (classList: IClass[]) {
  return {
    type: RECEIVE_CLASS_LIST,
    classList,
  }
}

export function setSelectedClass (selectedClass: string) {
  return {
    type: SET_SELECTED_CLASS,
    selectedClass,
  }
}

export function handleReceiveClassList (token: string) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const classList = await fetchClasses(token)
    dispatch(receiveClassList(classList))

    dispatch(hideLoading())
  }
}