import * as React from 'react'
import { gql } from 'apollo-boost'

import { Card, ConfirmButton } from 'src/sharedComponents'
import { IStudentUser } from 'src/utils'
import './PendingCard.css'

export const PendingCardQueryFragment = gql`
  fragment PendingCardQueryFragment on Student {
    id
    name
    createdAt
    user {
      id
      email
      username
    }
  }
`

interface IInvitationType {
  alt: string
  icon: string
  title: string
  color: string
}

interface IProps {
  date: Date
  student: IStudentUser
  invitationType: IInvitationType
  onDelete: () => void
}

export const PendingCard = ({ date, student, onDelete, invitationType }: IProps) => {
  return (
    <Card className="PendingCard" id={student.id}>
      <h3 className="student-name">
        {student.name.length > 15
          ? student.name.slice(0, 15) + '...'
          : student.name}
      </h3>

      <span className="email">{student.user.username || student.user.email}</span>

      <h4 className="date">{date.getMonth()}/{date.getDate()}/{date.getFullYear()}</h4>

      <img
        className={`icon ${invitationType.color}`}
        src={invitationType.icon}
        alt={invitationType.alt}
        title={invitationType.title}
      />

      <ConfirmButton
        className="delete"
        confirmClassName="confirm"
        onClick={onDelete}
      >
        <span className="confirmation">Delete?</span>
        <i className="material-icons">delete</i>
      </ConfirmButton>
    </Card>
  )
}