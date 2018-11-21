import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import { Modal, ModalHeader, ModalContent, Input, Button, ConfirmButton } from 'src/sharedComponents'
import { IClass } from 'src/utils'
import { handleCreateStudent } from 'src/handlers/students'
import { StudentCreationCard } from './StudentCreationCard'
import './StudentCreationModal.css'

interface IProps extends RouteComponentProps<{ id: string }> {
  token: string
  dispatch: any
  selectedCourse: IClass
}

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
        closeTo={`/teacher/class-detail/${this.props.match.params.id}`}
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
            {students.length > 0
              ? (
                <div className="student-card example">
                  <h4 className="username">Username</h4>
                  <h4 className="password">Password</h4>
                  <h4 className="remove">Remove</h4>
                </div>
              ) : null}
            {students.map((student) => (
              <StudentCreationCard
                key={student}
                name={student}
                username={this.getUsername(student)}
                classCode={this.props.selectedCourse.code}
                onDelete={this.handleRemoveStudent}
              />
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

    this.setState(prevState => ({
      students: prevState.students.concat([this.getDisplayName(name)]),
      name: '',
      error: '',
    }))
  }

  private handleChange = (e: any) => {
    const value = e.target.value
    this.setState({ name: value })
  }

  private handleRemoveStudent = (student: string) => {
    this.setState(prevState => ({
      students: prevState.students.filter(name => name !== student),
      error: '',
    }))
  }

  private handleCreateAccounts = async () => {
    if (this.state.students.length === 0) {
      this.setState({ error: 'At least one student is required' })
      return
    }

    const { token, match, history } = this.props
    
    await Promise.all(this.state.students.map(async (student) => {
      try {
        await this.props.dispatch(handleCreateStudent(token, match.params.id, {
          name: this.getDisplayName(student),
          user: {
            email: this.getUsername(student),
            firstName: this.getFirstName(student),
            lastName: this.getLastInitial(student),
          }
        }))
      } catch (error) {
        console.warn(error)
      }
    }))

    history.push(`/teacher/class-detail/${this.props.match.params.id}`)
  }

  private handleBack = () => {
    this.props.history.goBack()
  }

  private getDisplayName = (name: string): string => {
    const [ firstName, lastName ] = name.split(' ')
    return `${firstName} ${lastName[0].toUpperCase()}`
  }

  private getUsername = (name: string): string => {
    return name.replace(' ', '') + '@' + this.props.selectedCourse.name
  }

  private getFirstName = (name: string): string => {
    return name.split(' ')[0]
  }

  private getLastInitial = (name: string): string => {
    return name.split(' ')[1][0].toUpperCase()
  }
}

const mapStateToProps = ({ courses, user }: any, { match }: IProps) => ({
  token: user.token,
  selectedCourse: courses
    ? courses[match.params.id]
    : undefined,
})

export const ConnectedStudentCreationModal = connect(mapStateToProps)(StudentCreationModal)