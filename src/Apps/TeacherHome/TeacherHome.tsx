import * as React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'

import {
  ClassDetail,
  ClassesGrid,
  ClassCardQueryFragment,
  EditClassModal,
  Navbar,
  NewClassModal,
  TestParametersWithData,
  ParentInvite,
  AddStudentModal,
  StudentInvitationModalWithData,
  StudentCreationModalWithData,
  Loading,
} from './components'
import { IClass } from 'src/utils'
import './TeacherHome.css'

export const QUERY = gql`
  query teacher {
    teacher {
      id
      courses {
        ...ClassCardQueryFragment
      }
    }
  }
  ${ClassCardQueryFragment}
`

interface IProps extends RouteComponentProps<{}> {}

export class TeacherHome extends React.Component<IProps> {
  public render() {
    const { match } = this.props

    return (
      <Query query={QUERY}>
        {({ data: { teacher }, loading }) => {
          if (loading) {
            return (
              <div className="TeacherHome">
                <Route
                  render={(props) => (
                    <Navbar {...props} logoLink={match.url} />
                  )}
                />
                <Loading className="loading" />
              </div>
            )
          }

          return (
            <div className="TeacherHome">
              <Route
                render={(props) => (
                  <Navbar {...props} logoLink={match.url} />
                )}
              />

              <Route
                exact={true}
                path={match.path}
                render={this.renderRedirect}
              />

              <Route
                path={`${match.path}/classes`}
                render={props => <ClassesGrid {...props} courses={teacher.courses} />}
              />

              <Route
                path={`${match.path}/classes/new`}
                component={(props: any) => <NewClassModal {...props} />}
              />

              <Route
                path={`${match.path}/classes/edit/:id`}
                render={(props) => (
                  <EditClassModal
                    {...props}
                    course={teacher.courses.find((course: IClass) => course.id === props.match.params.id)}
                  />
                )}
              />

              <Route
                path={`${match.path}/class-detail/:id`}
                component={ClassDetail}
              />

              <Route
                path={`${match.path}/class-detail/:id/test-parameters`}
                component={TestParametersWithData}
              />
              
              <Route
                path={`${match.path}/class-detail/:id/class-settings`}
                render={(props) => (
                  <EditClassModal
                    {...props}
                    course={teacher.courses.find((course: IClass) => course.id === props.match.params.id)}
                  />
                )}
              />

              <Route
                exact={true}
                path={`${match.path}/class-detail/:id/add-students`}
                component={AddStudentModal}
              />

              <Route
                path={`${match.url}/class-detail/:id/add-students/existing`}
                component={StudentInvitationModalWithData}
              />

              <Route
                path={`${match.url}/class-detail/:id/add-students/new`}
                component={StudentCreationModalWithData}
              />

              <Route
                path={`${match.path}/parent-invitation/:id`}
                component={ParentInvite}
              />
            </div>
          )
        }}
      </Query>
    )
  }

  private renderRedirect = (props: any) => {
    return <Redirect to={`${props.match.url}/classes`} />
  }
}