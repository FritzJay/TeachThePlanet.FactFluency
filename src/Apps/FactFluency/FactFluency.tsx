import * as React from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { fetchAvailableTests } from 'src/lib/Api/Tests'
import { Navbar, PageNotFound, RequestComponent } from 'src/sharedComponents'
import { IAvailableTests, ITest, ITestNumber, ITestResults, IUser } from '../../lib/Interfaces'
import { Caching } from '../../lib/lib'
import { SelectTest, StartTest, TakeTest, TestResults } from './components'
import './FactFluency.css'

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
  public state: IState = {}

  public render() {
    const { match, onLogout, user } = this.props

    return (
      <div>
        <Navbar
          logoLink={match.url}
          user={user || Caching.getCached('user')}
          onLogout={onLogout}
        />

        <div className="FactFluency">
          <Switch>
            <Route
              exact={true}
              path={match.path}
              render={this.renderSelectTest}
            />

            <Route
              path={`${match.path}/start-test`}
              render={this.renderStartTest}
            />

            <Route
              path={`${match.path}/take-test`}
              render={this.renderTakeTest}
            />

            <Route
              path={`${match.path}/test-results`}
              render={this.renderTestResults}
            />

            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    )
  }

  /****** Navbar ******/


  /****** END Navbar ******/
  
  /****** Select Test ******/

  private renderSelectTest = (props: any) => {
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

  private requestSelectTest = async (): Promise<IAvailableTests | undefined> => {
    try {
      return await fetchAvailableTests(this.props.token)
    } catch (error) {
      this.handleLogout()
      return
    }
  }

  private handleSelectTestResolve = (results: {availableTests: IAvailableTests}) => {
    Caching.setCached('availableTests', results.availableTests)
    this.setState({availableTests: results.availableTests})
  }
  
  private handleSelectTestSubmit = (testNumber: ITestNumber, operator: string) => {
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
  
  private renderStartTest = (props: any) => {
    const { token, match } = this.props

    const testParameters = this.state.testParameters || Caching.getCached('testParameters')
    if (testParameters === undefined || testParameters === null) {
      return <Redirect to={match.url} />
    }

    return (
      <StartTest
        {...props}
        token={token}
        testParameters={testParameters}
        onSubmit={this.handleStartTestSubmit}
        onCancel={this.handleStartTestCancel}
        storeTest={this.storeTest}
      />
    )
  }
  
  private handleStartTestSubmit = () => {
    this.setState({ testResults: undefined }, () => {
      Caching.removeCached('testResults')
      this.props.history.push(`${this.props.match.url}/take-test`)
    })
  }
  
  private handleStartTestCancel = () => {
    Caching.removeCached('test')
    this.props.history.push(this.props.match.url)
  }
  
  private storeTest = (results: { test: ITest }) => {
    Caching.setCached('test', results.test)
    this.setState({ test: results.test })
  }
  
  /****** END Start Test ******/

  /****** Take Test ******/
  
  private renderTakeTest = (props: any) => {
    const test = this.state.test || Caching.getCached('test')

    if (test === undefined || test === null) {
      return <Redirect to={`${this.props.match.url}/start-test`} />
    }

    return (
      <TakeTest
        {...props}
        test={test}
        onSubmit={this.handleTakeTestSubmit}
      />
    )
  }

  private handleTakeTestSubmit = (test: ITest) => {
    Caching.setCached('test', test)

    this.setState({ test }, () => {
      this.props.history.push(`${this.props.match.url}/test-results`)
    })
  }

  /****** END Take Test ******/

  /****** Test Results ******/
  
  private renderTestResults = (props: any) => {
    const test = this.state.test || Caching.getCached('test')

    if (test === undefined || test === null) {
      console.warn('Error while rendering TestResults: ``test`` is undefined')
      return <Redirect to={this.props.match.url} />
    }

    return (
      <TestResults
        {...props}
        test={test}
        token={this.props.token}
        storeTestResults={this.storeTestResults}
      />
    )
  }

  private storeTestResults = (testResults: ITestResults) => {
    Caching.removeCached('test')
    Caching.setCached('testResults', testResults)
    this.setState({ testResults })
  }

  /****** END Test Results ******/

  private handleLogout = () => {
    this.setState({
      availableTests: undefined,
      test: undefined,
      testParameters: undefined,
      testResults: undefined,
    }, () => {
      this.props.onLogout()
    })
  }
}