import * as React from 'react'
import { connect } from 'react-redux'

import './ClassListNotification.css'

interface IProps {
  numberOfNotifications: number
}

const ClassListNotification = ({ numberOfNotifications }: IProps) => (
  <div className="ClassListNotification">
    {numberOfNotifications > 0
      ? numberOfNotifications
      : null}
  </div>
)

const mapStateToProps = ({ courseInvitations }: any) => ({
  numberOfNotifications: courseInvitations
    ? Object.keys(courseInvitations).length
    : 0
})

export const ConnectedClassListNotification = connect(mapStateToProps)(ClassListNotification)