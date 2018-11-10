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
import { IUser } from 'src/lib/Interfaces'
import { Caching } from 'src/lib/lib'
import { removeUser } from 'src/redux/actions/user';
import { LoadingBar } from 'src/sharedComponents'
import './App.css'
import { Classes } from './Classes/Classes'
import { FactFluency } from './FactFluency/FactFluency'

interface IProps extends RouteComponentProps<{}> {
  userType?: string
  user?: IUser
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
            render={this.renderFactFluency}
          />

          <Route
            path="/classes"
            render={this.renderClasses}
          />

          <Route render={this.renderRedirect} />
        </Switch>
      </div>
    )
  }

  private renderLogin = (props: any) => {
    switch (this.props.userType) {
      case 'Teacher':
        return <Redirect to="/classes" />
      case 'Student':
        return <Redirect to="/fact-fluency" />
      default:
        break
    }

    return (
      <Login
        {...props}
      />
    )
  }

  private renderClasses = (props: any) => {
    const user = this.props.user

    if (user === undefined || user === null) {
      return <Redirect to="/index" />
    }

    return (
      <Classes
        {...props}
        onLogout={this.handleLogout}
        user={user}
        token={user.token}
      />
    )
  }

  private renderFactFluency = (props: any) => {
    const user = this.props.user

    if (user === undefined || user === null) {
      return <Redirect to="/index" />
    }

    return (
      <FactFluency
        {...props}
        onLogout={this.handleLogout}
        user={user}
        token={user.token}
      />
    )
  }

  private handleLogout = () => {
    Caching.clearCached()
    this.props.dispatch(removeUser())
    this.props.history.replace('/index')
  }

  private renderRedirect = () => (
    <Redirect to="/index" />
  )
}

const mapStateToProps = ({ user }: any) => {
  return {
    userType: user.userType,
    user
  }
}
const ConnectedApp = connect(mapStateToProps)(App)

export default withRouter(ConnectedApp)