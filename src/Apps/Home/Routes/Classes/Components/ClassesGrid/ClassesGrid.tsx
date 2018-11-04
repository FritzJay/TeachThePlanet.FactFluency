import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom';
import { getClasses } from '../../../../../../lib/Api';
import { IClass } from '../../../../../../lib/Interfaces';
import { Caching } from '../../../../../../lib/lib';
import { ClassCard, CreateClassCard } from '../Components';

interface IProps extends RouteComponentProps<{}> {
  token: string
  onLogout: () => void
  onClassCardClick: (selectedClass: IClass) => void
  onClassSettingsClick: (selectedClass: IClass) => void
}

interface IState {
  classes?: IClass[]
  isLoading: boolean
}

export class ClassesGrid extends React.Component<IProps, IState> {
  public state: IState = {
    isLoading: false
  }

  public componentDidMount() {
    this.getClasses()
  }

  public render() {
    const { isLoading, classes } = this.state
    const { onClassCardClick, onClassSettingsClick } = this.props

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

  private getClasses = () => {
    const { onLogout } = this.props
    
    const token = this.props.token || Caching.getCached('token');

    if (token === undefined || token === null) {
      onLogout()
      return
    }

    this.setState({
      isLoading: true
    }, async () => {

      try {
        const results = await getClasses(token)

        this.setState({
          classes: results.classes,
          isLoading: false
        })

      } catch(error) {
        console.log('requestClasses failed', error)
        onLogout()
      }
    })
  }
}