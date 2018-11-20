/* tslint:disable:jsx-no-lambda */

import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import { Modal, ModalHeader, ModalContent, Input, Button, Card, ConfirmButton } from 'src/sharedComponents'
import './StudentCreationModal.css'

interface IProps extends RouteComponentProps<{}> {}

interface IState {
  error: string
  students: string[]
  name: string
}

class StudentCreationModal extends React.Component<IProps, IState> {
  public state: IState = {
    error: '',
    name: '',
    students: []
  }

  public render() {
    const { error, name, students } = this.state

    return (
      <Modal
        overlay={true}
        className="StudentCreationModal"
      >
        <ModalHeader className="header">
          <h1>Create Accounts</h1>
        </ModalHeader>

        <ModalContent className="content">
          <h3 className="sub-header">Type in your students' names.</h3>
          {error !== ''
            ? <p className="error">{error}</p>
            : null
          }
          <label className="label" htmlFor="studentInput">
            Enter a first name and last initial.
          </label>
          <Input
            className="input" 
            name="studentInput"
            placeholder="Fritz J"
            onChange={this.handleChange}
            value={name}
          />
          <Button
            className="blue add-button"
            onClick={this.handleAddStudent}
          >
            Add
          </Button>
          <div className="student-list">
            <div className="student-card example">
              <h4 className="name">Name</h4>
              <h4 className="username">Username</h4>
              <h4 className="remove">Remove</h4>
            </div>
            {students.map((student) => (
              <Card key={student} className="student-card">
                <h4 className="name">{student}</h4>
                <h4 className="username">{student.replace(' ', '')}@Homeroom</h4>
                <Button
                  className="remove remove-button"
                  onClick={() => this.handleRemoveStudent(student)}
                >
                  X
                </Button>
              </Card>
            ))}
          </div>
          <Button
            className="gray back-button"
            onClick={this.handleBack}
          >
            Back
          </Button>
          <ConfirmButton
            className="green create-button"
            confirmClassName="confirm"
            disableTimeout={2000}
            onClick={this.handleCreateAccounts}
          >
            <span className="default">Create Accounts</span>
            <span className="confirmation">Are you sure?</span>
          </ConfirmButton>
        </ModalContent>
      </Modal>
    )
  }

  private handleAddStudent = () => {
    const { name } = this.state

    this.setState({ error: '' })

    if (name === '') {
      this.setState({ error: 'First name and last initial are required' })
      return
    }

    if (name.split(' ').length < 2) {
      this.setState({ error: 'Both first name and last initial are required' })
      return
    }

    if (name.split(' ').length > 2) {
      this.setState({ error: 'Please enter first name and last initial only' })
      return
    }

    const [ firstName, lastName ] = name.split(' ')
    this.setState((prevState) => ({
      students: prevState.students.concat([`${firstName} ${lastName[0].toUpperCase()}`]),
      name: '',
    }))
  }

  private handleChange = (e: any) => {
    const value = e.target.value
    this.setState({ name: value })
  }

  private handleRemoveStudent = (student: string) => {
    this.setState((prevState) => ({
      students: prevState.students.filter((name) => name !== student),
      error: '',
    }))
  }

  private handleCreateAccounts = () => {
    if (this.state.students.length === 0) {
      this.setState({ error: 'At least one student is required' })
    }
    console.log('CREATING ACCOUNTS')
  }

  private handleBack = () => {
    this.props.history.goBack()
  }
}

const mapStateToProps = ({ user }: any) => ({ token: user.token })

export const ConnectedStudentCreationModal = connect(mapStateToProps)(StudentCreationModal)