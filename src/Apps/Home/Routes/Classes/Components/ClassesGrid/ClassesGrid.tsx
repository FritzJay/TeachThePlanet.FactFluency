import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom';
import { IClass } from '../../../../../../lib/Interfaces';
import { ClassCard, CreateClassCard } from '../Components';

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
        {classes.map((cls: IClass) => (
          <ClassCard
            key={cls._id}
            cls={cls}
            onCardClick={onClassCardClick}
            onSettingsClick={onClassSettingsClick}
          />
          ))}

        <Link to={'/classes/new'}>
          <CreateClassCard />
        </Link>
      </div>
    )
  }
}