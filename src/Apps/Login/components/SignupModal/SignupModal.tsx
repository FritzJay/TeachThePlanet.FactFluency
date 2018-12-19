import * as React from 'react'
import { ApolloClient, gql } from 'apollo-boost'
import { withApollo } from 'react-apollo'
import { Link, RouteComponentProps } from 'react-router-dom'

import { Button, Modal, ModalContent, ModalHeader, Input } from 'src/sharedComponents'
import { UserTypes } from '..'
import { USER_TYPES } from '../../Login'
import './SignupModal.css'

interface IProps extends RouteComponentProps<any> {
  client: ApolloClient<any>
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
  firstName: string
  lastName: string
  title: string
}

class SignupModal extends React.Component<IProps, IState> {
  public state: IState = {
    error: '',
    loading: false,
    firstName: '',
    lastName: '',
    title: '',
  }

  public render() {
    const { email, password, secondPassword, userType, onUserTypeSelect, onChange } = this.props
    const { error, firstName, lastName, title } = this.state

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
          
          <Input
            onChange={this.handleChange}
            value={firstName}
            name="firstName"
            placeholder="First Name"
          />

          <Input
            onChange={this.handleChange}
            value={lastName}
            name="lastName"
            placeholder="Last Name"
          />

          {userType === USER_TYPES.teacher ? (
            <Input
              onChange={this.handleChange}
              value={title}
              name="title"
              placeholder="Title"
            />
          ) : null}

          <Input
            onChange={onChange}
            value={email}
            name="email"
            placeholder="Email"
          />

          <Input
            onChange={onChange}
            value={password}
            name="password"
            placeholder="Password"
            type="password"
          />

          <Input
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
    const { client, email, history, password, secondPassword, userType } = this.props
    const { firstName, lastName, title } = this.state

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

    if (firstName === '') {
      this.setState({ error: 'First name is required' })
      return
    }

    if (lastName === '') {
      this.setState({ error: 'Last name is required' })
      return
    }

    await client.resetStore()
    await localStorage.clear()

    try {
      switch (userType) {
        case USER_TYPES.student: {
          await client.mutate({
            mutation: gql`
              mutation registerStudent($input: RegisterTeacherInput!) {
                registerStudent(input: $input)
              }
            `,
            variables: { email, username: email, firstName, lastName, password }
          })
          const { data: { authenticateStudent: token } }: any = await client.query({
            query: gql`
              query authenticateStudent($username: String!, $password: String!) {
                authenticateStudent(username: $username, password: $password)
              }
            `,
            variables: { username: email, password }
          })
          await localStorage.setItem('token', token)
          history.push('/fact-fluency')
          return
        }
        case USER_TYPES.teacher: {
          await client.mutate({
            mutation: gql`
              mutation registerTeacher($input: RegisterTeacherInput!) {
                registerTeacher(input: $input)
              }
            `,
            variables: { email, firstName, lastName, password, title: title === '' ? null : title }
          })
          const { data: { authenticateTeacher: token } }: any = await client.query({
            query: gql`
              query authenticateTeacher($email: String!, $password: String!) {
                authenticateTeacher(email: $email, password: $password)
              }
            `,
            variables: { email, password }
          })
          await localStorage.setItem('token', token)
          history.push('/teacher')
          return
        }
        default:
          throw new Error('Invalid user type')
      }
    } catch (error) {
      console.warn(error)
      this.setState({
        error: 'There was an unexpected error. Please try again later.',
        loading: false,
      })
    }
  }

  private handleChange = (e: any) => {
    const { name, value } = e.target
    const state = {}
    state[name] = value
    this.setState(state)
  }
}

export const SignupModalWithData = withApollo(SignupModal)