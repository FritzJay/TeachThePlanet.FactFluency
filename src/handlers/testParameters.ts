import { showLoading, hideLoading } from 'react-redux-loading-bar'
import {
  saveUpdateTestParameters,
} from '../api'
import { 
  updateTestParameters,
} from '../actions/testParameters'
import { ITestParameters } from '../utils/interfaces'

export const handleUpdateTestParameters = (token: string, classID: string, updates: ITestParameters) => {
  return async (dispatch: any) => {
    dispatch(showLoading)
    try {
      const { id, ...remainingUpdates } = updates
      const updatedTestParameters = await saveUpdateTestParameters(token, id, remainingUpdates)
      dispatch(updateTestParameters(classID, updatedTestParameters))
    } finally {
      dispatch(hideLoading())
    }
  }
}