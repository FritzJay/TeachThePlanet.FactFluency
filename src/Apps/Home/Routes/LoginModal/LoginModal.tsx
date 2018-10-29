import * as React from 'react';
import { Button, Modal, ModalContent, ModalHeader } from '../../../../Components/Components';
import { IUser } from '../../../../lib/Interfaces';
import { IRequest } from '../../../../lib/Interfaces';
import { Requests } from '../../../../lib/lib';
import './LoginModal.css';

interface IProps {
  onLogin: (user: IUser, token: string, userType: string) => void;
}

interface IState {
  email: string;
  loginType: string;
  password: string;
  error?: string;
}

export class LoginModal extends React.Component<IProps, IState> {
  public constructor(props: any) {
    super(props);
    
    this.state = {
      email: '',
      loginType: 'Student',
      password: '',
    }

    this.handleLoginTypeClick = this.handleLoginTypeClick.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleSignupClick = this.handleSignupClick.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  public render() {
    return (
      <Modal className="login-modal">
        <ModalHeader className="login-modal-header">
          <h1>Sign Up or Login</h1>
        </ModalHeader>

        <ModalContent className="user-types">
          <h3>What type of user are you?</h3>

          <div className="button-row">
            <Button
              className={this.getClassName('Teacher')}
              onClick={this.handleLoginTypeClick}
            >
              Teacher
            </Button>

            <Button
              className={this.getClassName('Student')}
              onClick={this.handleLoginTypeClick}
            >
              Student
            </Button>

            <Button
              className={this.getClassName('Parent')}
              onClick={this.handleLoginTypeClick}
            >
              Parent
            </Button>
          </div>
        </ModalContent>

        <ModalContent className="inputs">
          <input
            className="input"
            onChange={this.handleEmailChange}
            value={this.state.email}
            placeholder="Email or Username"
          />

          <input
            className="input"
            onChange={this.handlePasswordChange}
            value={this.state.password}
            placeholder="Password"
            type="password"
          />
        </ModalContent>

        <ModalContent>
          <div className="button-row">
            <Button
              className="login-modal-button gray"
              onClick={this.handleSignupClick}
            >
              Sign up
            </Button>

            <Button
              className="login-modal-button gray"
              onClick={this.handleLoginClick}
            >
              Login
            </Button>
          </div>

          <p className="error">{this.state.error}</p>
        </ModalContent>

        <ModalContent className="bottom-content">
          <Button
            className="green practice-button"
            onClick={this.handleLoginClick}
          >
            Practice Without an Account
          </Button>
        </ModalContent>
      </Modal>
    );
  }
  
  private handleLoginTypeClick(e: any) {
    const value = e.target.innerText;
    
    if (value !== this.state.loginType) {
      this.setState({
        error: undefined,
        loginType: value,
      })
    }
  }

  private handleEmailChange(e: any) {
    this.setState({
      email: e.target.value
    })
  }
  
  private handlePasswordChange(e: any) {
    this.setState({
      password: e.target.value
    })
  }
  
  private handleSignupClick() {
    return;
  }
  
  private handleLoginClick() {
    if (this.state.email === '' || this.state.password === '') {
      return
    }

    const request: IRequest = {
      body: {
        email: this.state.email,
        loginType: this.state.loginType,
        password: this.state.password,
      },
      method: "POST",
    };

    let url;
    if (this.state.loginType === 'Student') {
      url = `${process.env.REACT_APP_API_URL}/students/signin`
    } else if (this.state.loginType === 'Teacher') {
      url = `${process.env.REACT_APP_API_URL}/teachers/signin`
    } else {
      url = `${process.env.REACT_APP_API_URL}/parents/signin`
    }

    Requests.jsonFetch(url, request)
      .then((response) => {
        this.props.onLogin(response.user, response.token, this.state.loginType)
      })
      .catch(() => {
        this.setState({error: 'Invalid email/username or password'});
      });
  }
  
  private getClassName(buttonType: string) {
    return (
      buttonType === this.state.loginType
      ? 'gray login-modal-button active'
      : 'gray login-modal-button'
      )
    }
  }