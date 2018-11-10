import * as React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { IClass } from 'src/lib/Interfaces'
import { setSelectedClass } from 'src/redux/actions/classes'
import { handleReceiveClassList } from 'src/redux/handlers/classes'
import { Loading } from 'src/sharedComponents'
import { ClassCard } from '../ClassCard/ClassCard'
import { CreateClassCard } from '../CreateClassCard/CreateClassCard'
import './ClassesGrid.css'

interface IProps extends RouteComponentProps<{}> {
  classList?: IClass[]
  dispatch: any
  token: string
}

interface IState {
  error: string
}

class DisconnectedClassesGrid extends React.Component<IProps, IState> {
  public state = { error: '' }

  public async componentDidMount() {
    const { classList, dispatch, token } = this.props

    if (classList === undefined) {
      try {
        await dispatch(handleReceiveClassList(token))
        this.setState({ error: '' })
  
      } catch (error) {
        this.setState({ error: error.toString() })
      }
    }
  }

  public render() {
    const { classList, match } = this.props
    const { error } = this.state

    if (error !== '') {
      return (
        <div className="ClassesGrid">
          <h1 className="error">{error}</h1>
          <h2 className="error">Please Try Again Later</h2>
        </div>
      )
    }

    if (classList === undefined || classList === null) {
      return (
        <div className="ClassesGrid">
          <Loading className="loading" />
        </div>
      )
    }
  
    return (
      <div className="ClassesGrid">
  
        <h2 className="title">Classes</h2>
  
        {classList.map((cls: IClass) => (
          <ClassCard
            key={cls._id}
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
    const { dispatch, history } = this.props

    await dispatch(setSelectedClass(selectedClass._id))
    history.push('/classes/detail')
  }

  private handleSettingsClick = async (selectedClass: IClass) => {
    const { dispatch, history, match } = this.props

    await dispatch(setSelectedClass(selectedClass._id))
    history.push(`${match.url}/edit`)
  }
}

const mapStateToProps = ({ user, classes }: any) => ({
  token: user.token,
  classList: classes.classList
})

export const ClassesGrid = connect(mapStateToProps)(DisconnectedClassesGrid)
