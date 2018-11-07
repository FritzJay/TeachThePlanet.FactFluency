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
  onChange: (e: any) => void
}

interface IState {
  error: string
}

export class SignupModal extends React.Component<IProps, IState> {
  public state = {
    error: ''
  }

  public render() {
    const { email, password, secondPassword, userType, onUserTypeSelect, onChange } = this.props
    const { error } = this.state

    return (
      <Modal
        overlay={true}
        className="SignupModal"
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
            onChange={onChange}
            value={email}
            name="email"
            placeholder="Email"
          />

          <input
            className="input"
            onChange={onChange}
            value={password}
            name="password"
            placeholder="Password"
            type="password"
          />

          <input
            className="input"
            onChange={onChange}
            value={secondPassword}
            name="secondPassword"
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

  private handleSignupClick = async () => {
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