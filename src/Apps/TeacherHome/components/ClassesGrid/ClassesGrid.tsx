import * as React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { IClass } from 'src/utils'
import { Loading, NewCard } from 'src/sharedComponents'
import { ClassCard } from '../ClassCard/ClassCard'
import './ClassesGrid.css'

interface IProps extends RouteComponentProps<{}> {
  courses?: IClass[]
  dispatch: any
}

interface IState {
  error: string
}

class DisconnectedClassesGrid extends React.Component<IProps, IState> {
  public state = { error: '' }

  public render() {
    const { courses, match } = this.props
    const { error } = this.state

    if (error !== '') {
      return (
        <div className="ClassesGrid">
          <h1 className="error">{error}</h1>
          <h2 className="error">Please Try Again Later</h2>
        </div>
      )
    }

    if (courses === undefined || courses === null) {
      return (
        <div className="ClassesGrid">
          <Loading className="loading" />
        </div>
      )
    }
  
    return (
      <div className="ClassesGrid">
  
        <h2 className="title">Classes</h2>
  
        {Object.keys(courses).map((key) => (
          <ClassCard
            key={key}
            cls={courses[key]}
            onCardClick={this.handleCardClick}
            onSettingsClick={this.handleSettingsClick}
          />
          ))}
  
        <Link to={`${match.url}/new`}>
          <NewCard />
        </Link>
      </div>
    )
  }

  private handleCardClick = async (id: string) => {
    const { history } = this.props
    history.push(`/teacher/class-detail/${id}`)
  }

  private handleSettingsClick = async (id: string) => {
    const { history } = this.props
    history.push(`/teacher/classes/edit/${id}`)
  }
}

const mapStateToProps = ({ courses }: any) => ({ courses })

export const ClassesGrid = connect(mapStateToProps)(DisconnectedClassesGrid)
