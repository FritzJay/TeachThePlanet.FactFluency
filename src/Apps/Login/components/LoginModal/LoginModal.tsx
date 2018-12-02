import * as React from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'

import { saveSignInTeacher, saveSignInStudent } from 'src/api'

import { Button, Loading, Modal, ModalContent, ModalHeader, Input } from 'src/sharedComponents'
import { UserTypes } from '../UserTypes/UserTypes'
import { USER_TYPES } from '../../Login'
import './LoginModal.css'

interface IProps extends RouteComponentProps<any> {
  client: ApolloClient<any>
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

class LoginModal extends React.Component<IProps, IState> {
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
  
  private handlePracticeClick = async () => {
    if (process.env.REACT_APP_DEFAULT_STUDENT_LOGIN === undefined || process.env.REACT_APP_DEFAULT_PASSWORD === undefined) {
      throw new Error(
        'There was an error logging in with the default student. ' +
        'Make sure you setup a REACT_APP_DEFAULT_STUDENT_LOGIN ' +
        'environment variable and a student document that corresponds ' +
        'to the environment variable. The student also needs to be a part ' +
        'of a class with default test parameters.'
      )
    }
    this.loginRequest(process.env.REACT_APP_DEFAULT_STUDENT_LOGIN, process.env.REACT_APP_DEFAULT_PASSWORD, USER_TYPES.student)
  }

  private handleLoginClick = async () => {
    const { email, password, userType } = this.props

    if (email === '') {
      this.setState({ error: 'Please enter an email and password' })
      return
    }
    
    await this.loginRequest(email, password, userType)
  }

  private loginRequest = async (email: string, password: string, userType: string) => {
    if (email !== '' && password !== '') {
      this.setState({ loading: true }, async () => {
        await this.loginForUserType(email, password, userType)
      })
    }
  }

  private async loginForUserType(email: string, password: string, userType: string) {
    const { client, history } = this.props

    try {
      switch (userType) {
        case USER_TYPES.student: {
          await client.resetStore()
          const token = await saveSignInStudent(email, password)
          await localStorage.setItem('token', token)
          history.push('/fact-fluency')
          return
        }
        case USER_TYPES.teacher: {
          await client.resetStore()
          const token = await saveSignInTeacher(email, password)
          await localStorage.setItem('token', token)
          history.push('/teacher')
          return
        }
        default:
          throw new Error('Invalid user type!')
      }
    } catch(error) {
      console.warn(error)
      if (error.name === 'ChangePasswordRequiredError') {
        history.push('/index/first-time-sign-in')
        return
      } else if (error === 'Invalid email or password') {
        this.setState({
          error,
          loading: false,
        })
      } else {
        this.setState({
          error: 'There was an unexpected error. Please try again later.',
          loading: false,
        })
      }
    }
  }
}

export const LoginModalWithData = withApollo(LoginModal)