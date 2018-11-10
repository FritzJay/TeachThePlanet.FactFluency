import * as React from 'react'
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { fetchClasses } from 'src/lib/Api/Classes';
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
}

interface IState {
  classes: IClass[]
  selectedClass?: IClass
  isLoading: boolean
}

export class DisconnectedClasses extends React.Component<IProps, IState> {
  public state: IState = {
    classes: [],
    isLoading: false,
  }

  public componentDidMount() {
    this.fetchClasses()
  }

  public render() {
    const { match } = this.props

    return (
      <div className="Classes">
        <Navbar logoLink={`${match.url}/grid`} />

        <Route
          exact={true}
          path={match.path}
          render={this.renderRedirect}
        />

        <Route
          path={`${match.path}/grid`}
          component={ClassesGrid}
        />

        <Route
          path={`${match.path}/grid/edit`}
          component={EditClassModal}
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
          component={EditClassModal}
        />
      </div>
    )
  }

  private renderRedirect = (props: any) => {
    return <Redirect to={`${props.match.url}/grid`} />
  }

  /*
  private renderEditClassModal = (props: any) => {
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
  */

  private renderNewClassModal = (props: any) => {
    return (
      <NewClassModal
        {...props}
        token={this.props.user.token}
        onSave={this.fetchClasses}
      />
    )
  }

  private renderClassDetail = (props: any) => {
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

  private renderTestParameters = (props: any) => {
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

  private fetchClasses = () => {    
    const token = this.props.user.token

    this.setState({
      isLoading: true
    }, async () => {

      try {
        const classes = await fetchClasses(token)

        this.setState({
          classes,
          isLoading: false
        })

      } catch(error) {
        console.log('requestClasses failed', error)
      }
    })
  }
}

const mapStateToProps = ({ user }: any) => ({ user })

export const Classes = connect(mapStateToProps)(DisconnectedClasses)