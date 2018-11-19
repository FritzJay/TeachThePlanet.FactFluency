import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

import { Button, Input, Modal, ModalContent, ModalHeader, Loading } from 'src/sharedComponents'
import { handleCreateInvitation } from 'src/handlers/invitations'
import './SendInviteModal.css'

interface IProps extends RouteComponentProps<{ id: string }> {
  token: string
  dispatch: any
}

interface IState {
  student: string
  successMessage: string
  loading: boolean
  error: string
}

class SendInviteModal extends React.Component<IProps, IState> {
  public state: IState = {
    student: '',
    loading: false,
    error: '',
    successMessage: '',
  }

  public render() {
    const { student, error, loading, successMessage } = this.state

    return (
      <Modal
        overlay={true}
        className="SelectStudentsModal"
      >
        <ModalHeader className="header">
          <h1>Add Students</h1>
        </ModalHeader>

        <ModalContent>
          <h3 className="sub-header">Send an invitation</h3>

          {error !== ''
            ? <p className="error">{error}</p>
            : null
          }

          {successMessage !== ''
            ? <p className="success-message">{successMessage}</p>
            : null
          }

          {loading
            ? <Loading />
            : null
          }

          <label
            className="student-label"
            htmlFor="student"
          >
            Email/Username:
          </label>
          <Input
            className="student-input"
            name="student"
            value={student}
            onChange={this.handleChange}
          />
          

          <div className="btn-row">
            <Button
              className="gray"
              onClick={this.handleCloseClick}
            >
              Back
            </Button>
            <Button
              className="green"
              onClick={this.handleSendClick}
            >
              Send
            </Button>
          </div>
        </ModalContent>
      </Modal>
    )
  }

  private handleSendClick = () => {
    if (this.state.student === '') {
      alert('Enter a student\'s email address to send an invitation')
      return
    }

    const { dispatch, token, match } = this.props

    this.setState({ loading: true }, async () => {
      try {
        await dispatch(handleCreateInvitation(token, match.params.id, this.state.student))
        this.setState({
          loading: false,
          error: '',
          successMessage: 'Invitation was successfully submitted!'
        })
      } catch (error) {
        console.warn(error)
        this.setState({
          loading: false,
          error: error.toString(),
          successMessage: '',
        })
      }
    })
  }

  private handleCloseClick = () => this.props.history.replace(`/teacher/class-detail/${this.props.match.params.id}`)

  private handleChange = (e: any) => {
    const { name, value } = e.target
    const newState = {}
    newState[name] = value
    this.setState({
      ...newState,
      error: '',
      successMessage: '',
    })
  }
}
  

const MapStateToProps = ({ user }: any, { match }: any) => ({ token: user.token })

export const ConnectedSendInviteModal = connect(MapStateToProps)(SendInviteModal)
