import * as React from 'react'
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { getClasses } from 'src/lib/Api/Classes'
import { IClass, IUser } from 'src/lib/Interfaces'
import './Classes.css'
import {
  ClassDetail,
  ClassesGrid,
  EditClassModal,
  Navbar,
  NewClassModal,
  TestParameters,
} from './components'

interface IProps extends RouteComponentProps<{}> {
  user: IUser
  onLogout: () => void
}

interface IState {
  classes: IClass[]
  selectedClass?: IClass
  isLoading: boolean
}

export class DisconnectedClasses extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props)

    this.state = {
      classes: [],
      isLoading: false,
    }

    this.handleClassCardClick = this.handleClassCardClick.bind(this)
    this.handleClassSettingsClick = this.handleClassSettingsClick.bind(this)

    this.renderEditClassModal = this.renderEditClassModal.bind(this)
    this.renderClassesGrid = this.renderClassesGrid.bind(this)
    this.renderNewClassModal = this.renderNewClassModal.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
    this.renderTestParameters = this.renderTestParameters.bind(this)
    this.renderClassDetail = this.renderClassDetail.bind(this)

    this.fetchClasses = this.fetchClasses.bind(this)
  }

  public componentDidMount() {
    this.fetchClasses()
  }

  public render() {
    const { match, onLogout, user } = this.props

    return (
      <div className="Classes">
        <Navbar
          user={user}
          logoLink="/"
          onLogout={onLogout}
        />

        <Route
          exact={true}
          path={match.path}
          render={this.renderRedirect}
        />

        <Route
          path={`${match.path}/grid`}
          render={this.renderClassesGrid}
        />

        <Route
          path={`${match.path}/grid/edit`}
          render={this.renderEditClassModal}
        />

        <Route
          path={`${match.path}/grid/new`}
          render={this.renderNewClassModal}
        />

        <Route
          path={`${match.path}/detail`}
          render={this.renderClassDetail}
        />

        <Route
          path={`${match.path}/detail/test-parameters`}
          render={this.renderTestParameters}
        />
        
        <Route
          path={`${match.path}/detail/class-settings`}
          render={this.renderEditClassModal}
        />
      </div>
    )
  }

  private renderRedirect(props: any) {
    return <Redirect to={`${props.match.url}/grid`} />
  }

  private renderClassesGrid(props: any) {
    const { classes, isLoading } = this.state

    return (
      <ClassesGrid
        {...props}
        classes={classes}
        isLoading={isLoading}
        token={this.props.user.token}
        onLogout={this.props.onLogout}
        onClassCardClick={this.handleClassCardClick}
        onClassSettingsClick={this.handleClassSettingsClick}
      />
    )
  }

  private handleClassCardClick(selectedClass: IClass) {
    const { history, match } = this.props

    this.setState({ selectedClass }, () => {
      history.push(`${match.url}/detail`)
    })
  }

  private handleClassSettingsClick(selectedClass: IClass) {
    const { history, match } = this.props

    this.setState({
      selectedClass,
    }, () => {
      history.push(`${match.url}/grid/edit`)
    })
  }

  private renderEditClassModal(props: any) {
    const selectedClass = this.state.selectedClass

    if (selectedClass === undefined || selectedClass === null) {
      console.warn('Error while rendering EditClassModal: ``selectedClass`` is undefined')
      return <Redirect to='/classes' />
    }

    return (
      <EditClassModal
        {...props}
        cls={selectedClass}
        onSave={this.fetchClasses}
        token={this.props.user.token}
      />
    )
  }

  private renderNewClassModal(props: any) {
    return (
      <NewClassModal
        {...props}
        token={this.props.user.token}
        onSave={this.fetchClasses}
      />
    )
  }

  private renderClassDetail(props: any) {
    const { selectedClass } = this.state

    if (selectedClass === undefined) {
      console.warn('Error while rendering ClassDetail: ``selectedClass`` is undefined')
      return <Redirect to="/classes" />
    }

    return (
      <ClassDetail
        {...props}
        class={selectedClass}
      />
    )
  }

  private renderTestParameters(props: any) {
    const { user } = this.props
    const { selectedClass } = this.state

    if (selectedClass === undefined) {
      return <Redirect to="/classes" />
    }

    return (
      <TestParameters
        {...props}
        token={user.token}
        classID={selectedClass._id}
      />
    )
  }

  private fetchClasses() {
    const { onLogout } = this.props
    
    const token = this.props.user.token

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

const mapStateToProps = ({ user }: any) => ({ user })

export const Classes = connect(mapStateToProps)(DisconnectedClasses)