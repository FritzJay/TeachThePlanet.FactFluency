import * as React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Link, RouteComponentProps } from 'react-router-dom'

import { IStudentUser } from 'src/utils'
import { Loading } from 'src/sharedComponents'
import { ParentInvite } from '../ParentInvite/ParentInvite'
import { StudentReports } from './components/StudentReports/StudentReports'
import { Header } from './components/Header/Header'
import { CopyToClipboard } from 'src/sharedComponents'
import { PendingInvitations } from './components/PendingInvitations/PendingInvitations'
import './ClassDetail.css'


export const GET_COURSE = gql`
  query course($id: ObjID!) {
    course(id: $id) {
      id
      code
      grade
      name
      students {
        id
        name
        changePasswordRequired
        createdAt
        tests {
          id
          number
          operator
          start
          end
          testResults {
            id
            total
            needed
          }
        }
        user {
          id
          email
        }
      }
      courseInvitations {
        id
        createdAt
        student {
          id
          name
        }
        course {
          id
          name
        }
      }
    }
  }
`

interface IProps extends RouteComponentProps<{ id: string }> {}

export const ClassDetail = ({ match }: IProps) => (
  <Query
    query={GET_COURSE}
    variables={{ id: match.params.id }}
    pollInterval={15000}
  >
    {({ error, loading, data }) => {
      if (loading) {
        return (
          <div className="ClassDetail">
            <Loading className="loading" />
          </div>
        )
      }

      if (error) {
        return (
          <div className="ClassDetail">
            <h3 className="error">{error.message}</h3>
          </div>
        )
      }

      const { code, name, id, students, courseInvitations } = data.course

      return (
        <>
          <div className="ClassDetail">
            <h2 className="classes">
              <Link className="classrooms" to="/teacher/classes">
                <i className="material-icons big">arrow_back_ios</i>Classes
              </Link>
            </h2>
            
            <h1 className="class-name">
              {name}
            </h1>

            <CopyToClipboard
              text={code}
              className="class-code"
            >
              <h3>{code}</h3>
              <i className="material-icons">assignment</i>
            </CopyToClipboard>

            <Header
              match={match}
              onParentInvitesClick={window.print}
            />

            <StudentReports
              courseId={id}
              students={students.filter((student: IStudentUser) => !student.changePasswordRequired)}
              match={match}
            />

            <PendingInvitations
              pendingStudents={students.filter((student: IStudentUser) => student.changePasswordRequired)}
              courseInvitations={courseInvitations}
              match={match}
            />

          </div>

          <ParentInvite email={'Temp'} password={'Temp'} />
        </>
      )
    }}
  </Query>
)
