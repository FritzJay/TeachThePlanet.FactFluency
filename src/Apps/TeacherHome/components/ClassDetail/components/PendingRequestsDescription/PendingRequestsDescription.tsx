import * as React from 'react'

import { Card } from 'src/sharedComponents'
import './PendingRequestsDescription.css'

export const PendingRequestsDescription = () => (
  <Card className="PendingRequestsDescription">
    <p className="description">
      Listed below are students who have requested to join this class.
    </p>
    <p>The pending request cards consist of five sections:</p>
    <ol>
      <li>Student Name - The student's name</li>
      <li>Username/Email - The username or email of the student</li>
      <li>Send Date - The date the request was sent</li>
      <li>Delete - A button used to delete/decline the request</li>
      <li>Accept - A button used to accept the request and add the student to this class</li>
    </ol>
    <Card className="CourseRequestCard">
      <h3 className="student-name">Student Name</h3>
      <span className="email">Username</span>
      <span className="date">Send Date</span>
      <span className="delete">Delete</span>
      <span className="accept">Accept</span>
    </Card>
  </Card>
)