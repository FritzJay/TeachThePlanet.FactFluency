import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { Navbar, PageNotFound } from 'src/sharedComponents'
import { IAvailableTests, ITest, ITestNumber, ITestResults, IUser } from '../../lib/Interfaces'
import { Caching } from '../../lib/lib'
import { SelectTest, StartTest, TakeTest, TestResults } from './components'
import './FactFluency.css'

interface IProps extends RouteComponentProps<{}> {
  user: IUser
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

class DisconnectedFactFluency extends React.Component<IProps, IState> {
  public state: IState = {}

  public render() {
    const { match, onLogout, user } = this.props

    return (
      <div>
        <Navbar
          logoLink={match.url}
          user={user}
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

  private renderSelectTest = (props: any) => (
    <SelectTest
      {...props}
      token={this.props.user.token}
      onSubmit={this.handleSelectTestSubmit}
      storeAvailableTests={this.storeAvailableTests}
    />
  )

  private storeAvailableTests = (availableTests: IAvailableTests) => {
    Caching.setCached('availableTests', availableTests)
    this.setState({ availableTests })
  }
  
  private handleSelectTestSubmit = (testNumber: ITestNumber, operator: string) => {
    const testParameters = {
      number: testNumber.number,
      operator,
    }

    Caching.removeCached('test')
    Caching.setCached('testParameters', testParameters)

    this.setState({
      test: undefined,
      testParameters,
    }, () => {
      this.props.history.push(`${this.props.match.url}/start-test`)
    })
  }

  /****** END Select Test ******/

  /****** Start Test ******/
  
  private renderStartTest = (props: any) => {
    const { user, match } = this.props

    const testParameters = this.state.testParameters || Caching.getCached('testParameters')
    if (testParameters === undefined || testParameters === null) {
      console.warn('Error while rendering StartTest: ``testParameters`` is undefined')
      return <Redirect to={match.url} />
    }

    return (
      <StartTest
        {...props}
        token={user.token}
        testParameters={testParameters}
        onSubmit={this.handleStartTestSubmit}
        onCancel={this.handleStartTestCancel}
        storeTest={this.storeTest}
      />
    )
  }
  
  private handleStartTestSubmit = () => {
    Caching.removeCached('testResults')

    this.setState({ testResults: undefined }, () => {
      this.props.history.push(`${this.props.match.url}/take-test`)
    })
  }
  
  private handleStartTestCancel = () => {
    Caching.removeCached('test')
    this.props.history.push(this.props.match.url)
  }
  
  private storeTest = (test: ITest ) => {
    Caching.setCached('test', test)
    this.setState({ test })
  }
  
  /****** END Start Test ******/

  /****** Take Test ******/
  
  private renderTakeTest = (props: any) => {
    const test = this.state.test || Caching.getCached('test')

    if (test === undefined || test === null) {
      console.warn('Error while rendering TakeTest: ``test`` is undefined')
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
        token={this.props.user.token}
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
}

const mapStateToProps = ({ user }: any) => ({ user })

export const FactFluency = connect(mapStateToProps)(DisconnectedFactFluency)