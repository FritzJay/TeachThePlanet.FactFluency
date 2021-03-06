import * as React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import {
  LoginModalWithData,
  PageNotFound,
  SignupModalWithData,
  TitleModal,
  UpdateStudentModal
} from './components'
import './Login.css'

export const USER_TYPES = {
  student: 'STUDENT',
  teacher: 'TEACHER',
  parent: 'PARENT',
}

interface IProps extends RouteComponentProps<any> { }

interface IState {
  email: string
  password: string
  secondPassword: string
  userType: string
}

export default class Login extends React.Component<IProps, IState> {
  public state: IState = {
    email: '',
    password: '',
    secondPassword: '',
    userType: USER_TYPES.student,
  }

  public render() {
    const { match } = this.props

    return (
     <div className="Login">

      <Switch>
        <Route
          exact={true}
          path={match.path}
          component={TitleModal}
        />
      
        <Route
          exact={true}
          path={`${match.path}/login`}
          render={this.renderLoginModal}
        />

        <Route
          exact={true}
          path={`${match.path}/signup`}
          render={this.renderSignupModal}
        />
      
        <Route
          exact={true}
          path={`${match.path}/first-time-sign-in`}
          render={this.renderUpdateStudentModal}
        />

        <Route component={PageNotFound} />
      </Switch>
     
     </div> 
    )
  }

  private renderLoginModal = (props: any) => {
    const { email, password, secondPassword, userType } = this.state

    return (
      <LoginModalWithData
        {...props}
        email={email}
        password={password}
        secondPassword={secondPassword}
        userType={userType}
        onUserTypeSelect={this.handleUserTypeSelect}
        onChange={this.handleChange}
      />
    )
  }

  private renderSignupModal = (props: any) => {
    const { email, password, secondPassword, userType } = this.state

    return (
      <SignupModalWithData
        {...props}
        email={email}
        password={password}
        secondPassword={secondPassword}
        userType={userType}
        onUserTypeSelect={this.handleUserTypeSelect}
        onChange={this.handleChange}
      />
    )
  }

  private handleUserTypeSelect = (e: any) => {
    const value = e.target.name
    if (value !== this.state.userType) {
      this.setState({
        userType: value
      })
    }
  }

  private handleChange = (e: any) => {
    const { name, value } = e.target

    const state = {}
    state[name] = value

    this.setState(state)
  }

  private renderUpdateStudentModal = (props: any) => {
    const { email, password, secondPassword } = this.state

    return (
      <UpdateStudentModal
        {...props}
        email={email}
        password={password}
        secondPassword={secondPassword}
        onChange={this.handleChange}
      />
    )
  }
}