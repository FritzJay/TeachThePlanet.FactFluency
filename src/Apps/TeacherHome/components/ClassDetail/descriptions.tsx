import * as React from 'react'
import { Card } from 'src/sharedComponents'

export const StudentsDescription = () => (
  <Card className="description-card">
    <p className="description">
      Below is a list of students who are in this class. Each student's progress is displayed in a grid. The color of the numbers indicates the student's progress with each multiple.
    </p>
    <ul className="description-list">
      <li>
        <button className="number not-taken">0</button>
        Gray - The student has not taken the test.</li>
      <li>
        <button className="number in-progress">0</button>
        Red - The student has taken the test, but has yet to pass.</li>
      <li>
        <button className="number passed-once">0</button>
        Yellow - The student has passed the test at least once.</li>
      <li>
        <button className="number passed">0</button>
        Green - The student has passed the test three or more times.</li>
    </ul>
  </Card>
)

export const PendingStudentsDescription = () => (
  <Card className="description-card">
    <p className="description">
      Listed below are the students who's accounts you've created for them. These students still need to sign in, using the username displayed on the card, and update their passwords.
    </p>
    <p>The pending students card is broken into 4 sections:</p>
    <ol>
      <li>Student Name - The student's name</li>
      <li>Username - The username the student may use to sign in</li>
      <li>Invite Date - The date the invitation was sent</li>
      <li>Delete - A button used to delete the invitation</li>
    </ol>
    <Card className="pending-card">
      <h3 className="student-name">Student Name</h3>
      <span className="email">Username</span>
      <h4 className="date">Invite Date</h4>
      <span className="delete">Delete</span>
    </Card>
  </Card>
)

export const InvitationsDescription = () => (
  <Card className="description-card">
    <p className="description">
      The pending invitations section lists existing students who you've invited to join this class. These students still need to sign in and accept the invitation.
    </p>
    <p>The pending invitations card is broken into 4 sections:</p>
    <ol>
      <li>Student Name: The students name</li>
      <li>Username: The username the student may use to sign in</li>
      <li>Send Date: The date the invitation was sent</li>
      <li>Delete: A button used to delete the invitation</li>
    </ol>
    <Card className="pending-card">
      <h3 className="student-name">Student Name</h3>
      <span className="email">Username</span>
      <h4 className="date">Send Date</h4>
      <span className="delete">Delete</span>
    </Card>
  </Card>
)