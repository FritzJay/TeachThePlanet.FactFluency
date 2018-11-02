import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Button } from '../../../../Components/Button/Button'
import { Modal, ModalContent, ModalHeader } from '../../../../Components/Modal/Modal'
import { IRequest } from '../../../../lib/Interfaces';
import { Requests } from '../../../../lib/lib';
import './SignupModal.css'

interface IProps extends RouteComponentProps<any> {
  email: string
  password: string
  loginType: string
  onSignup: (email: string, password: string, userType: string) => void
}

interface IState {
  email: string
  loginType: string
  password: string
  secondPassword: string
  error: string
}

export class SignupModal extends React.Component<IProps, IState> {
  constructor(props: any) {
    console.log(props)
    super(props)

    this.state = {
      email: this.props.email,
      error: 'Please confirm your password',
      loginType: this.props.loginType,
      password: this.props.password,
      secondPassword: '',
    }

    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSecondPasswordChange = this.handleSecondPasswordChange.bind(this)
    this.handleSignupClick = this.handleSignupClick.bind(this)
    this.handleSignupTypeClick = this.handleSignupTypeClick.bind(this)
  }

  public render() {
    return (
      <Modal className="signup-modal">
        <ModalHeader className="signup-modal-header">
          <h1>Sign Up or Login</h1>
        </ModalHeader>

        <ModalContent className="user-types">
          <h3>What type of user are you?</h3>

          <div className="button-row">
            <Button
              className={this.getClassName('Teacher')}
              onClick={this.handleSignupTypeClick}
            >
              Teacher
            </Button>

            <Button
              className={this.getClassName('Student')}
              onClick={this.handleSignupTypeClick}
            >
              Student
            </Button>

            <Button
              className={this.getClassName('Parent')}
              onClick={this.handleSignupTypeClick}
            >
              Parent
            </Button>
          </div>
        </ModalContent>

        <ModalContent className="inputs">
          {this.state.error !== '' && <p className="error">{this.state.error}</p>}
          
          <input
            className="input"
            onChange={this.handleEmailChange}
            value={this.state.email}
            placeholder="Email"
          />

          <input
            className="input"
            onChange={this.handlePasswordChange}
            value={this.state.password}
            placeholder="Password"
            type="password"
          />

          <input
            className="input"
            onChange={this.handleSecondPasswordChange}
            value={this.state.secondPassword}
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

          <Button
            className="red cancel-button"
            onClick={this.handleCancelClick}
          >
            Cancel
          </Button>
        </ModalContent>
      </Modal>
    )
  }

  private handleSignupTypeClick(e: any) {
    const value = e.target.innerText
    
    if (value !== this.state.loginType) {
      this.setState({
        error: '',
        loginType: value,
      })
    }
  }

  private handleEmailChange(e: any) {
    this.setState({
      email: e.target.value
    })
  }
  
  private handlePasswordChange(e: any) {
    this.setState({
      password: e.target.value
    })
  }
  
  private handleSecondPasswordChange(e: any) {
    this.setState({
      secondPassword: e.target.value
    })
  }
  
  private async handleSignupClick() {
    if (this.state.email === '' || this.state.password === '') {
      this.setState({ error: 'Please enter an email and password' })
      return
    }

    if (this.state.secondPassword === '') {
      this.setState({ error: 'Please confirm your password' })
      return
    }

    if (this.state.password !== this.state.secondPassword) {
      this.setState({ error: 'Passwords do not match' })
      return
    }

    const request: IRequest = {
      body: {
        email: this.state.email,
        loginType: this.state.loginType,
        password: this.state.password,
      },
      method: "POST",
    }

    let url
    if (this.state.loginType === 'Student') {
      url = `${process.env.REACT_APP_API_URL}/students/create`
    } else if (this.state.loginType === 'Teacher') {
      url = `${process.env.REACT_APP_API_URL}/teachers/create`
    } else {
      url = `${process.env.REACT_APP_API_URL}/parents/create`
    }

    Requests.jsonFetch(url, request)
      .then((response) => {
        console.log(response)
        this.props.onSignup(response.user, response.token, this.state.loginType)
      })
      .catch(() => {
        this.setState({error: 'Invalid email/username or password'});
      });
  }

  private handleCancelClick() {
    this.props.history.goBack()
  }
  
  private getClassName(buttonType: string) {
    return (
      buttonType === this.state.loginType
      ? 'gray signup-modal-button active'
      : 'gray signup-modal-button'
      )
    }
}