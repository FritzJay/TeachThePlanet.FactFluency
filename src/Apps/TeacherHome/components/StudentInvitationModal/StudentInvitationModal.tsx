import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

import { Button, Input, Modal, ModalContent, ModalHeader, Loading } from 'src/sharedComponents'
import { handleCreateInvitation } from 'src/handlers/invitations'
import './StudentInvitationModal.css'

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

class StudentInvitationModal extends React.Component<IProps, IState> {
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
        closeTo={`/teacher/class-detail/${this.props.match.params.id}`}
        className="StudentInvitationModal"
      >
        <ModalHeader className="header">
          <h1>Invite Students</h1>
        </ModalHeader>

        <ModalContent className="content">
          <h3 className="sub-header">Enter the email or username of an existing student</h3>

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

          <Input
            className="student-input"
            name="student"
            value={student}
            placeholder="Email/Username"
            onChange={this.handleChange}
          />
          

          <div className="btn-row">
            <Button
              className="gray"
              onClick={this.handleCloseClick}
            >
              Close
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
      this.setState({
        loading: false,
        error: 'Email or username is required',
        successMessage: ''
      })
      return
    }

    const { dispatch, token, match } = this.props

    this.setState({
      loading: true,
      error: ''
    }, async () => {
      try {
        await dispatch(handleCreateInvitation(token, match.params.id, this.state.student))
        this.setState({
          loading: false,
          error: '',
          successMessage: 'Invitation was successfully submitted!',
          student: '',
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

export const ConnectedStudentInvitationModal = connect(MapStateToProps)(StudentInvitationModal)
