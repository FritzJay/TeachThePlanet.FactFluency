import * as React from 'react'
import { Card } from 'src/sharedComponents'
import './CreateClassCard.css'

export const CreateClassCard = () => (
  <Card className="CreateClassCard active">
    <div className="plus-container active">
      <p className="plus">+</p>
    </div>
  </Card>
)