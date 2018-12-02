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
      <li>Student Name</li>
      <li>Username/Email - Student's username or email.</li>
      <li>Send Date - Date the request was sent</li>
      <li>Delete - A button to permanently remove the request</li>
      <li>Accept - A button used to accept the request and add the student to this class</li>
    </ol>
  </Card>
)