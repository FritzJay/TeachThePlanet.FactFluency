import * as React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'

import { Modal, ModalHeader, ModalContent, Button, Loading } from '..'
import { handleChangeStudentPassword } from 'src/handlers/students'
import './UpdateStudentModal.css'

interface IProps extends RouteComponentProps {
  dispatch: any
  email: string
  password: string
  secondPassword: string
  onChange: (e: any) => void
}

interface IState {
  error: string
  loading: boolean
}

class UpdateStudentModal extends React.Component<IProps, IState> {
  public state: IState = {
    error: '',
    loading: false,
  }

  public componentDidMount() {
    this.props.onChange({
      name: 'password',
      value: '',
    })
  }

  public render() {
    const { email, password, secondPassword, onChange, history } = this.props
    const { error, loading } = this.state

    if (email === '') {
      history.goBack()
      return null
    }

    if (loading) {
      return (
        <Modal
          overlay={true}
          className="UpdateStudentModal"
        >
          <ModalHeader className="header">
            <h1>Update Your Password</h1>
          </ModalHeader>

          <ModalContent className="inputs">
            <Loading className="loading" />
          </ModalContent>
        </Modal>
      )
    }

    return (
      <Modal
        overlay={true}
        className="UpdateStudentModal"
      >
        <ModalHeader className="header">
          <h1>Update Your Password</h1>
        </ModalHeader>

        <ModalContent className="inputs">
          {error !== '' ? <p className="error active">{error}</p> : null}

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
            onClick={this.handleChangePassword}
          >
            Change Password
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

  private handleChangePassword = async () => {
    const { dispatch, email, history, password, secondPassword } = this.props

    if (password === '') {
      this.setState({ error: 'Please enter a password' })
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

    this.setState({
      loading: true,
      error: '',
    }, async () => {
      try {
        await dispatch(handleChangeStudentPassword(email, password))
        history.push('/fact-fluency')
      } catch (error) {
        console.warn(error)
        this.setState({
          error: error.message,
          loading: false,
        })
      }
    })
  }
}

export const ConnectedUpdateStudentModal = connect()(UpdateStudentModal)