/* tslint:disable:jsx-no-lambda */

import * as React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'

import { StudentsDescription, PendingStudentsDescription, InvitationsDescription } from './descriptions'
import { Card, Loading, NewCard, ConfirmButton, Button, ConnectedStudentCard } from 'src/sharedComponents'
import { handleRemoveInvitation } from 'src/handlers/courseInvitations'
import { handleRemoveStudent } from 'src/handlers/students'
import { IClass, IStudentUser } from 'src/utils'
import './ClassDetail.css'

interface IPendingCardProps {
  className?: string
  date: Date
  student: IStudentUser
  onDelete: () => void
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
        onClick={onDelete}
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
  selectedCourse: IClass
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
    const { match, selectedCourse } = this.props
    const { studentsDescription, invitationsDescription, pendingStudentsDescription } = this.state

    if (selectedCourse === undefined) {
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
          {selectedCourse.name}
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

          {selectedCourse.students
            && Object.keys(selectedCourse.students).length > 0
            && Object.keys(selectedCourse.students).filter((id) => !selectedCourse.students[id].changePasswordRequired).length > 0
              ? Object.keys(selectedCourse.students)
                  .filter((id) => !selectedCourse.students[id].changePasswordRequired)
                  .map((id) => (
                    <ConnectedStudentCard
                      key={id}
                      courseId={selectedCourse.id}
                      student={selectedCourse.students[id]}
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
          {selectedCourse.students
            && Object.keys(selectedCourse.students).length > 0
            && Object.keys(selectedCourse.students).filter((id) => selectedCourse.students[id].changePasswordRequired === true).length > 0
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

                    {Object.keys(selectedCourse.students)
                      .filter((id) => selectedCourse.students[id].changePasswordRequired === true)
                      .map((id: string) => (
                        <PendingCard
                          key={id}
                          className="pending-card"
                          date={new Date(selectedCourse.students[id].createdAt)}
                          student={selectedCourse.students[id]}
                          onDelete={() => this.handleStudentDelete(id)}
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

          {selectedCourse.students
            ? Object.keys(selectedCourse.courseInvitations).map((id: string) => (
              <PendingCard
                className="pending-card"
                date={new Date(selectedCourse.courseInvitations[id].createdAt)}
                key={id}
                student={selectedCourse.courseInvitations[id].student}
                onDelete={() => this.handleInvitationDelete(id)}
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
    const { dispatch, token, selectedCourse } = this.props
    try {
      dispatch(handleRemoveInvitation(token, selectedCourse.id, id))
    } catch (error) {
      alert(error)
    }
  }

  private handleStudentDelete = (id: string) => {
    const { dispatch, token, selectedCourse } = this.props
    try {
      dispatch(handleRemoveStudent(token, selectedCourse.id, id))
    } catch (error) {
      alert(error)
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

const mapStateToProps = ({ courses, user }: any, { match }: any) => ({
  selectedCourse: courses
    ? courses[match.params.id]
    : undefined,
  token: user
    ? user.token
    : undefined,
})

export const ClassDetail = connect(mapStateToProps)(DisconnectedClassDetail)