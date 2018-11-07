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
  onChange: (e: any) => void
}

interface IState {
  error: string
}

export class LoginModal extends React.Component<IProps, IState> {
  public state: IState = {
    error: ''
  }

  public render() {
    const { email, password, userType, onUserTypeSelect, onChange } = this.props
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
            onChange={onChange}
            value={email}
            name="email"
            placeholder="Email or Username"
          />

          <input
            className="input"
            onChange={onChange}
            value={password}
            name="password"
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
  
  private handlePracticeClick = async () =>  this.loginRequest('empty@email.com', 'password', 'Student')

  private handleLoginClick = async () => {
    const { email, password, userType } = this.props

    if (email === '' || password === '') {
      this.setState({ error: 'Please enter an email and password' })
      return
    }
    
    this.loginRequest(email, password, userType)
  }

  private loginRequest = async (email: string, password: string, userType: string) => {
    try {
      const { user, token } = await login(email, password, userType)
  
      this.props.onLogin(user, token, userType)

    } catch(error) {
      console.warn(error)
      this.setState({ error: 'Invalid email/username or password'})
    }
  }
}