import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { IUser } from '../../../../lib/Interfaces';
import { LoginModal } from '../LoginModal/LoginModal';
import { SignupModal } from '../SignupModal/SignupModal';
import './Login.css';

interface IProps extends RouteComponentProps<any> {
  onLogin: (user: IUser, token: string, userType: string) => void;
}

interface IState {
  email: string;
  userType: string;
  password: string;
  secondPassword: string;
}

export class Login extends React.Component<IProps, IState> {
  public constructor(props: any) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
      secondPassword: '',
      userType: 'Student',
    }

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleUserTypeSelect = this.handleUserTypeSelect.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSecondPasswordChange = this.handleSecondPasswordChange.bind(this)

    this.renderLoginModal = this.renderLoginModal.bind(this)
    this.renderSignupModal = this.renderSignupModal.bind(this)
  }

  public render() {
    return (
     <div className="login">
     
      <Route
        exact={true}
        path={this.props.match.path}
        render={this.renderLoginModal}
      />

      <Route
        path={`${this.props.match.path}/signup`}
        render={this.renderSignupModal}
      />
     
     </div> 
    )
  }

  private renderLoginModal(props: any) {
    const { email, password, secondPassword, userType } = this.state

    return (
      <LoginModal
        {...props}
        onLogin={this.props.onLogin}
        email={email}
        password={password}
        secondPassword={secondPassword}
        userType={userType}
        onUserTypeSelect={this.handleUserTypeSelect}
        onEmailChange={this.handleEmailChange}
        onPasswordChange={this.handlePasswordChange}
      />
    )
  }

  private renderSignupModal(props: any) {
    const { email, password, secondPassword, userType } = this.state

    return (
      <SignupModal
        {...props}
        onSignup={this.props.onLogin}
        email={email}
        password={password}
        secondPassword={secondPassword}
        userType={userType}
        onUserTypeSelect={this.handleUserTypeSelect}
        onEmailChange={this.handleEmailChange}
        onPasswordChange={this.handlePasswordChange}
        onSecondPasswordChange={this.handleSecondPasswordChange}
      />
    )
  }

  private handleUserTypeSelect(e: any) {
    const value = e.target.innerText;
    
    if (value !== this.state.userType) {
      this.setState({
        userType: value
      })
    }
  }
  
  private handleEmailChange(e: any) {
    const value = e.target.value

    this.setState({
      email: value
    })
  }
  
  private handlePasswordChange(e: any) {
    const value = e.target.value

    this.setState({
      password: value
    })
  }
  
  private handleSecondPasswordChange(e: any) {
    const value = e.target.value

    this.setState({
      secondPassword: value
    })
  }
}