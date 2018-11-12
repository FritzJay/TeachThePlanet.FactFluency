import { showLoading, hideLoading } from 'react-redux-loading'
import {
  saveUpdateTestParameters,
} from '../utils/api'
import { 
  updateTestParameters,
} from '../actions/testParameters'
import { ITestParameters } from '../utils/interfaces'

export const handleUpdateTestParameters = (token: string, classId: string, updates: ITestParameters) => {
  return async (dispatch: any) => {
    dispatch(showLoading)
    try {
      const updatedTestParameters = await saveUpdateTestParameters(token, updates)
      dispatch(updateTestParameters(classId, updatedTestParameters))
    } catch (error) {
      alert('There was an error saving your changes. Please try again later.')
    } finally {
      dispatch(hideLoading())
    }
  }
}