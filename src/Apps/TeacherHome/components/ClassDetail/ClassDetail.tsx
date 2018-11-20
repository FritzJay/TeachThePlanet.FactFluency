/* tslint:disable:jsx-no-lambda */

import * as React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'

import { IClass, IStudentUser } from 'src/utils'
import { Card, Loading, NewCard, ConfirmButton, Button, ConnectedStudentCard } from 'src/sharedComponents'
import { handleRemoveInvitation } from 'src/handlers/invitations'
import { StudentsDescription, PendingStudentsDescription, InvitationsDescription } from './descriptions'
import './ClassDetail.css'

interface IPendingCardProps {
  className?: string
  date: Date
  student: IStudentUser
  onDelete: (id: string) => void
}

const PendingCard = ({ className, date, student, onDelete }: IPendingCardProps) => {
  return (
    <Card className={`InactiveStudentCard${className ? ' ' + className : ''}`}>
      <h3 className="student-name">
        {student.name.length > 15
          ? student.name.slice(0, 15) + '...'
          : student.name}
      </h3>
      <span className="email">{student.user.email}</span>
      <h4 className="date">{date.getMonth()}/{date.getDate()}/{date.getFullYear()}</h4>
      <ConfirmButton
        className="delete"
        confirmClassName="confirm"
        onClick={() => onDelete(student.id)}
      >
        <span className="confirmation">Delete?</span>
        <i className="material-icons">delete</i>
      </ConfirmButton>
    </Card>
  )
}


interface IState {
  error: string
  studentsDescription: boolean
  invitationsDescription: boolean
  pendingStudentsDescription: boolean
}

interface IProps extends RouteComponentProps<{ id: string }> {
  selectedClass: IClass
  dispatch: any
  token: string
}

class DisconnectedClassDetail extends React.Component<IProps, IState> {
  public state: IState = {
    error: '',
    studentsDescription: false,
    invitationsDescription: false,
    pendingStudentsDescription: false,
  }

  public render() {
    const { match, selectedClass } = this.props
    const { studentsDescription, invitationsDescription, pendingStudentsDescription } = this.state

    if (selectedClass === undefined) {
      return (
        <div className="ClassDetail">
          <Loading className="loading" />
        </div>
      )
    }

    return (
      <div className="ClassDetail">
        <h2 className="classes">
          <Link className="classrooms" to="/teacher/classes">
            <i className="material-icons big">arrow_back_ios</i>Classes
          </Link>
        </h2>
        
        <h1 className="class-name">
          {selectedClass.name}
        </h1>

        <div className="buttons">
          <Link
            className="detail-btn"
            to={`/teacher/parent-invitation/${match.params.id}`}
          >
            Parent Invites
          </Link>
          <Link
            className="detail-btn"
            to={`${match.url}/add-students`}
          >
            Add Student
          </Link>
          <Link
            className="detail-btn"
            to={`${match.url}/remove-students`}
          >
            Remove Student
          </Link>
          <Link
            className="detail-btn"
            to={`${match.url}/test-parameters`}
          >
            Test Settings
          </Link>
          <Link
            className="detail-btn"
            to={`${match.url}/class-settings`}
          >
            Class Settings
          </Link>
        </div>

        <div className="students">
          <div className="section-header">
            <h2>Students</h2>
            <Button
              name="studentsDescription"
              className="blue description-button"
              onClick={this.toggleDescription}
            >
              {!studentsDescription
                ? 'More info'
                : 'Close'
              }
            </Button>
          </div>

          {studentsDescription
            ? <StudentsDescription />
            : null
          }

          {selectedClass.students
            && Object.keys(selectedClass.students).length > 0
            && Object.keys(selectedClass.students).filter((id) => !selectedClass.students[id].changePasswordRequired).length > 0
              ? Object.keys(selectedClass.students)
                  .filter((id) => !selectedClass.students[id].changePasswordRequired)
                  .map((id) => (
                    <ConnectedStudentCard
                      key={id}
                      courseId={selectedClass.id}
                      student={selectedClass.students[id]}
                    />
                ))
              : (
                <Link to={`${match.url}/add-students`}>
                  <NewCard className="new-student-card" text="Add your first student!" />
                </Link>
              )
          }
        </div>
        
        <div className="pending-students">
          {selectedClass.students
            && Object.keys(selectedClass.students).length > 0
            && Object.keys(selectedClass.students).filter((id) => selectedClass.students[id].changePasswordRequired === true).length > 0
              ? (
                  <>
                    <div className="section-header">
                      <h2>Pending Students</h2>
                      <Button
                        name="pendingStudentsDescription"
                        className="blue description-button"
                        onClick={this.toggleDescription}
                      >
                        {!pendingStudentsDescription
                          ? 'More info'
                          : 'Close'
                        }
                      </Button>
                    </div>

                    {pendingStudentsDescription
                      ? <PendingStudentsDescription />
                      : null
                    }

                    {Object.keys(selectedClass.students)
                    .filter((id) => selectedClass.students[id].changePasswordRequired === true)
                    .map((id: string) => (
                      <PendingCard
                        className="pending-card"
                        date={new Date(selectedClass.students[id].createdAt)}
                        key={id}
                        student={selectedClass.students[id]}
                        onDelete={this.handleInvitationDelete}
                      />
                    ))}
                  </>
                )
              : null
          }
        </div>

        <div className="invitations">
          <div className="section-header">
            <h2>Pending Invitations</h2>
            <Button
              name="invitationsDescription"
              className="blue description-button"
              onClick={this.toggleDescription}
            >
              {!invitationsDescription
                ? 'More info'
                : 'Close'
              }
            </Button>
          </div>

          {invitationsDescription
            ? <InvitationsDescription />
            : null
          }

          {selectedClass.students
            ? Object.keys(selectedClass.courseInvitations).map((id: string) => (
              <PendingCard
                className="pending-card"
                date={new Date(selectedClass.courseInvitations[id].createdAt)}
                key={id}
                student={selectedClass.courseInvitations[id].student}
                onDelete={this.handleInvitationDelete}
              />
            )) : null
          }

          <Link to={`${match.url}/add-students/existing`}>
            <NewCard className="new-invite-card" text="Invite a student!" />
          </Link>
        </div>
      </div>
    )
  }

  private handleInvitationDelete = (id: string) => {
    const { dispatch, token, selectedClass } = this.props
    try {
      dispatch(handleRemoveInvitation(token, selectedClass.id, id))
    } catch (error) {
      alert(error.message())
    }
  }

  private toggleDescription = (e: any) => {
    const { name } = e.target
    this.setState((prevState) => {
      const state = {}
      state[name] = !prevState[name]
      return state
    })
  }
}

const mapStateToProps = ({ teacherHome, user }: any, { match }: any) => ({
  selectedClass: teacherHome.classes
    ? teacherHome.classes[match.params.id]
    : undefined,
  token: user.token,
})

export const ClassDetail = connect(mapStateToProps)(DisconnectedClassDetail)