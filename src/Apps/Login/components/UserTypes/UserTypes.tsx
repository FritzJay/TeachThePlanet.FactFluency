import * as React from 'react'

import { Button } from 'src/sharedComponents'
import './UserTypes.css'

interface IProps {
  currentType: string
  onSelect: (e: any) => void;
}

export const UserTypes = ({ currentType, onSelect }: IProps) => {
  const getClassName = (buttonType: string) => (
    buttonType === currentType
    ? 'gray button active'
    : 'gray button'
  )

  return (
    <div className="UserTypes">
      <Button
        className={getClassName('Teacher')}
        onClick={onSelect}
      >
        Teacher
      </Button>

      <Button
        className={getClassName('Student')}
        onClick={onSelect}
      >
        Student
      </Button>

      <Button
        className={getClassName('Parent')}
        onClick={onSelect}
      >
        Parent
      </Button>
    </div>
  )
}