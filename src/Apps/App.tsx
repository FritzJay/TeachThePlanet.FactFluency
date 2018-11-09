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
import { LoadingBar } from 'src/sharedComponents'
import './App.css'
import { Classes } from './Classes/Classes'
import { FactFluency } from './FactFluency/FactFluency'

interface IProps extends RouteComponentProps<{}> {
  userType?: string
  user?: IUser
}

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
      <div className="App">
        <LoadingBar />
        
        <Route render={this.renderRedirect} />

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
        </Switch>
      </div>
    )
  }

  private renderClasses = (props: any) => {
    const user = this.props.user
    console.log(user)

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

  private renderRedirect = (props: any) => {
    if (props.location.pathname.startsWith('/index')) {
      switch (this.props.userType) {
        case 'Teacher':
          return <Redirect to="/classes" />
        case 'Student':
          return <Redirect to="/fact-fluency" />
        default:
          return null
      }
    } else if (props.location.pathname === '/') {
      return <Redirect to="/index" />
    }
    return null
  }
}

const mapStateToProps = ({ user }: any) => {
  return {
    userType: user.userType,
    user
  }
}
const ConnectedApp = connect(mapStateToProps)(App)

export default withRouter(ConnectedApp)