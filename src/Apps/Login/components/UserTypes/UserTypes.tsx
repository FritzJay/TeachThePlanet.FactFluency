import * as React from 'react'

import { Button } from 'src/sharedComponents'
import './UserTypes.css'
import { USER_TYPES } from '../../Login';

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
        name={USER_TYPES.teacher}
        className={getClassName(USER_TYPES.teacher)}
        onClick={onSelect}
      >
        Teacher
      </Button>

      <Button
        name={USER_TYPES.student}
        className={getClassName(USER_TYPES.student)}
        onClick={onSelect}
      >
        Student
      </Button>

      <Button
        title='Coming soon!'
        disabled={true}
        name={USER_TYPES.parent}
        className={getClassName(USER_TYPES.parent)}
        onClick={onSelect}
      >
        Parent
      </Button>
    </div>
  )
}