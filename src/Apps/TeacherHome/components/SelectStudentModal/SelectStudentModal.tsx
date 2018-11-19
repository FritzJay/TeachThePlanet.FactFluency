import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

import { Button, Input, Modal, ModalContent, ModalHeader, Loading } from 'src/sharedComponents'
import { handleCreateInvitation } from 'src/handlers/invitations'
import './SelectStudentModal.css'

interface IProps extends RouteComponentProps<{ id: string }> {
  token: string
  classId: string
}

interface IState {
  student: string
  loading: boolean
  error: string
}

class SelectStudentsModal extends React.Component<IProps, IState> {
  public state: IState = {
    student: '',
    loading: false,
    error: '',
  }

  public render() {
    const { student, error, loading } = this.state

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

    this.setState({ loading: true }, async () => {
      try {
        await handleCreateInvitation(this.props.token, this.props.classId, this.state.student)
        this.setState({ loading: false })
      } catch (error) {
        console.warn(error)
        this.setState({ error: error.toString() })
      }
    })
  }

  private handleCloseClick = () => this.props.history.replace(`/teacher/class-detail/${this.props.match.params.id}`)

  private handleChange = (e: any) => {
    const { name, value } = e.target
    const newState = {}
    newState[name] = value
    this.setState(newState)
  }
}
  

const MapStateToProps = ({ teacherHome }: any, { match }: any) => ({
  classCode: teacherHome.classes
    ? teacherHome.classes[match.params.id].code
    : undefined
})

export const ConnectedSelectStudentsModal = connect(MapStateToProps)(SelectStudentsModal)
