import * as React from 'react'
import { IClass } from '../../../../../..//lib/Interfaces';
import { Card } from '../../../../../../Components/Card/Card'
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
      className="class-card"
      onClick={handleCardClick}
    >

      <button
        className="settings"
        onClick={handleSettingsClick}
      >
        <i className="material-icons">settings</i>
      </button>

      <img src={SchoolIcon} className="school-icon" alt="school icon" />

      <h3>{cls.name}</h3>
      <h4>Class Code: {cls.classCode}</h4>
    </Card>
  )
}