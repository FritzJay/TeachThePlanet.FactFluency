/* tslint:disable:jsx-no-lambda */

import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { INVITATION_TYPES } from '../../ClassDetail'
import { handleRemoveInvitation } from 'src/handlers/courseInvitations'
import { handleRemovePendingStudent } from 'src/handlers/students' 
import { Button, NewCard } from 'src/sharedComponents'
import { PendingInvitationsDescription } from '../PendingInvitationsDescription/PendingInvitationsDescription'
import { PendingCard } from '../PendingCard/PendingCard'
import { ICourseInvitation, IStudentUser, IClass } from 'src/utils'
import './PendingInvitations.css'

interface IState {
  activeDescription: boolean
}

interface IProps {
  selectedCourse: IClass
  students: IStudentUser[]
  match: any
  courseInvitations: ICourseInvitation[]
  courseId?: string
  dispatch: any
  token?: string
}

class PendingInvitations extends React.Component<IProps, IState> {
  public state = {
    activeDescription: false
  }

  public render() {
    const { students, courseInvitations, match } = this.props
    const { activeDescription } = this.state

    return (
      <div className="PendingInvitations">
        <div className="section-header">
          <h2>Pending Invitations</h2>
          <Button
            name="activeDescription"
            className="blue description-button"
            onClick={this.toggleDescription}
          >
            {!activeDescription
              ? 'More info'
              : 'Close'
            }
          </Button>
        </div>

        {activeDescription
          ? <PendingInvitationsDescription />
          : null
        }

        {students.map((student) => (
          <PendingCard
            key={student.id}
            date={new Date(student.createdAt)}
            student={student}
            invitationType={INVITATION_TYPES.pendingStudent}
            onDelete={() => this.handleStudentDelete(student.id)}
          />
        ))}

        {courseInvitations.map(({ id, createdAt, student }) => (
            <PendingCard
              date={new Date(createdAt)}
              key={id}
              student={student}
              invitationType={INVITATION_TYPES.existingStudent}
              onDelete={() => this.handleInvitationDelete(id)}
            />
        ))}

        <Link to={`${match.url}/add-students`}>
          <NewCard className="new-invite-card" text="Invite a student!" />
        </Link>
      </div>
    )
  }

  private handleInvitationDelete = (id: string) => {
    const { dispatch, token, courseId } = this.props

    if (token === undefined || token === null || courseId === undefined || courseId === null) {
      return
    }

    try {
      dispatch(handleRemoveInvitation(token, courseId, id))
    } catch (error) {
      alert(error)
    }
  }

  private handleStudentDelete = (id: string) => {
    const { dispatch, token, courseId } = this.props

    if (token === undefined || token === null || courseId === undefined || courseId === null) {
      return
    }

    try {
      dispatch(handleRemovePendingStudent(token, courseId, id))
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

const mapStateToProps = ({ user }: any, { selectedCourse }: any) => {
  const students = selectedCourse
    ? selectedCourse.students
    : {}

  return {
    students: Object.keys(students)
                .map((id) => students[id])
                .filter(({ changePasswordRequired }) => changePasswordRequired === true),
    courseInvitations: selectedCourse
      ? Object.keys(selectedCourse.courseInvitations)
        .map((id) => selectedCourse.courseInvitations[id])
      : [],
    courseId: selectedCourse
      ? selectedCourse.id
      : undefined,
    token: user
      ? user.token
      : undefined,
  }
}

export const ConnectedPendingInvitations = connect(mapStateToProps)(PendingInvitations)