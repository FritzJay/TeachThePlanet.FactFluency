import * as React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { handleSignInStudent } from 'src/handlers/student'
import { handleSignInTeacher } from 'src/handlers/teacher';
import { Button, Loading, Modal, ModalContent, ModalHeader } from 'src/sharedComponents'
import { UserTypes } from '../UserTypes/UserTypes'
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
    
    await this.loginRequest(email, password, userType)
  }

  private loginRequest = async (email: string, password: string, userType: string) => {
    try {
      this.setState({ loading: true }, () => this.loginForUserType(email, password, userType))
    } catch(error) {
      console.warn(error)
      this.setState({
        error: error.toString(),
        loading: false,
      })
    }
  }

  private loginForUserType(email: string, password: string, userType: string) {
    const { history, dispatch } = this.props

    switch (userType) {
      case 'Student':
        dispatch(handleSignInStudent(email, password))
        history.push('/fact-fluency')
        return
      case 'Teacher':
        dispatch(handleSignInTeacher(email, password))
        history.push('/classes')
        return
      default:
        throw new Error('Invalid user type!')
    }
  }
}

export const LoginModal = connect()(DisconnectedLoginModal)
