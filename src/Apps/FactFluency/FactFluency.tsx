import * as React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { Navbar, PageNotFound } from 'src/sharedComponents'
import { SelectTest, StartTest, TakeTest, TestResults } from './components'
import './FactFluency.css'

export const FactFluency = ({ match }: RouteComponentProps) => (
  <div>
    <Navbar logoLink={match.url} />

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