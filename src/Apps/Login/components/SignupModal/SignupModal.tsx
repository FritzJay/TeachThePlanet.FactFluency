import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { signup } from 'src/lib/Api/Sessions'
import { IUser } from 'src/lib/Interfaces'
import { Button, Modal, ModalContent, ModalHeader } from 'src/sharedComponents'
import { UserTypes } from '../UserTypes/UserTypes'
import './SignupModal.css'

interface IProps extends RouteComponentProps<any> {
  email: string
  password: string
  secondPassword: string
  userType: string
  onSignup: (user: IUser, token: string, userType: string) => void
  onUserTypeSelect: (e: any) => void
  onEmailChange: (e: any) => void
  onPasswordChange: (e: any) => void
  onSecondPasswordChange: (e: any) => void
}

interface IState {
  error: string
}

export class SignupModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      error: ''
    }

    this.handleSignupClick = this.handleSignupClick.bind(this)
  }

  public render() {
    const { email, password, secondPassword, userType, onUserTypeSelect, onEmailChange, onPasswordChange, onSecondPasswordChange } = this.props
    const { error } = this.state

    return (
      <Modal
        overlay={true}
        className="signup-modal"
      >
        <ModalHeader className="signup-modal-header">
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
            placeholder="Email"
          />

          <input
            className="input"
            onChange={onPasswordChange}
            value={password}
            placeholder="Password"
            type="password"
          />

          <input
            className="input"
            onChange={onSecondPasswordChange}
            value={secondPassword}
            placeholder="Verify password"
            type="password"
          />
        </ModalContent>

        <ModalContent className="bottom-buttons">
          <Button
            className="signup-modal-button gray"
            onClick={this.handleSignupClick}
          >
            Sign up
          </Button>

          <Link to='/login'>
            <Button className="red cancel-button">
              Cancel
            </Button>
          </Link>
        </ModalContent>
      </Modal>
    )
  }

  private async handleSignupClick() {
    const { email, password, secondPassword, userType } = this.props

    if (email === '' || password === '') {
      this.setState({ error: 'Please enter an email and password' })
      return
    }

    if (secondPassword === '') {
      this.setState({ error: 'Please confirm your password' })
      return
    }

    if (password !== secondPassword) {
      this.setState({ error: 'Passwords do not match' })
      return
    }

    try {
      const { user, token } = await signup(email, password, userType)
  
      this.props.onSignup(user, token, userType)

    } catch(error) {
      console.warn(error)
      this.setState({ error: 'An unexpected error ocurred. Please try again later. '})
    }
  }
}