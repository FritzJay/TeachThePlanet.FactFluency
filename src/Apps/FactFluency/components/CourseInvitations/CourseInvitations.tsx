/* tslint:disable:jsx-no-lambda */

import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import { Card, Button } from 'src/sharedComponents'
import { ICourseInvitation } from 'src/utils'
import { handleAcceptInvitation, handleDeclineInvitation } from 'src/handlers/invitations'
import './CourseInvitations.css'

interface IProps extends RouteComponentProps<{}> {
  invitations?: ICourseInvitation[]
  token?: string
  dispatch: any
}

class CourseInvitations extends React.Component<IProps> {
  public render() {
    const { invitations } = this.props

    return (
      <div className="CourseInvitations">
        <h2 className="header">Select an invitation to join the classroom!</h2>
        {invitations && Object.keys(invitations).length > 0
          ? (
          <div className="invitations-container">
            {Object.keys(invitations).map((id) => (
              <Card
                key={id}
                className="invitation-card"
              >
                <h3 className="card-header">{invitations[id].course.name}</h3>
                <h4 className="teacher">{invitations[id].course.teacher.name}</h4>
                <Button
                  value={invitations[id]}
                  onClick={() => this.handleDecline(invitations[id])}
                  className="yellow decline"
                >
                  Decline
                </Button>
                <Button
                  value={invitations[id]}
                  onClick={() => this.handleAccept(invitations[id])}
                  className="green accept"
                >
                  Accept
                </Button>
              </Card>
            ))}
          </div>
          ) : <p>You don't have any invitations. Check back later!</p>
        }
      </div>
    )
  }

  private handleDecline = (invitation: ICourseInvitation) => {
    const token = this.props.token
    if (token === undefined) {
      return
    }
    try {
      this.props.dispatch(handleDeclineInvitation(token, invitation.id))
    } catch (error) {
      console.warn(error)
      alert(error.message)
    }
  }

  private handleAccept = async (invitation: ICourseInvitation) => {
    const token = this.props.token
    if (token === undefined) {
      return
    }
    try {
      await this.props.dispatch(handleAcceptInvitation(token, invitation.course.id, invitation.id))
    } catch (error) {
      console.warn(error)
      alert(error.message)
    }
  }
}

const mapStateToProps = ({ factFluency, user }: any) => ({
  invitations: factFluency.courseInvitations,
  token: user.token,
})

export const ConnectedCourseInvitations = connect(mapStateToProps)(CourseInvitations)