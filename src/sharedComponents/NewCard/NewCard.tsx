import * as React from 'react'
import { Card } from 'src/sharedComponents'
import './NewCard.css'

interface IProps {
  text?: string
  className?: string
}

export const NewCard = ({ text, className }: IProps) => (
  <Card className={`NewCard active${className ? ' ' + className : ''}`}>
    <h2 className="text">{text}</h2>
    <div className="plus-container active">
      <p className="plus">+</p>
    </div>
  </Card>
)