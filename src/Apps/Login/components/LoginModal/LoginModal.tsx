import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, Link } from 'react-router-dom'

import { handleSignInStudent } from 'src/handlers/factFluency'
import { handleSignInTeacher } from 'src/handlers/teacherHome'
import { Button, Loading, Modal, ModalContent, ModalHeader, Input } from 'src/sharedComponents'
import { UserTypes } from '../UserTypes/UserTypes'
import { USER_TYPES } from '../../Login'
import './LoginModal.css'

interface IProps extends RouteComponentProps<any> {
  dispatch: any
  email: string
  password: string
  userType: string
  onUserTypeSelect: (e: any) => void
  onChange: (e: any) => void
}

interface IState {
  error: string
  loading: boolean
}

class DisconnectedLoginModal extends React.Component<IProps, IState> {
  public state: IState = {
    error: '',
    loading: false,
  }

  public render() {
    const { email, password, userType, onUserTypeSelect, onChange } = this.props
    const { error, loading } = this.state

    if (loading) {
      return (
        <Modal
          overlay={true}
          className="LoginModal"
        >
          <Loading className="loading" />
        </Modal>
      )
    }

    return (
      <Modal
        overlay={true}
        className="LoginModal"
      >

        <ModalHeader className="login-modal-header">
          <h1>Sign In</h1>
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

          <Input
            onChange={onChange}
            value={email}
            name="email"
            placeholder="Email or Username"
          />

          <Input
            onChange={onChange}
            value={password}
            name="password"
            placeholder="Password"
            type="password"
          />
        </ModalContent>

        <ModalContent className="sign-log">
          <Button
            className="login-modal-button green"
            onClick={this.handleLoginClick}
          >
            Sign In
          </Button>

          <p className="sign-up-link">Looking to <Link to="/index/signup">create an account?</Link></p>
        </ModalContent>

        {userType === USER_TYPES.student
          ? (
            <ModalContent className="bottom-content">
              <Button
                className="green practice-button"
                onClick={this.handlePracticeClick}
              >
                Practice Without an Account
              </Button>
            </ModalContent>
          ): null}
        

      </Modal>
    )
  }
  
  private handlePracticeClick = async () => this.loginRequest(process.env.REACT_APP_DEFAULT_STUDENT_LOGIN, 'password', USER_TYPES.student)

  private handleLoginClick = async () => {
    const { email, password, userType } = this.props

    if (email === '') {
      this.setState({ error: 'Please enter an email and password' })
      return
    }
    
    await this.loginRequest(email, password, userType)
  }

  private loginRequest = async (email?: string, password?: string, userType?: string) => {
    if (email !== undefined && password !== undefined && userType !== undefined) {
      this.setState({ loading: true }, async () => {
        await this.loginForUserType(email, password, userType)
      })
    } else {
      throw new Error('There was an error logging in with the default student. You probably need to setup a REACT_APP_DEFAULT_STUDENT_LOGIN environment variable')
    }
  }

  private async loginForUserType(email: string, password: string, userType: string) {
    const { dispatch, history } = this.props

    try {
      switch (userType) {
        case USER_TYPES.student:
          try {
            await dispatch(handleSignInStudent(email, password))
            history.push('/fact-fluency')
            return
          } catch (error) {
            if (error.name === 'ChangePasswordRequiredError') {
              history.push('/index/first-time-sign-in')
              return
            }
          }
        case USER_TYPES.teacher:
          await dispatch(handleSignInTeacher(email, password))
          history.push('/teacher')
          return
        default:
          throw new Error('Invalid user type!')
      }
    } catch(error) {
      console.warn(error)
      this.setState({
        error: error.toString(),
        loading: false,
      })
    }
  }
}

export const LoginModal = connect()(DisconnectedLoginModal)
