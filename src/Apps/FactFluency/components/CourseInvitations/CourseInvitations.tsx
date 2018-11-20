import * as React from 'react'
import { connect } from 'react-redux'

import { Card, Button } from 'src/sharedComponents'
import { ICourseInvitation } from 'src/utils'
import './CourseInvitations.css'

interface IProps {
  invitations?: ICourseInvitation[]
}

const CourseInvitations = ({ invitations }: IProps) => (
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
                <Button className="red decline">Decline</Button>
                <Button className="green accept">Accept</Button>
              </Card>
            ))}
          </div>
        )
      : <p>You don't have any invitations. Check back later!</p>
    }
  </div>
)

const mapStateToProps = ({ factFluency }: any) => ({
  invitations: factFluency.courseInvitations
})

export const ConnectedCourseInvitations = connect(mapStateToProps)(CourseInvitations)