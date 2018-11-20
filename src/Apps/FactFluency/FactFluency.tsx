import * as React from 'react'
import { Route, RouteComponentProps, Redirect } from 'react-router-dom'
import { Navbar, ConnectedClassListDropdown } from 'src/sharedComponents'
import { ConnectedCourseInvitations, SelectTest, StartTest, TakeTest, TestResults } from './components'
import './FactFluency.css'

export const FactFluency = ({ match }: RouteComponentProps) => {
  const renderRedirect = () => <Redirect to={`${match.url}/select-test`} />

  return (
    <div>
      <Navbar logoLink={match.url}>
        <ConnectedClassListDropdown />
      </Navbar>

      <div className="FactFluency">

        <Route
          exact={true}
          path={match.path}
          render={renderRedirect}
        />

        <Route
          path={`${match.path}/select-test`}
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
        
        <Route
          path={`${match.path}/join-class`}
          component={ConnectedCourseInvitations}
        />
      </div>
    </div>
  )
}