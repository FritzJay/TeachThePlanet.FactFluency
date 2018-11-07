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
  onLogout: () => void
  onClassCardClick: (selectedClass: IClass) => void
  onClassSettingsClick: (selectedClass: IClass) => void
}

export class ClassesGrid extends React.Component<IProps> {
  public render() {
    const { onClassCardClick, onClassSettingsClick, isLoading, classes } = this.props

    if (isLoading === true || classes === undefined) {
      return <div>Loading...</div>
    }

    return (
      <div className="classes-grid">

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
}