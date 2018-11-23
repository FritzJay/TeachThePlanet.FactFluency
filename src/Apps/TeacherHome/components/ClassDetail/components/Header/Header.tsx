import * as React from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'src/sharedComponents'
import './Header.css'

export const Header = ({ match, onParentInvitesClick }: any) => (
  <div className="Header">
    <Button onClick={onParentInvitesClick} className="detail-btn">
      Parent Invites
    </Button>
    <Link
      className="detail-btn"
      to={`${match.url}/add-students`}
    >
      Add Student
    </Link>
    <Link
      className="detail-btn"
      to={`${match.url}/remove-students`}
    >
      Remove Student
    </Link>
    <Link
      className="detail-btn"
      to={`${match.url}/test-parameters`}
    >
      Test Settings
    </Link>
    <Link
      className="detail-btn"
      to={`${match.url}/class-settings`}
    >
      Class Settings
    </Link>
  </div>
)