import * as React from 'react'

import './ClassListNotification.css'

interface IProps {
  numberOfNotifications: number
}

export const ClassListNotification = ({ numberOfNotifications }: IProps) => (
  <div className="ClassListNotification">
    {numberOfNotifications > 0
      ? numberOfNotifications
      : null}
  </div>
)
