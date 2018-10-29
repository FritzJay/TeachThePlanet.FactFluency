import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Navbar, RequestComponent } from '../../Components/Components'
import { IAvailableTests, IRequest, ITest, ITestNumber, ITestResults, IUser } from '../../lib/Interfaces'
import { Caching } from '../../lib/lib'
import { Requests } from '../../lib/lib'
import './FactFluency.css'
import { SelectTest, StartTest, TakeTest, TestResults } from './Routes/Routes'

export const URLS = {
  base: '/fact-fluency',
  home: '/home',
  selectTest: '/fact-fluency',
  startTest: '/fact-fluency/start',
  takeTest: '/fact-fluency/take',
  testResults: '/fact-fluency/results',
}

interface IProps {
  history: any
  token?: string
  user?: IUser
  onLogin: (user: IUser, token: string, userType: string) => void
  onLogout: () => void
}

interface IState {
  availableTests?: IAvailableTests
  testParameters?: {
    number: number
    operator: string
  }
  test?: ITest
  testResults?: ITestResults
}

export class FactFluency extends React.Component<IProps, IState> {
  public constructor(props: any) {
    super(props)

    this.state = {}

    this.renderNavbar = this.renderNavbar.bind(this)
    this.renderSelectTest = this.renderSelectTest.bind(this)
    this.renderStartTest = this.renderStartTest.bind(this)
    this.renderTakeTest = this.renderTakeTest.bind(this)
    this.renderTestResults = this.renderTestResults.bind(this)
    this.requestSelectTest = this.requestSelectTest.bind(this)
    this.requestStartTest = this.requestStartTest.bind(this)
    this.requestTestResults = this.requestTestResults.bind(this)

    this.handleSelectTestResolve = this.handleSelectTestResolve.bind(this)
    this.handleTestResultsResolve = this.handleTestResultsResolve.bind(this)
    this.handleSelectTestSubmit = this.handleSelectTestSubmit.bind(this)
    this.handleStartTestSubmit = this.handleStartTestSubmit.bind(this)
    this.handleStartTestCancel = this.handleStartTestCancel.bind(this)
    this.handleTakeTestSubmit = this.handleTakeTestSubmit.bind(this)
    this.handleTestResultsSubmit = this.handleTestResultsSubmit.bind(this)
    this.handleTestResultsRetry = this.handleTestResultsRetry.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  public render() {
    return (
      <div>
        <Route
          path={URLS.base}
          render={this.renderNavbar}
        />
        <div className="fact-fluency">
          <Route
            exact={true}
            path={URLS.selectTest}
            render={this.renderSelectTest}
          />
          <Route
            path={URLS.startTest}
            render={this.renderStartTest}
          />
          <Route
            path={URLS.takeTest}
            render={this.renderTakeTest}
          />
          <Route
            path={URLS.testResults}
            render={this.renderTestResults}
          />
        </div>
      </div>
    )
  }

  /****** Navbar ******/
  
  private renderNavbar(props: any) {
    const user = this.props.user || localStorage.getItem('user')

    return(
      <Navbar {...props}
        user={user}
        onLogout={this.props.onLogout}
      />
    )
  }

  private handleLogout() {
    this.setState({
      availableTests: undefined,
      test: undefined,
      testParameters: undefined,
      testResults: undefined,
    }, () => {
      this.props.onLogout()
    })
  }

  /****** END Navbar ******/
  
  /****** Select Test ******/

  private renderSelectTest(props: any) {
    const availableTests = this.state.availableTests || Caching.getCached('availableTests')

    if (availableTests) {
      return (
        <SelectTest {...props}
          availableTests={availableTests}
          onSubmit={this.handleSelectTestSubmit}
        />
      )
    }

    return (
      <RequestComponent
        request={this.requestSelectTest}
        onResolve={this.handleSelectTestResolve}
        component={SelectTest}
        props={{
          ...props,
          onSubmit: this.handleSelectTestSubmit
        }}
      />
    )
  }

  private requestSelectTest(): Promise<IAvailableTests> {
    const token = this.props.token || Caching.getCached('token')

    if (token === undefined || token === null) {
      this.props.history.replace(URLS.home)
    }

    const requestParams: IRequest = {
      method: "GET",
      token,
    }

    return new Promise<IAvailableTests>((resolve) => {
      Requests.jsonFetch(`${process.env.REACT_APP_API_URL}/tests/available`, requestParams)
      .then((availableTests: IAvailableTests) => {
        resolve(availableTests)
      })
      .catch((error: Error) => {
        console.log('Request failed with error: ' + error.message)
        this.handleLogout()
      })
    })
  }

  private handleSelectTestResolve(results: {availableTests: IAvailableTests}) {
    Caching.setCached('availableTests', results.availableTests)
    this.setState({availableTests: results.availableTests})
  }
  
  private handleSelectTestSubmit(testNumber: ITestNumber, operator: string) {
    const testParameters = {
      number: testNumber.number,
      operator,
    }

    this.setState({
      test: undefined,
      testParameters,
    }, () => {
      Caching.removeCached('test')
      this.props.history.push(URLS.startTest)
    })
  }

  /****** END Select Test ******/

  /****** Start Test ******/
  
  private renderStartTest(props: any) {
    return (
      <RequestComponent
        request={this.requestStartTest}
        onResolve={this.handleStartTestResolve}
        component={StartTest}
        props={{
          ...props,
          onCancel: this.handleStartTestCancel,
          onSubmit: this.handleStartTestSubmit,
        }}
      />
    )
  }

  private requestStartTest(): Promise<ITest> {
    const token = this.props.token || Caching.getCached('token')

    if (token === undefined || token === null) {
      this.props.history.replace(URLS.home)
    }

    const testParameters = this.state.testParameters || Caching.getCached('testParameters')
    if (testParameters === undefined || testParameters === null) {
      this.props.history.goBack()
    }

    const request: IRequest = {
      body: testParameters,
      method: "POST",
      token,
    }

    return new Promise<ITest>((resolve) => {
      Requests.jsonFetch(`${process.env.REACT_APP_API_URL}/tests/new`, request)
      .then((test: ITest) => {
        resolve(test)
      })
      .catch((error: Error) => {
        console.log('Request failed with error: ', error)
        this.handleLogout()
      })
    })
  }

  private handleStartTestResolve(results: { test: ITest }) {
    Caching.setCached('test', results.test)
    this.setState({test: results.test})
  }
  
  private handleStartTestSubmit() {
    this.setState({testResults: undefined}, () => {
      Caching.removeCached('testResults')
      this.props.history.push(URLS.takeTest)
    })
  }
  
  private handleStartTestCancel() {
    this.props.history.push(URLS.selectTest)
  }

  /****** END Start Test ******/

  /****** Take Test ******/
  
  private renderTakeTest(props: any) {
    const testResults = this.state.testResults || Caching.getCached('testResults')

    if (testResults !== undefined && testResults !== null) {
      return <Redirect to={URLS.testResults} />
    }

    const test = this.state.test || Caching.getCached('test')

    if (test === undefined || test === null) {
      return <Redirect to={URLS.startTest} />
    }

    return (
      <TakeTest {...props}
        test={test}
        onSubmit={this.handleTakeTestSubmit}
      />
    )
  }

  private handleTakeTestSubmit(test: ITest) {
    Caching.setCached('test', test)

    this.setState({test}, () => {
      this.props.history.push(URLS.testResults)
    })
  }

  /****** END Take Test ******/

  /****** Test Results ******/
  
  private renderTestResults(props: any) {
    const testResults = this.state.testResults || Caching.getCached('testResults')

    if (testResults) {
      return (
        <TestResults
          testResults={testResults}
          onRetry={this.handleTestResultsRetry}
          onSubmit={this.handleTestResultsSubmit}
        />
      )
    }

    return (
      <RequestComponent
        request={this.requestTestResults}
        onResolve={this.handleTestResultsResolve}
        component={TestResults}
        props={{
          ...props,
          onRetry: this.handleTestResultsRetry,
          onSubmit: this.handleTestResultsSubmit,
        }}
      />
    )
  }

  private requestTestResults() {
    const token = this.props.token || Caching.getCached('token')

    if (token === undefined || token === null) {
      this.props.history.replace(URLS.home)
    }

    const test = this.state.test || Caching.getCached('test')

    if (test === undefined || test === null) {
      this.props.history.replace(URLS.selectTest)
    }

    const requestParams: IRequest = {
      body: test,
      method: "POST",
      token,
    }

    return new Promise<ITestResults>((resolve) => {
      Requests.jsonFetch(`${process.env.REACT_APP_API_URL}/tests/grade`, requestParams)
      .then((testResults: ITestResults) => {
        resolve(testResults)
      })
      .catch((error: Error) => {
        console.log('Request failed with error: ' + error.message)
        this.handleLogout()
      })
    })
  }

  private handleTestResultsResolve(results: { testResults: ITestResults }) {
    localStorage.removeItem('test')

    Caching.setCached('testResults', results.testResults)

    this.setState({
      test: undefined,
      testResults: results.testResults,
    })
  }

  private handleTestResultsSubmit() {
    this.props.history.push(URLS.selectTest)
  }

  private handleTestResultsRetry() {
    this.props.history.replace(URLS.startTest)
  }

  /****** END Test Results ******/
}
