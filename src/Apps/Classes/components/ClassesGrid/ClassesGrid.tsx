import * as React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { IClass } from 'src/utils'
import { Loading } from 'src/sharedComponents'
import { ClassCard } from '../ClassCard/ClassCard'
import { CreateClassCard } from '../CreateClassCard/CreateClassCard'
import './ClassesGrid.css'

interface IProps extends RouteComponentProps<{}> {
  classes?: IClass[]
  dispatch: any
}

interface IState {
  error: string
}

class DisconnectedClassesGrid extends React.Component<IProps, IState> {
  public state = { error: '' }

  public render() {
    const { classes, match } = this.props
    const { error } = this.state

    if (error !== '') {
      return (
        <div className="ClassesGrid">
          <h1 className="error">{error}</h1>
          <h2 className="error">Please Try Again Later</h2>
        </div>
      )
    }

    if (classes === undefined || classes === null) {
      return (
        <div className="ClassesGrid">
          <Loading className="loading" />
        </div>
      )
    }
  
    return (
      <div className="ClassesGrid">
  
        <h2 className="title">Classes</h2>
  
        {classes.map((cls) => (
          <ClassCard
            key={cls.id}
            cls={cls}
            onCardClick={this.handleCardClick}
            onSettingsClick={this.handleSettingsClick}
          />
          ))}
  
        <Link to={`${match.url}/new`}>
          <CreateClassCard />
        </Link>
      </div>
    )
  }

  private handleCardClick = async (selectedClass: IClass) => {
    const { history } = this.props

    // TODO: await dispatch(setSelectedClass(selectedClass._id))
    history.push('/classes/detail')
  }

  private handleSettingsClick = async (selectedClass: IClass) => {
    const { history, match } = this.props

    // TODO: await dispatch(setSelectedClass(selectedClass._id))
    history.push(`${match.url}/edit`)
  }
}

const mapStateToProps = ({ teacher }: any) => ({ classes: teacher.classes })

export const ClassesGrid = connect(mapStateToProps)(DisconnectedClassesGrid)
