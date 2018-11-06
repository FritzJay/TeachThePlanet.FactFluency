import * as React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { getClasses } from 'src/lib/Api/Classes';
import { Caching } from 'src/lib/lib';
import { IClass } from '../../../../lib/Interfaces';
import './Classes.css';
import {
  ClassDetail,
  ClassesGrid,
  EditClassModal,
  NewClassModal,
  TestParameters,
} from './Components/Components';

interface IProps extends RouteComponentProps<{}> {
  token: string
  onLogout: () => void
}

interface IState {
  classes: IClass[]
  selectedClass?: IClass
  isLoading: boolean
}

export class Classes extends React.Component<IProps, IState> {
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
    const { match } = this.props

    return (
      <div className="classes">
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
        token={this.props.token}
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
    const selectedTask = this.state.selectedClass

    if (selectedTask === undefined || selectedTask === null) {
      return <Redirect to='/classes' />
    }

    return (
      <EditClassModal
        {...props}
        cls={selectedTask}
        onSave={this.fetchClasses}
        token={this.props.token}
      />
    )
  }

  private renderNewClassModal(props: any) {
    return (
      <NewClassModal
        {...props}
        token={this.props.token}
        onSave={this.fetchClasses}
      />
    )
  }

  private renderClassDetail(props: any) {
    const { selectedClass } = this.state

    if (selectedClass === undefined) {
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
    const { token } = this.props
    const { selectedClass } = this.state

    if (selectedClass === undefined) {
      return <Redirect to="/classes" />
    }

    return (
      <TestParameters
        {...props}
        token={token}
        classID={selectedClass._id}
      />
    )
  }

  private fetchClasses() {
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