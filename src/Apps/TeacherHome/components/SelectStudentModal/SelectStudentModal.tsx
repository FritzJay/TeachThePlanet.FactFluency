import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

import { Button, Input, Modal, ModalContent, ModalHeader } from 'src/sharedComponents'
import './SelectStudentModal.css'

interface IProps extends RouteComponentProps<{ id: string }> {
  classCode: string
}

interface IState {
  student: string
}

class SelectStudentsModal extends React.Component<IProps, IState> {
  public state: IState = {
    student: ''
  }

  public render() {
    const { student } = this.state

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

    console.log('Create an invitation!')
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
