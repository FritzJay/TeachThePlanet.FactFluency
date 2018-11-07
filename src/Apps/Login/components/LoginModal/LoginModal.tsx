import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { login } from 'src/lib/Api/Sessions'
import { IUser } from 'src/lib/Interfaces'
import { Button, Modal, ModalContent, ModalHeader } from 'src/sharedComponents'
import { UserTypes } from '../UserTypes/UserTypes'
import './LoginModal.css'

interface IProps extends RouteComponentProps<any> {
  email: string
  password: string
  userType: string
  onLogin: (user: IUser, token: string, userType: string) => void
  onUserTypeSelect: (e: any) => void
  onEmailChange: (e: any) => void
  onPasswordChange: (e: any) => void
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
    this.handlePracticeClick = this.handlePracticeClick.bind(this)
    this.loginRequest = this.loginRequest.bind(this)
  }

  public render() {
    const { email, password, userType, onUserTypeSelect, onEmailChange, onPasswordChange } = this.props
    const { error } = this.state

    return (
      <Modal
        overlay={true}
        className="LoginModal"
      >

        <ModalHeader className="login-modal-header">
          <h1>Sign Up or Login</h1>
        </ModalHeader>

        <ModalContent className="user-types">
          <h3>What type of user are you?</h3>

          <UserTypes
            currentType={userType}
            onSelect={onUserTypeSelect}
          />

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

        <ModalContent className="sign-log">
          <div className="button-row">

            <Link to='/index/signup'>
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
            onClick={this.handlePracticeClick}
          >
            Practice Without an Account
          </Button>
        </ModalContent>

      </Modal>
    )
  }

  private async handleLoginClick() {
    const { email, password, userType } = this.props

    if (email === '' || password === '') {
      this.setState({ error: 'Please enter an email and password' })
      return
    }
    
    this.loginRequest(email, password, userType)
  }
  
  private async handlePracticeClick() {
    this.loginRequest('empty@email.com', 'password', 'Student')
  }

  private async loginRequest(email: string, password: string, userType: string) {
    try {
      const { user, token } = await login(email, password, userType)
  
      this.props.onLogin(user, token, userType)

    } catch(error) {
      console.warn(error)
      this.setState({ error: 'Invalid email/username or password'})
    }
  }
}