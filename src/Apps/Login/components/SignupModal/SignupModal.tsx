import * as React from 'react'
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom'
import { handleSignUpUser } from 'src/redux/handlers/users';
import { Button, Modal, ModalContent, ModalHeader } from 'src/sharedComponents'
import { UserTypes } from '../UserTypes/UserTypes'
import './SignupModal.css'

interface IProps extends RouteComponentProps<any> {
  dispatch: any
  email: string
  password: string
  secondPassword: string
  userType: string
  onUserTypeSelect: (e: any) => void
  onChange: (e: any) => void
}

interface IState {
  error: string
  loading: boolean
}

class DisconnectedSignupModal extends React.Component<IProps, IState> {
  public state: IState = {
    error: '',
    loading: false,
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
          {error !== '' ? <p className="error active">{error}</p> : null}
          
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

          <Link to='/index/login'>
            <Button className="red cancel-button">
              Cancel
            </Button>
          </Link>
        </ModalContent>
      </Modal>
    )
  }

  private handleSignupClick = async () => {
    const { dispatch, email, history, password, secondPassword, userType } = this.props

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
      await dispatch(handleSignUpUser(email, password, userType))

      if (userType === 'Student') {
        history.push('/fact-fluency')
      } else if (userType === 'Teacher') {
        history.push('/classes')
      } else {
        history.push('/index')
      }

    } catch(error) {
      console.warn(error)
      this.setState({ error: 'An unexpected error ocurred. Please try again later. '})
    }
  }
}

export const SignupModal = connect()(DisconnectedSignupModal)