import * as React from 'react'
import gql from 'graphql-tag'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Query } from 'react-apollo'

import { ClassListNotification } from './components/ClassListNotification/ClassListNotification'
import { Button, Modal, ModalHeader, ModalContent, Loading } from '../../..'
import { IClass } from 'src/utils'
import './ClassListDropdown.css'

export * from './components/ClassListNotification/ClassListNotification'

export const GET_ACTIVE_COURSE_ID = gql`
  {
    activeCourseId @client
  }
`

const GET_STUDENT = gql`
  query student {
    student {
      id
      user {
        id
        email
      }
      courses {
        id
        name
        code
        teacher {
          id
          name
        }
      }
      courseInvitations {
        id
      }
    }
  }
`

interface IState {
  active: boolean
}

class ClassListDropdown extends React.Component<RouteComponentProps, IState> {
  public state: IState = {
    active: false
  }
  
  public render() {
    const { active } = this.state

    return (
      <Query query={GET_ACTIVE_COURSE_ID}>
        {({
          startPolling: startPollingForActiveClass,
          stopPolling: stopPollingForActiveClass,
          data: { activeCourseId },
          loading: firstLoading,
          error: firstError
        }) => {
          if (firstLoading) {
            return active ? (
              <div className="ClassListDropdown">
                <Loading className="loading" />
              </div>
            ) : null
          }

          if (firstError) {
            return active ? (
              <div className="ClassListDropdown">
                <h3 className="error">{firstError.message}</h3>
              </div>
            ) : null
          }

          return (
            <Query query={GET_STUDENT} >
              {({
                startPolling: startPollingForStudent,
                stopPolling: stopPollingForStudent,
                client,
                error,
                loading,
                data
              }) => {
                if (loading) {
                  return active ? (
                    <div className="ClassListDropdown">
                      <Loading className="loading" />
                    </div>
                  ) : null
                }

                if (error) {
                  return active ? (
                    <div className="ClassListDropdown">
                      <h3 className="error">{error.message}</h3>
                    </div>
                  ) : null
                }

                const { user, courses, courseInvitations } = data.student

                if (user.email === 'TTPStudent') {
                  return null
                }

                activeCourseId = activeCourseId || (courses && courses[0] && courses[0].id)

                const numberOfInvitations = courseInvitations
                  ? courseInvitations.length
                  : 0

                return (
                  <>
                    <Button
                      className={`ClassListDropdown-button${active ? ' active' : ''}`}
                      onClick={this.toggleDropdown}
                      title={`You have ${numberOfInvitations} class invitation${numberOfInvitations > 1 ? 's' : ''}`}
                    >
                      <i className="material-icons">school</i>
                      <ClassListNotification numberOfNotifications={numberOfInvitations} />
                    </Button>
                      
                    {active
                      ?
                        <Modal
                          className="ClassListDropdown"
                          overlay={true}
                          onClose={this.toggleDropdown}
                        >
                          <ModalHeader className="header">
                            <h2>Classes</h2>
                          </ModalHeader>
                          <ModalContent className="content">
                            <ul>
                              {courses && courses.map(({ id, name: courseName, teacher : { name: teacherName } }: IClass) => (
                                <li key={id}>
                                  <Button
                                    className={activeCourseId === id ? 'active' : ''}
                                    onClick={() => {
                                      if (activeCourseId !== id) {
                                        client.writeData({ data: { activeCourseId: id } })
                                      } else {
                                        this.toggleDropdown(undefined, (isActive: boolean) => {
                                          if (isActive) {
                                            startPollingForActiveClass(10000)
                                            startPollingForStudent(10000)
                                          } else {
                                            stopPollingForActiveClass()
                                            stopPollingForStudent()
                                          }
                                        })
                                      }
                                    }}
                                  >
                                    {courseName} - {teacherName}
                                  </Button>
                                </li>
                              ))}

                              {numberOfInvitations > 0
                                ? <li
                                    onClick={this.handleInvitationsClick}
                                    className="invitations"
                                  >
                                    <Button className="button">{numberOfInvitations}</Button>
                                    <Button className="link">
                                      Invitations
                                    </Button>
                                  </li>
                                : null}

                              <li
                                onClick={this.handleJoinClassClick}
                                className={`join-class${numberOfInvitations > 0 ? ' with-invitations' : ''}`}
                              >
                                <Button className="button">+</Button>
                                <Button className="link">
                                  Join Class
                                </Button>
                              </li>
                            </ul>
                          </ModalContent>
                        </Modal>
                      : null}
                  </>
                )
              }}
            </Query>
          )
        }}
      </Query>
    )
  }


  private toggleDropdown = (e?: any, cb?: (isActive: boolean) => void) => {
    this.setState(prevState => {
      if (cb !== undefined) {
        cb(!prevState.active)
      }
      return { active: !prevState.active }
    })
  }

  private handleJoinClassClick = () => {
    this.props.history.push('/fact-fluency/select-test/course-requests')
    this.toggleDropdown()
  }
  
  private handleInvitationsClick = () => {
    this.props.history.push('/fact-fluency/select-test/course-invitations')
    this.toggleDropdown()
  }
}

export const ConnectedClassListDropdown = withRouter(ClassListDropdown)