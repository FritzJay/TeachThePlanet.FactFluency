import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom'
import { PageNotFound } from 'src/sharedComponents';
import * as WebFont from 'webfontloader'
import { FactFluency } from './Apps/FactFluency/FactFluency'
import { Home } from './Apps/Home/Home'
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
  public constructor(props: IProps) {
    super(props)

    this.state = {}

    this.renderHome = this.renderHome.bind(this)
    this.renderFactFluency = this.renderFactFluency.bind(this)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  public render() {
    return (
      <div>
        <Switch>
          <Route
            path={'/fact-fluency'}
            render={this.renderFactFluency}
          />

          <Route
            path='/'
            render={this.renderHome}
          />

          <Route component={PageNotFound} />
        </Switch>
      </div>
    )
  }

  private renderHome(props: any) {
    return (
      <Home
        {...props}
        onLogin={this.handleLogin}
        onLogout={this.handleLogout}
        user={this.state.user}
        token={this.state.token}
      />
    )
  }

  private renderFactFluency(props: any) {
    return (
      <FactFluency
        {...props}
        onLogout={this.handleLogout}
        user={this.state.user}
        token={this.state.token}
      />
    )
  }

  private handleLogin(user: IUser, token: string, userType: string) {
    console.log('Logging in user', user, token, userType)

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
        this.props.history.push('/')
      }
    })
  }

  private handleLogout() {
    localStorage.clear()

    this.setState({
      token: undefined,
      user: undefined,
    }, () => {
      this.props.history.replace('/')
    })
  }
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

const indexWithRouter = withRouter(Index)

ReactDOM.render((
  <BrowserRouter>

    <Route path="/">
      {indexWithRouter}
    </Route>
    
  </BrowserRouter>
), document.getElementById('root') as HTMLElement
)
registerServiceWorker()