import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { Navbar, PageNotFound } from 'src/sharedComponents'
import { IAvailableTests, ITest, ITestResults, IUser } from '../../lib/Interfaces'
import { Caching } from '../../lib/lib'
import { SelectTest, StartTest, TakeTest, TestResults } from './components'
import './FactFluency.css'

interface IProps extends RouteComponentProps<{}> {
  availableTests?: IAvailableTests
  user: IUser
  onLogout: () => void
}

interface IState {
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
              component={SelectTest}
            />

            <Route
              path={`${match.path}/start-test`}
              component={StartTest}
            />

            <Route
              path={`${match.path}/take-test`}
              component={TakeTest}
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

  /*
  private handleTakeTestSubmit = (test: ITest) => {
    Caching.setCached('test', test)

    this.setState({ test }, () => {
      this.props.history.push(`${this.props.match.url}/test-results`)
    })
  }
  */
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