import * as React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'

import { Button, Modal, ModalContent, ModalHeader } from 'src/sharedComponents'
import { UserTypes } from '..'
import { handleSignUpTeacher } from 'src/handlers/teacherHome'
import { handleSignUpStudent } from 'src/handlers/factFluency'
import { USER_TYPES } from '../../Login'
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
          <h1>Register</h1>
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
            className="signup-modal-button green"
            onClick={this.handleSignupClick}
          >
            Sign up
          </Button>

          <p className="sign-up-link"><Link to="/index/login">Already have an account?</Link></p>
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
      switch (userType) {
        case USER_TYPES.student:
          await dispatch(handleSignUpStudent(email, password))
          history.push('/fact-fluency')
          return
        case USER_TYPES.teacher:
          await dispatch(handleSignUpTeacher(email, password))
          history.push('/teacher')
          return
        default:
          throw new Error('Invalid user type')
      }
    } catch (error) {
      console.warn(error)
      this.setState({
        error: error.message,
        loading: false,
      })
    }
  }
}

export const SignupModal = connect()(DisconnectedSignupModal)