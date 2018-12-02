import * as React from 'react'
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import Login from 'src/Apps/Login/Login'
import { PageNotFound } from 'src/sharedComponents'
import { TeacherHome } from './TeacherHome/TeacherHome'
import { FactFluency } from './FactFluency/FactFluency'
import './App.css'

export default class App extends React.Component<any> {
  public render() {
    return (
      <div className="App">
        <Switch>
          <Route
            path="/"
            exact={true}
            render={() => <Redirect to="/index" />}
          />

          <Route
            path="/index"
            component={Login}
          />

          <Route
            path="/fact-fluency"
            component={FactFluency}
          />

          <Route
            path="/teacher"
            component={TeacherHome}
          />

          <Route component={PageNotFound} />
        </Switch>
      </div>
    )
  }
}
