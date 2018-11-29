import * as React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'

import { GET_COURSE } from '../../ClassDetail'
import { Button, NewCard } from 'src/sharedComponents'
import { PendingInvitationsDescription } from '../PendingInvitationsDescription/PendingInvitationsDescription'
import { PendingCard } from '../PendingCard/PendingCard'
import { ICourseInvitation, IStudentUser } from 'src/utils'

import PendingStudent from 'src/images/pending-student-icon.svg'
import ExistingStudent from 'src/images/existing-student-icon.svg'
import './PendingInvitations.css'

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

const REMOVE_COURSE_INVITATION = gql`
  mutation removeCourseInvitation($id: ObjID!) {
    removeCourseInvitation(id: $id)
  }
`

const REMOVE_PENDING_STUDENT = gql`
  mutation removePendingStudent($studentId: ObjID!, $courseId: ObjID!) {
    removePendingStudent(studentId: $studentId, courseId: $courseId)
  }
`

interface IProps {
  pendingStudents: IStudentUser[]
  courseInvitations: ICourseInvitation[]
  match: any
}

interface IState {
  activeDescription: boolean
}

export class PendingInvitations extends React.Component<IProps, IState> {
  public state = {
    activeDescription: false
  }

  public render() {
    const { activeDescription } = this.state
    const { pendingStudents, courseInvitations, match } = this.props

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

        {pendingStudents.map((student) => (
          <Mutation
            key={student.id}
            mutation={REMOVE_PENDING_STUDENT}
            variables={{
              studentId: student.id,
              courseId: match.params.id,
            }}
            optimisticResponse={{
              __typename: 'Mutation',
              removePendingStudent: true
            }}
            update={cache => {
              const { course }: any = cache.readQuery({
                query: GET_COURSE,
                variables: { id: match.params.id },
              })
              cache.writeQuery({
                query: GET_COURSE,
                data: {
                  course: {
                    ...course,
                    students: course
                      ? course.students.filter((s: IStudentUser) => s.id !== student.id)
                      : []
                  }
                }
              })
            }}
          >
            {removePendingStudent => (
              <PendingCard
                date={new Date(student.createdAt)}
                student={student}
                invitationType={INVITATION_TYPES.pendingStudent}
                onDelete={removePendingStudent}
              />
            )}
          </Mutation>
        ))}

        {courseInvitations.map(({ id, createdAt, student }) => (
          <Mutation
            key={id}
            mutation={REMOVE_COURSE_INVITATION}
            optimisticResponse={{
              __typename: 'Mutation',
              removeCourseInvitation: true
            }}
            update={cache => {
              const { course }: any = cache.readQuery({
                query: GET_COURSE,
                variables: { id: match.params.id },
              })
              cache.writeQuery({
                query: GET_COURSE,
                data: {
                  course: {
                    ...course,
                    courseInvitations: course
                      ? course.courseInvitations.filter((inv: ICourseInvitation) => inv.id !== id)
                      : []
                  }
                }
              })
            }}
          >
            {removeCourseInvitation => (
              <PendingCard
                date={new Date(createdAt)}
                student={student}
                invitationType={INVITATION_TYPES.existingStudent}
                onDelete={() => removeCourseInvitation({ variables: { id } })}
              />
            )}
          </Mutation>
        ))}

        <Link to={`${match.url}/add-students`}>
          <NewCard className="new-invite-card" text="Invite a student!" />
        </Link>
      </div>
    )
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
