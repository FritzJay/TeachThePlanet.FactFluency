import * as React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { LoginModal, Navbar, PageNotFound, SignupModal, TitleModal } from './components'
import './Login.css'

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
    userType: 'Student',
  }

  public render() {
    const { match } = this.props

    return (
     <div className="Login">

      <Navbar logoLink={'/'} />

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

        <Route component={PageNotFound} />
      </Switch>
     
     </div> 
    )
  }

  private renderLoginModal = (props: any) => {
    const { email, password, secondPassword, userType } = this.state

    return (
      <LoginModal
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
      <SignupModal
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
    const value = e.target.innerText
    
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
}