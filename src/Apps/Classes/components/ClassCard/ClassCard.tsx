import * as React from 'react'
import { IClass } from 'src/utils'
import { Card, CopyToClipboard } from 'src/sharedComponents'
import './ClassCard.css'
import SchoolIcon from './school-icon.svg'

interface IProps {
  cls: IClass
  onCardClick: (cls: IClass) => void
  onSettingsClick: (cls: IClass) => void
}

export const ClassCard = ({ cls, onCardClick, onSettingsClick }: IProps) => {
  const handleCardClick = () => {
    onCardClick(cls)
  }

  const handleSettingsClick = (e: any) => {
    onSettingsClick(cls)

    e.stopPropagation()
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

      <h3 className="class-name">{cls.name}</h3>
      
      <CopyToClipboard
        text={cls.code}
        className="class-code"
      >
        <h4>Class Code: {cls.code}</h4>

        <i className="material-icons">assignment</i>
      </CopyToClipboard>
    </Card>
  )
}