import * as React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { IClass } from '../../../../lib/Interfaces';
import './Classes.css';
import {
  ClassDetail,
  ClassesGrid,
  EditClassModal,
  NewClassModal,
} from './Components/Components';

interface IProps extends RouteComponentProps<{}> {
  token: string
  onLogout: () => void
}

interface IState {
  selectedClass?: IClass
}

export class Classes extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props)

    this.state = {}

    this.handleClassCardClick = this.handleClassCardClick.bind(this)
    this.handleClassSettingsClick = this.handleClassSettingsClick.bind(this)

    this.renderEditClassModal = this.renderEditClassModal.bind(this)
    this.renderClassesGrid = this.renderClassesGrid.bind(this)
    this.renderNewClassModal = this.renderNewClassModal.bind(this)
  }

  public render() {
    const { match } = this.props

    return (
      <div className="classes">
        <h2>Classes</h2>

        <Route
          exact={true}
          path={match.path}
          render={this.renderClassesGrid}
        />

        <Route
          path={`${match.path}/edit`}
          render={this.renderEditClassModal}
        />

        <Route
          path={`${match.path}/new`}
          render={this.renderNewClassModal}
        />

        <Route
          path={`${match.path}/detail`}
          render={this.renderClassDetail}
        />
      </div>
    );
  }

  private renderClassesGrid(props: any) {
    return (
      <ClassesGrid
        {...props}
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
      history.push(`${match.url}/edit`)
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
        token={this.props.token}
      />
    )
  }

  private renderNewClassModal(props: any) {
    return (
      <NewClassModal
        {...props}
        token={this.props.token}
      />
    )
  }

  private renderClassDetail(props: any) {
    return (
      <ClassDetail
        {...props}
      />
    )
  }
}