/* tslint:disable:jsx-no-lambda */

import * as React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'

import { PendingInvitationsDescription, StudentsDescription } from './descriptions'
import { Card, Loading, NewCard, ConfirmButton, Button, ConnectedStudentCard } from 'src/sharedComponents'
import { handleRemoveInvitation } from 'src/handlers/courseInvitations'
import { handleRemovePendingStudent } from 'src/handlers/students'
import { ParentInvite } from '../ParentInvite/ParentInvite'
import { IClass, IStudentUser } from 'src/utils'
import './ClassDetail.css'

import PendingStudent from 'src/images/pending-student-icon.svg'
import ExistingStudent from 'src/images/existing-student-icon.svg'

export const INVITATION_TYPES = {
  pendingStudent: {
    alt: 'Pending student',
    color: 'yellow',
    icon: PendingStudent,
    title: 'You have created an account for this student and they still need to sign in for the first time using the username displayed on the card. They must use the password that you designated. If you did not designate a password for the student, they must use this class code.',
  },
  existingStudent: {
    alt: 'Existing student',
    color: 'green',
    icon: ExistingStudent,
    title: 'This pre-existing student has been invited to join the class and can accept the invitation at any time.',
  },
}

interface IInvitationType {
  alt: string
  icon: string
  title: string
  color: string
}

interface IPendingCardProps {
  className?: string
  date: Date
  student: IStudentUser
  invitationType: IInvitationType
  onDelete: () => void
}

const PendingCard = ({ className, date, student, onDelete, invitationType }: IPendingCardProps) => {
  return (
    <Card className={`InactiveStudentCard${className ? ' ' + className : ''}`}>
      <h3 className="student-name">
        {student.name.length > 15
          ? student.name.slice(0, 15) + '...'
          : student.name}
      </h3>

      <span className="email">{student.user.email}</span>

      <h4 className="date">{date.getMonth()}/{date.getDate()}/{date.getFullYear()}</h4>

      <img
        className={`icon ${invitationType.color}`}
        src={invitationType.icon}
        alt={invitationType.alt}
        title={invitationType.title}
      />

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
  pendingInvitationsDescription: boolean
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
    pendingInvitationsDescription: false,
  }

  public render() {
    const { match, selectedCourse } = this.props
    const { studentsDescription, pendingInvitationsDescription } = this.state

    if (selectedCourse === undefined) {
      return (
        <div className="ClassDetail">
          <Loading className="loading" />
        </div>
      )
    }

    return (
      <>
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
            <Button onClick={this.handleParentInvitesClick} className="detail-btn">
              Parent Invites
            </Button>
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
          
          <div className="pending-invitations">
            <div className="section-header">
              <h2>Pending Invitations</h2>
              <Button
                name="pendingInvitationsDescription"
                className="blue description-button"
                onClick={this.toggleDescription}
              >
                {!pendingInvitationsDescription
                  ? 'More info'
                  : 'Close'
                }
              </Button>
            </div>

            {pendingInvitationsDescription
              ? <PendingInvitationsDescription />
              : null
            }

            {selectedCourse.students
              ? (
                  <>

                    {Object.keys(selectedCourse.students).length > 0
                      ? Object.keys(selectedCourse.students)
                          .filter((id) => selectedCourse.students[id].changePasswordRequired === true)
                          .map((id: string) => (
                            <PendingCard
                              key={id}
                              className="pending-card"
                              date={new Date(selectedCourse.students[id].createdAt)}
                              student={selectedCourse.students[id]}
                              invitationType={INVITATION_TYPES.pendingStudent}
                              onDelete={() => this.handleStudentDelete(id)}
                            />
                      )) : null}

                    {selectedCourse.courseInvitations && Object.keys(selectedCourse.courseInvitations).length > 0
                      ? Object.keys(selectedCourse.courseInvitations).map((id: string) => (
                          <PendingCard
                            className="pending-card"
                            date={new Date(selectedCourse.courseInvitations[id].createdAt)}
                            key={id}
                            student={selectedCourse.courseInvitations[id].student}
                            invitationType={INVITATION_TYPES.existingStudent}
                            onDelete={() => this.handleInvitationDelete(id)}
                          />
                      )) : null
                    }
                  </>
                )
              : null
            }

            <Link to={`${match.url}/add-students`}>
              <NewCard className="new-invite-card" text="Invite a student!" />
            </Link>
          </div>
        </div>
        <ParentInvite email={'Temp'} password={'Temp'} />
      </>
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
      dispatch(handleRemovePendingStudent(token, selectedCourse.id, id))
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

  private handleParentInvitesClick = () => {
    window.print()
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