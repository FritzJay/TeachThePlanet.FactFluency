import * as React from 'react'
import { connect } from 'react-redux'
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom'
import Login from 'src/Apps/Login/Login'
import { LoadingBar } from 'src/sharedComponents'
import './App.css'
import { TeacherHome } from './TeacherHome/TeacherHome'
import { FactFluency } from './FactFluency/FactFluency'

interface IProps extends RouteComponentProps<{}> {
  userType?: string
  dispatch: any
}

class App extends React.Component<IProps> {
  public render() {
    return (
      <div className="App">
        <LoadingBar />
        
        <Switch>
          <Route
            path="/index"
            render={this.renderLogin}
          />

          <Route
            path="/fact-fluency"
            component={FactFluency}
          />

          <Route
            path="/teacher"
            component={TeacherHome}
          />

          <Route render={this.renderRedirect} />
        </Switch>
      </div>
    )
  }

  private renderLogin = (props: any) => {
    switch (this.props.userType) {
      case 'Teacher':
        return <Redirect to="/teacher" />
      case 'Student':
        return <Redirect to="/fact-fluency" />
      default:
        break
    }

    return <Login {...props} />
  }

  private renderRedirect = () => (
    <Redirect to="/index" />
  )
}

const mapStateToProps = ({ user }: any) => ({ userType: user.userType })

const ConnectedApp = connect(mapStateToProps)(App)

export default withRouter(ConnectedApp)