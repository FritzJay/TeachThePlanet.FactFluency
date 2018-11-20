import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import { Button, Card, Modal, ModalContent, ModalHeader } from 'src/sharedComponents'
import './AddStudentModal.css'

/*
const CreateAccountModal = () => (
  <Modal className="add-student-modal">
    <ModalHeader className="add-students">
        <h1>Add Students</h1>
      </ModalHeader>
      <ModalContent>
        <div className="sub-header">
          <h3>Type in your students' names.</h3>
        </div>
        <div className="account-create-type">
          <Input className="input-student" value="Fritz J" />
          <button className="add-student-btn">Add</button>
            <label>Enter a first name and last initial.</label>
        </div>
        <div className="btn-row">
          <Button className="back">Back</Button>
          <Button className="create-accounts">Create Accounts</Button>
        </div>
      </ModalContent>
  </Modal>
)

const CreateAccountQuestionModal = () => (
  <Modal
    overlay={true}
    className="student-creation-question"
  >
    <ModalHeader className="add-students">
        <h1>Add Students</h1>
      </ModalHeader>
      <ModalContent>
        <div className="sub-header">
          <h3>Who will create the new account?</h3>
        </div>
        <div className="account-create-type">
          <div className="student-created">
            <h4>My students will create their own accounts.</h4>
            <p>(Better suited for older students.)</p>
          </div>
          <div className="teacher-created">
            <h4>I'll create accounts for my students.</h4>
            <p>(Better suited for younger students.)</p>
          </div>
        </div>
        <div className="btn-row">
          <Button className="back">Back</Button>
          <Button className="cancel">Cancel</Button>
          <Button className="continue">Continue</Button>
        </div>
      </ModalContent>
  </Modal>
)
*/

interface IProps extends RouteComponentProps<{ id: string }> {}

interface IState {
  haveAccounts?: boolean
}

export class AddStudentModal extends React.Component<IProps, IState> {
  public state: IState = {}

  public render() {
    const { haveAccounts } = this.state

    return (
      <Modal
        overlay={true}
        closeTo={`/teacher/class-detail/${this.props.match.params.id}`}
        className="AddStudentModal"
      >
        <ModalHeader className="header">
          <h1>Add Students</h1>
        </ModalHeader>
    
        <ModalContent>
          <h3>Do your students have accounts?</h3>
    
          <Card
            className={`account-card${haveAccounts === true ? ' selected' : ''}`}
            onClick={this.handleSelectYes}
          >
            <h4>Yes, they already have accounts.</h4>
            <p>If your students already practice with Fact Fluency, they can log in and connect to your classroom.</p>
          </Card>
    
          <Card
            className={`account-card${haveAccounts === false ? ' selected' : '' }`}
            onClick={this.handleSelectNo}
          >
            <h4>No, they need new accounts.</h4>
            <p>If your students don't have accounts, they can make new ones or your can do it for them.</p>
          </Card>
    
          <div className="btn-row">
            <Button onClick={this.handleCancelClick} className="red cancel-button">Cancel</Button>
            <Button onClick={this.handleContinueClick} className="continue">Continue</Button>
          </div>
        </ModalContent>
      </Modal>
    )
  }

  private handleSelectYes = () => {
    this.setState({ haveAccounts: true })
  }

  private handleSelectNo = () => {
    this.setState({ haveAccounts: false })
  }

  private handleCancelClick = () => {
    this.props.history.goBack()
  }

  private handleContinueClick = () => {
    const { haveAccounts } = this.state
    const { history, match } = this.props

    switch (haveAccounts) {
      case undefined:
        alert('Please select an option')
        return
      case true:
        history.push(match.url + '/existing')
        return
      case false:
        history.push(match.url + '/new')
        return
    }
  }
}