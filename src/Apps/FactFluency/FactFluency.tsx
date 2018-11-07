import * as React from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { fetchAvailableTests, fetchNewTest, fetchTestResults } from 'src/lib/Api/Tests';
import { Navbar, PageNotFound, RequestComponent } from 'src/sharedComponents'
import { IAvailableTests, ITest, ITestNumber, ITestResults, IUser } from '../../lib/Interfaces'
import { Caching } from '../../lib/lib'
import './FactFluency.css'
import { SelectTest, StartTest, TakeTest, TestResults } from './Routes/Routes'

interface IProps extends RouteComponentProps<{}> {
  token: string
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
          path={this.props.match.path}
          render={this.renderNavbar}
        />

        <div className="fact-fluency">
          <Switch>
            <Route
              exact={true}
              path={this.props.match.path}
              render={this.renderSelectTest}
            />

            <Route
              path={`${this.props.match.path}/start-test`}
              render={this.renderStartTest}
            />

            <Route
              path={`${this.props.match.path}/take-test`}
              render={this.renderTakeTest}
            />

            <Route
              path={`${this.props.match.path}/test-results`}
              render={this.renderTestResults}
            />

            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    )
  }

  /****** Navbar ******/
  
  private renderNavbar(props: any) {
    const user = this.props.user || localStorage.getItem('user')

    return(
      <Navbar {...props}
        logoLink={this.props.match.path}
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

  private async requestSelectTest(): Promise<IAvailableTests | undefined> {
    try {
      return await fetchAvailableTests(this.props.token)
    } catch (error) {
      this.handleLogout()
      return
    }
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
      this.props.history.push(`${this.props.match.url}/start-test`)
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

  private async requestStartTest(): Promise<ITest | undefined> {
    const testParameters = this.state.testParameters || Caching.getCached('testParameters')
    if (testParameters === undefined || testParameters === null) {
      this.props.history.goBack()
      return
    }

    try {
      return await fetchNewTest(this.props.token, testParameters)
    } catch(error) {
      this.handleLogout()
      return
    }
  }

  private handleStartTestResolve(results: { test: ITest }) {
    Caching.setCached('test', results.test)
    this.setState({test: results.test})
  }
  
  private handleStartTestSubmit() {
    this.setState({testResults: undefined}, () => {
      Caching.removeCached('testResults')
      this.props.history.push(`${this.props.match.url}/take-test`)
    })
  }
  
  private handleStartTestCancel() {
    this.props.history.push(`${this.props.match.url}`)
  }

  /****** END Start Test ******/

  /****** Take Test ******/
  
  private renderTakeTest(props: any) {
    const testResults = this.state.testResults || Caching.getCached('testResults')

    if (testResults !== undefined && testResults !== null) {
      return <Redirect to={`${this.props.match.url}/test-results`} />
    }

    const test = this.state.test || Caching.getCached('test')

    if (test === undefined || test === null) {
      return <Redirect to={`${this.props.match.url}/start-test`} />
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
      this.props.history.push(`${this.props.match.url}/test-results`)
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

  private async requestTestResults(): Promise<ITestResults | undefined> {
    const test = this.state.test || Caching.getCached('test')

    if (test === undefined || test === null) {
      this.props.history.replace(`${this.props.match.url}`)
      return
    }

    try {
      return await fetchTestResults(this.props.token, test)
    } catch(error) {
      this.handleLogout()
      return
    }
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
    this.props.history.push(`${this.props.match.url}`)
  }

  private handleTestResultsRetry() {
    this.props.history.replace(`${this.props.match.url}/start-test`)
  }

  /****** END Test Results ******/
}
