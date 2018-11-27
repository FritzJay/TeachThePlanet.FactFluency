import * as React from 'react'
import { Route, RouteComponentProps, Redirect } from 'react-router-dom'
import { Navbar, ConnectedClassListDropdown } from 'src/sharedComponents'
import {
  CourseInvitations,
  SelectTest,
  StartTest,
  TakeTestWithData,
  TestResultsWithData
} from './components'
import './FactFluency.css'

export const FactFluency = ({ match }: RouteComponentProps) => {
  const renderRedirect = () => <Redirect to={`${match.url}/select-test`} />

  return (
    <div>
      <Route
        render={(props) => (
          <Navbar {...props} logoLink={match.url}>
            <ConnectedClassListDropdown />
          </Navbar>
        )}
      />

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
          component={TakeTestWithData}
        />

        <Route
          path={`${match.path}/test-results`}
          component={TestResultsWithData}
        />
        
        <Route
          path={`${match.path}/join-class`}
          component={CourseInvitations}
        />
      </div>
    </div>
  )
}