import { hideLoading, showLoading } from "react-redux-loading";
import { getCached } from "src/lib";
import { fetchAvailableTests, fetchNewTest, fetchTestResults } from "src/lib/Api/Tests";
import { 
  receiveAvailableTests,
  receiveTest,
  receiveTestResults,
  rehydrateFactFluency,
} from '../actions/factFluency'

export function handleReceiveAvailableTests (token: string) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const availableTests = await fetchAvailableTests(token)
    dispatch(receiveAvailableTests(availableTests))

    dispatch(hideLoading())
  }
}

export function handleReceiveTest (token: string, newTestParameters: INewTestParameters) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const test = await fetchNewTest(token, {
      number: newTestParameters.testNumber.number,
      operator: newTestParameters.operator,
    })
    dispatch(receiveTest(test))

    dispatch(hideLoading())
  }
}

export function handleReceiveTestResults (token: string, test: ITest) {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const testResults = await fetchTestResults(token, test)
    dispatch(receiveTestResults(testResults))

    dispatch(hideLoading())
  }
}

export function handleRehydrateFactFluency () {
  return async (dispatch: any) => {
    dispatch(showLoading())

    const factFluency = await getCached('factFluency')
    dispatch(rehydrateFactFluency(factFluency))

    dispatch(hideLoading())
  }
}