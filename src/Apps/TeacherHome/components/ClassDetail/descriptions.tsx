import * as React from 'react'

import { Card } from 'src/sharedComponents'
import { INVITATION_TYPES } from './ClassDetail'

export const StudentsDescription = () => (
  <Card className="description-card">
    <p className="description">
      Below is a list of students' progression in Fact Fluency. Each student's progress is displayed in a grid. The color of the numbers indicates the student's progress with each multiple.
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

export const PendingInvitationsDescription = () => (
  <Card className="description-card">
    <p className="description">
      Listed below are the students currently invited to join this class.
    </p>
    <p>The pending invitation cards consist of five sections:</p>
    <ol>
      <li>Student Name - The student's name</li>
      <li>Username - The username the student uses to sign in</li>
      <li>Send Date - The date the invitation was sent</li>
      <li className="invitation-type">
        Invitation Type - There are multiple types of invitations indicated by the following icons:
        <ul className="description-list">
          {Object.keys(INVITATION_TYPES).map((t) => (
            <li className="invitation-type-item">
              <img
                key={t}
                className={`icon ${INVITATION_TYPES[t].color}`}
                src={INVITATION_TYPES[t].icon}
                alt={INVITATION_TYPES[t].alt}
                title={INVITATION_TYPES[t].title}
              />
              <span className="text"> - {INVITATION_TYPES[t].title}</span>
            </li>
          ))}
        </ul>
      </li>
      <li>Delete - A button used to delete the invitation</li>
    </ol>
    <Card className="pending-card">
      <h3 className="student-name">Student Name</h3>
      <span className="email">Username</span>
      <h4 className="date">Send Date</h4>
      <span className="delete">Delete</span>
      <h4>Invitation Type</h4>
    </Card>
  </Card>
)