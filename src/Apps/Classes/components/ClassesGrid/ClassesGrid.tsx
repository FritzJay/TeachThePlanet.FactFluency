import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { IClass } from 'src/lib/Interfaces'
import { ClassCard } from '../ClassCard/ClassCard'
import { CreateClassCard } from '../CreateClassCard/CreateClassCard'
import './ClassesGrid.css'

interface IProps extends RouteComponentProps<{}> {
  classes: IClass[]
  token: string
  isLoading: boolean
  onClassCardClick: (selectedClass: IClass) => void
  onClassSettingsClick: (selectedClass: IClass) => void
}

export const ClassesGrid = ({ onClassCardClick, onClassSettingsClick, isLoading, classes }: IProps) => {
  if (isLoading === true || classes === undefined) {
    return <div>Loading...</div>
  }

  return (
    <div className="ClassesGrid">

      <h2 className="title">Classes</h2>

      {classes.map((cls: IClass) => (
        <ClassCard
          key={cls._id}
          cls={cls}
          onCardClick={onClassCardClick}
          onSettingsClick={onClassSettingsClick}
        />
        ))}

      <Link to={'/classes/grid/new'}>
        <CreateClassCard />
      </Link>
    </div>
  )
}
