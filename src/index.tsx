import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom'
import Login from 'src/Apps/Login/Login'
import * as WebFont from 'webfontloader'
import { Classes } from './Apps/Classes/Classes'
import { FactFluency } from './Apps/FactFluency/FactFluency'
import './index.css'
import { IUser } from './lib/Interfaces'
import { Caching } from './lib/lib'
import registerServiceWorker from './registerServiceWorker'

interface IProps extends RouteComponentProps<{}> {}

interface IState {
  token?: string
  user?: IUser
}

class Index extends React.Component<IProps, IState> {
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

WebFont.load({
  google: {
    families: [
      'Oswald:300, 400, 700, 900', 'sans-serif',
      'Roboto:300, 400, 700, 900', 'sans-serif',
      'Material Icons: 400, normal',
    ],
  },
})

ReactDOM.render((
  <BrowserRouter>
    <Route path="/" component={Index} />
  </BrowserRouter>
), document.getElementById('root') as HTMLElement
)
registerServiceWorker()