import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import { Button, Card, Modal, ModalContent, ModalHeader } from 'src/sharedComponents'
import './AddStudentModal.css'

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
          <h2>Do your students have accounts?</h2>
    
          <Card
            className={`account-card${haveAccounts === true ? ' selected' : ''}`}
            onClick={this.handleSelectYes}
          >
            <h3>Yes, they already have accounts.</h3>
            <p>If your students already practice with Fact Fluency, they can log in and connect to your classroom.</p>
          </Card>
    
          <Card
            className={`account-card${haveAccounts === false ? ' selected' : '' }`}
            onClick={this.handleSelectNo}
          >
            <h3>No, they need new accounts.</h3>
            <p>If your students don't have accounts, they can make new ones or your can do it for them.</p>
          </Card>
    
          <Button onClick={this.handleContinueClick} className="green continue-button">Continue</Button>
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