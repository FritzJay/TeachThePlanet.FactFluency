import { showLoading, hideLoading } from 'react-redux-loading'
import {
  saveUpdateTestParameters,
} from '../utils/api'
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
    } catch (error) {
      alert('There was an error saving your changes. Please try again later.')
    } finally {
      dispatch(hideLoading())
    }
  }
}