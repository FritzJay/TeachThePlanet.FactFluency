import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { IClass } from '../../../../lib/Interfaces';
import './Classes.css';
import {
  ClassCard,
  CreateClassCard,
  EditClassModal,
  NewClassModal,
} from './Components/Components';

interface IProps extends RouteComponentProps<{}> {
  classes: IClass[]
  token: string
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
    this.handleNewClassClick = this.handleNewClassClick.bind(this)

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
      </div>
    );
  }

  private handleClassCardClick(selectedClass: IClass) {
    console.log('handleClassCardClick')
    return
  }

  private handleClassSettingsClick(selectedClass: IClass) {
    const { history, match } = this.props

    this.setState({
      selectedClass,
    }, () => {
      history.push(`${match.url}/edit`)
    })
  }

  private handleNewClassClick() {
    const { history, match } = this.props

    history.push(`${match.url}/new`)
  }

  private renderClassesGrid() {
    return (
      <div className="classes-grid">
        {this.props.classes.map((cls: IClass) => (
          <ClassCard
            key={cls._id}
            cls={cls}
            onCardClick={this.handleClassCardClick}
            onSettingsClick={this.handleClassSettingsClick}
          />
          ))}

        <CreateClassCard onClick={this.handleNewClassClick} />
      </div>
    )
  }

  private renderEditClassModal(props: any) {
    const selectedTask = this.state.selectedClass

    if (selectedTask === undefined) {
      this.props.history.goBack()
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
}