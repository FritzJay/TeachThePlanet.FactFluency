import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import { Card, ConfirmButton } from 'src/sharedComponents'
import { ICourseInvitation } from 'src/utils'
import { handleAcceptInvitation, handleDeclineInvitation } from 'src/handlers/courseInvitations'
import './CourseInvitations.css'

interface IProps extends RouteComponentProps<{}> {
  courseInvitations?: ICourseInvitation[]
  token?: string
  dispatch: any
}

class CourseInvitations extends React.Component<IProps> {
  public render() {
    const { courseInvitations } = this.props

    return (
      <div className="CourseInvitations">
        <h2 className="header">Select an invitation to join the classroom!</h2>
        {courseInvitations && Object.keys(courseInvitations).length > 0
          ? (
          <div className="courseInvitations-container">
            {Object.keys(courseInvitations).map((id) => (
              <Card
                key={id}
                className="invitation-card"
              >
                <h3 className="card-header">{courseInvitations[id].course.name}</h3>
                <h4 className="teacher">{courseInvitations[id].course.teacher.name}</h4>
                <ConfirmButton
                  value={courseInvitations[id].id}
                  onClick={this.handleDecline}
                  className="yellow decline"
                  confirmClassName="confirm-button"
                >
                  <span className="default">Decline</span>
                  <span className="confirmation">Are you sure?</span>
                </ConfirmButton>
                <ConfirmButton
                  value={courseInvitations[id].id}
                  onClick={this.handleAccept}
                  className="green accept"
                  confirmClassName="confirm-button"
                >
                  <span className="default">Accept</span>
                  <span className="confirmation">Are you sure?</span>
                </ConfirmButton>
              </Card>
            ))}
          </div>
          ) : <p>You don't have any courseInvitations. Ask your teacher to create an invitation for "student2@email.com"!</p>
        }
      </div>
    )
  }

  private handleDecline = (e: any) => {
    e.persist()
    const id = e.target.value
    const token = this.props.token
    if (token === undefined) {
      return
    }
    try {
      this.props.dispatch(handleDeclineInvitation(token, id))
    } catch (error) {
      console.warn(error)
      alert(error.message)
    }
  }

  private handleAccept = async (e: any) => {
    e.persist()
    const id = e.target.value
    const token = this.props.token
    if (token === undefined) {
      return
    }
    try {
      await this.props.dispatch(handleAcceptInvitation(token, id))
    } catch (error) {
      console.warn(error)
      alert(error.message)
    }
  }
}

const mapStateToProps = ({ courseInvitations, user }: any) => ({
  courseInvitations,
  token: user.token,
})

export const ConnectedCourseInvitations = connect(mapStateToProps)(CourseInvitations)