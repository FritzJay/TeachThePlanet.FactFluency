import * as React from 'react'
import { connect } from 'react-redux'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { Navbar, PageNotFound } from 'src/sharedComponents'
import { IAvailableTests, ITest, ITestResults, IUser } from '../../lib/Interfaces'
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
              component={TestResults}
            />

            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user }: any) => ({ user })

export const FactFluency = connect(mapStateToProps)(DisconnectedFactFluency)