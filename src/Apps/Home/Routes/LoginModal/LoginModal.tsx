import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Modal, ModalContent, ModalHeader } from '../../../../Components/Components';
import { login } from '../../../../lib/Api';
import { IUser } from '../../../../lib/Interfaces';
import './LoginModal.css';

interface IProps extends RouteComponentProps<any> {
  email: string
  password: string
  userType: string
  onLogin: (user: IUser, token: string, userType: string) => void;
  onUserTypeSelect: (e: any) => void;
  onEmailChange: (e: any) => void;
  onPasswordChange: (e: any) => void;
}

interface IState {
  error: string
}

export class LoginModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      error: ''
    }

    this.handleLoginClick = this.handleLoginClick.bind(this)
  }

  public render() {
    const { email, password, onUserTypeSelect, onEmailChange, onPasswordChange } = this.props
    const { error } = this.state

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
              onClick={onUserTypeSelect}
            >
              Teacher
            </Button>

            <Button
              className={this.getClassName('Student')}
              onClick={onUserTypeSelect}
            >
              Student
            </Button>

            <Button
              className={this.getClassName('Parent')}
              onClick={onUserTypeSelect}
            >
              Parent
            </Button>
          </div>
        </ModalContent>

        <ModalContent className="inputs">
          {error !== '' && <p className="error active">{error}</p>}

          <input
            className="input"
            onChange={onEmailChange}
            value={email}
            placeholder="Email or Username"
          />

          <input
            className="input"
            onChange={onPasswordChange}
            value={password}
            placeholder="Password"
            type="password"
          />
        </ModalContent>

        <ModalContent>
          <div className="button-row">

            <Link to={`${this.props.match.url}/signup`}>
              <Button
                className="login-modal-button gray"
              >
                Sign up
              </Button>
            </Link>

            <Button
              className="login-modal-button gray"
              onClick={this.handleLoginClick}
            >
              Login
            </Button>
          </div>
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

  private async handleLoginClick() {
    const { email, password, userType } = this.props

    if (email === '' || password === '') {
      this.setState({ error: 'Please enter an email and password' })
      return
    }

    try {
      const { user, token } = await login(email, password, userType)
  
      this.props.onLogin(user, token, userType)

    } catch(error) {
      console.warn(error)
      this.setState({ error: 'Invalid email/username or password'})
    }
  }
  
  private getClassName(buttonType: string) {
    return (
      buttonType === this.props.userType
      ? 'gray login-modal-button active'
      : 'gray login-modal-button'
      )
    }
  }