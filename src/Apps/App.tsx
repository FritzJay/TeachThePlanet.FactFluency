import * as React from 'react'
import { connect } from 'react-redux'
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom'
import Login from 'src/Apps/Login/Login'
import { LoadingBar, PageNotFound } from 'src/sharedComponents'
import './App.css'
import { TeacherHome } from './TeacherHome/TeacherHome'
import { FactFluency } from './FactFluency/FactFluency'

interface IProps extends RouteComponentProps<{}> {
  userType?: string
  dispatch: any
}

class App extends React.Component<IProps> {
  public componentDidMount() {
    const { history, location } = this.props

    switch (this.props.userType) {
      case 'teacher':
        history.push('/teacher')
      case 'student':
        history.push('/fact-fluency')
      default:
        if (!location.pathname.startsWith('/index')) {
          history.push('/index')
        }
    }
  }

  public render() {
    return (
      <div className="App">
        <LoadingBar />
        
        <Switch>
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

const mapStateToProps = ({ user }: any) => ({
  userType: user
    ? user.role
    : undefined
})

const ConnectedApp = connect(mapStateToProps)(App)

export default withRouter(ConnectedApp)