import * as React from 'react'
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'
import {
  ClassDetail,
  ClassesGrid,
  EditClassModal,
  Navbar,
  NewClassModal,
  TestParameters,
  ParentInvite,
} from './components'
import './TeacherHome.css'

interface IProps extends RouteComponentProps<{}> {}

export class TeacherHome extends React.Component<IProps> {
  public render() {
    const { match } = this.props

    return (
      <div className="TeacherHome">
        <Navbar logoLink={`${match.url}/classes`} />

        <Route
          exact={true}
          path={match.path}
          render={this.renderRedirect}
        />

        <Route
          path={`${match.path}/classes`}
          component={ClassesGrid}
        />

        <Route
          path={`${match.path}/classes/new`}
          component={NewClassModal}
        />

        <Route
          path={`${match.path}/classes/edit/:id`}
          component={EditClassModal}
        />

        <Route
          path={`${match.path}/class-detail/:id`}
          component={ClassDetail}
        />

        <Route
          path={`${match.path}/class-detail/:id/test-parameters`}
          component={TestParameters}
        />
        
        <Route
          path={`${match.path}/class-detail/:id/class-settings`}
          component={EditClassModal}
        />

        <Route
          path={`${match.path}/parent-invitation/:id`}
          component={ParentInvite}
        />
      </div>
    )
  }

  private renderRedirect = (props: any) => {
    return <Redirect to={`${props.match.url}/classes`} />
  }
}