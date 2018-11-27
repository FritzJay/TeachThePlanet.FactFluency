import * as React from 'react'

import './ClassListNotification.css'

interface IProps {
  numberOfNotifications: number
}

export const ClassListNotification = ({ numberOfNotifications }: IProps) => {
  if (numberOfNotifications <= 0) {
    return null
  }
  return (
    <div className="ClassListNotification">{numberOfNotifications}</div>
  )
}

