import * as React from 'react'
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
import './App.css'
import { Classes } from './Classes/Classes'
import { FactFluency } from './FactFluency/FactFluency'

interface IProps extends RouteComponentProps<{}> {}

interface IState {
  token?: string
  user?: IUser
}

class App extends React.Component<IProps, IState> {
  public state: IState = {
    token: undefined,
    user: undefined,
  }

  public render() {
    return (
      <div className="index">
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

  private renderClasses = (props: any) => {
    const token = this.state.token || Caching.getCached('token')
    const user = this.state.user || Caching.getCached('user')

    if (token === undefined || token === null || user === undefined || user === null) {
      return <Redirect to="/index" />
    }

    return (
      <Classes
        {...props}
        onLogout={this.handleLogout}
        user={user}
        token={token}
      />
    )
  }

  private renderLogin = (props: any) => (
    <Login
      {...props}
      onLogin={this.handleLogin}
    />
  )

  private renderFactFluency = (props: any) => {
    const token = this.state.token || Caching.getCached('token')
    const user = this.state.user || Caching.getCached('user')

    if (token === undefined|| token === null || user === undefined || user === null) {
      return <Redirect to="/index" />
    }

    return (
      <FactFluency
        {...props}
        onLogout={this.handleLogout}
        user={user}
        token={token}
      />
    )
  }

  private handleLogin = (user: IUser, token: string, userType: string) => {
    Caching.setCached('token', token)
    Caching.setCached('user', user)

    this.setState({
      token,
      user,
    }, () => {
      if (userType === 'Student') {
        this.props.history.push('/fact-fluency')
      } else if (userType === 'Teacher') {
        this.props.history.push('/classes')
      } else {
        this.props.history.push('/index')
      }
    })
  }

  private handleLogout = () => {
    localStorage.clear()

    this.setState({
      token: undefined,
      user: undefined,
    }, () => {
      this.props.history.replace('/index')
    })
  }

  private renderRedirect = () => <Redirect to="/index" />
}

export default withRouter(App)