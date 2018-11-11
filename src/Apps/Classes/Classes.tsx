import * as React from 'react'
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'
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
          component={NewClassModal}
        />

        <Route
          path={`${match.path}/detail`}
          component={ClassDetail}
        />

        <Route
          path={`${match.path}/detail/test-parameters`}
          component={TestParameters}
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
}

const mapStateToProps = ({ user }: any) => ({ user })

export const Classes = connect(mapStateToProps)(DisconnectedClasses)