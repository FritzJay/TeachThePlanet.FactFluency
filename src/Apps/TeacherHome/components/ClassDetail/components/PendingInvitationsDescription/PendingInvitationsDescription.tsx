import * as React from 'react'

import { Card } from 'src/sharedComponents'
import { INVITATION_TYPES } from '../PendingInvitations/PendingInvitations'
import './PendingInvitationsDescription.css'

export const PendingInvitationsDescription = () => (
  <Card className="PendingInvitationsDescription">
    <p className="description">
      Listed below are the students currently invited to join this class.
    </p>
    <p>The pending invitation cards consist of five sections:</p>
    <ol>
      <li>Student Name</li>
      <li>Username - The username the student uses to sign in</li>
      <li>Send Date - The date the invitation was sent</li>
      <li className="invitation-type">
        Invitation Type - There are two types of invitations indicated by the following icons:
        <ul className="description-list">
          {Object.keys(INVITATION_TYPES).map((t) => (
            <li key={t} className="invitation-type-item">
              <img
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
      <li>Delete - A button to permanently remove the invitation</li>
    </ol>
    <Card className="PendingCard">
      <h3 className="student-name">Student Name</h3>
      <span className="email">Username</span>
      <h4 className="date">Send Date</h4>
      <span className="delete">
        Delete
        <i className="material-icons">delete</i>
      </span>
      <h4>Invitation Type</h4>
    </Card>
  </Card>
)