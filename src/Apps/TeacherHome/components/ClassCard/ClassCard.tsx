import * as React from 'react'
import gql from 'graphql-tag'

import { IClass } from 'src/utils'
import { Card, CopyToClipboard } from 'src/sharedComponents'
import SchoolIcon from './school-icon.svg'
import './ClassCard.css'

export const ClassCardQueryFragment = gql`
  fragment ClassCardQueryFragment on Course {
    id
    name
    grade
    code
  }
`

interface IProps {
  course: IClass
  onCardClick: (id: string) => void
  onSettingsClick: (id: string) => void
}

export const ClassCard = ({ course, onCardClick, onSettingsClick }: IProps) => {
  const handleCardClick = () => {
    onCardClick(course.id)
  }

  const handleSettingsClick = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    onSettingsClick(course.id)
  }

  return (
    <Card
      className="ClassCard"
      onClick={handleCardClick}
    >

      <button
        className="settings"
        onClick={handleSettingsClick}
      >
        <i className="material-icons settings">settings</i>
      </button>

      <img src={SchoolIcon} className="school-icon" alt="school icon" />

      <h3 className="class-name">{course.name}</h3>
      
      <CopyToClipboard
        text={course.code}
        className="class-code"
      >
        <h4>Class Code: {course.code}</h4>

        <i className="material-icons">assignment</i>
      </CopyToClipboard>
    </Card>
  )
}