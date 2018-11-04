import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom';
import { IClass } from '../../../../../../lib/Interfaces';
import { ClassCard, CreateClassCard } from '../Components';
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