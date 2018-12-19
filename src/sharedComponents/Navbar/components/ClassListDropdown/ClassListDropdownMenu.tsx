import * as React from 'react'
import { gql } from 'apollo-boost'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Query } from 'react-apollo'

import { Button, Loading, NavbarDropdownMenu } from 'src/sharedComponents'
import { IClass } from 'src/utils'
import './ClassListDropdownMenu.css'

export const GET_ACTIVE_COURSE_ID = gql`
  {
    activeCourseId @client
  }
`

export const GET_STUDENT = gql`
  query studentByToken {
    studentByToken {
      nodeId
      id
      userByUserId {
        nodeId
        id
        email
        username
      }
      coursesList {
        nodeId
        id
        name
        code
        teacherByTeacherId {
          nodeId
          id
          name
        }
      }
      courseInvitationsByStudentIdList {
        nodeId
        id
      }
    }
  }
`

class ClassListDropdownMenu extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <Query query={GET_ACTIVE_COURSE_ID}>
        {({
          data: { activeCourseId },
          loading: firstLoading,
        }) => {
          if (firstLoading) {
            return (
              <NavbarDropdownMenu className="ClassListDropdownMenu" id="ClassListDropdownMenu">
                <Loading className="loading" />
              </NavbarDropdownMenu>
            )
          }

          return (
            <Query 
              query={GET_STUDENT}
              pollInterval={10000}
            >
              {({
                client,
                loading,
                data
              }) => {
                if (loading) {
                  return (
                    <NavbarDropdownMenu className="ClassListDropdownMenu" id="ClassListDropdownMenu">
                      <Loading className="loading" />
                    </NavbarDropdownMenu>
                  )
                }

                if (data.studentByToken.userByUserId.email === 'TTPStudent') {
                  return null
                }

                const { coursesList, courseInvitationsByStudentIdList } = data.studentByToken

                activeCourseId = activeCourseId || (coursesList && coursesList[0] && coursesList[0].id)

                const numberOfInvitations = courseInvitationsByStudentIdList
                  ? courseInvitationsByStudentIdList.length
                  : 0

                return (
                  <NavbarDropdownMenu className="ClassListDropdownMenu" id="ClassListDropdownMenu">
                    <h2>Class Settings</h2>
                    {coursesList.map(({ id, name: courseName, teacher : { name: teacherName } }: IClass) => (
                      <Button
                        key={id}
                        className={activeCourseId === id ? 'active' : ''}
                        onClick={() => {
                          if (activeCourseId !== id) {
                            client.writeData({ data: { activeCourseId: id } })
                            client.readQuery({ query: GET_ACTIVE_COURSE_ID })
                          }
                        }}
                      >
                        {courseName} - {teacherName}
                      </Button>
                    ))}

                    {coursesList.length < 1
                      ? <p>You haven't joined any classes yet</p>
                      : null}

                    <hr />

                    {numberOfInvitations > 0
                      ? <Button
                          className="invitations"
                          onClick={this.handleInvitationsClick}
                        >
                          <span className="circle">{numberOfInvitations}</span>
                          <span className="bar">
                            Invitation{numberOfInvitations !== 1 ? 's' : ''}
                          </span>
                        </Button>
                      : null}

                    <Button
                      onClick={this.handleJoinClassClick}
                      className="join-class"
                    >
                      <span className="circle">+</span>
                      <span className="bar">
                        Join Class
                      </span>
                    </Button>
                  </NavbarDropdownMenu>
                )
              }}
            </Query>
          )
        }}
      </Query>
    )
  }

  private handleJoinClassClick = () => {
    this.props.history.push('/fact-fluency/select-test/course-requests')
  }
  
  private handleInvitationsClick = () => {
    this.props.history.push('/fact-fluency/select-test/course-invitations')
  }
}

export const ConnectedClassListDropdownMenu = withRouter(ClassListDropdownMenu)