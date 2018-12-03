import * as React from 'react'
import { Query, Mutation } from 'react-apollo' 
import { gql } from 'apollo-boost'

import { ICourseRequest } from 'src/utils'
import { Card, ConfirmButton, Loading, Modal, ModalHeader, ModalContent, Input } from 'src/sharedComponents'
import './CourseRequests.css'

const GET_COURSE_REQUESTS = gql`
  query student {
    student {
      id
      courseRequests {
        id
        course {
          id
          name
          createdAt
          teacher {
            id
            name
          }
        }
        student {
          id
          name
          user {
            id
            email
            username
          }
        }
      }
    }
  }
`

const CREATE_REQUEST = gql`
  mutation createCourseRequest($input: CreateCourseRequestInput!) {
    createCourseRequest(input: $input) {
      id
      course {
        id
        name
        code
        createdAt
        teacher {
          id
          name
          user {
            email
            username
          }
        }
      }
      student {
        id
        name
        user {
          id
          email
          username
        }
      }
    }
  }
`

const REMOVE_REQUEST = gql`
  mutation removeCourseRequest($id: ObjID!) {
    removeCourseRequest(id: $id)
}
`

interface IState {
  code: string
  error: string
}

export class CourseRequests extends React.Component<any, IState> {
  public state: IState = {
    code: '',
    error: '',
  }

  public render() {
    return (
      <Query
        query={GET_COURSE_REQUESTS}
        pollInterval={120000}
      >
        {({ error, loading, data }: any) => {
          if (loading) {
            return (
              <div className="CourseRequests">
                <Loading className="loading" />
              </div>
            )
          }
          
          if (error) {
            throw error
          }
          
          const { student: { courseRequests } } = data
    
          return (
            <Modal
              className="CourseRequests"
              overlay={true}
              closeTo="/fact-fluency"
            >
              <ModalHeader className="header">
                <h2>Request to join a classroom!</h2>
              </ModalHeader>
              <ModalContent>
              <Mutation
                  mutation={CREATE_REQUEST}
                  onError={() => this.setState({ error: 'Invalid class code' })}
                  update={(cache, { data: { createCourseRequest } }) => {
                    const { student }: any = cache.readQuery({ query: GET_COURSE_REQUESTS })
                    cache.writeQuery({
                      query: GET_COURSE_REQUESTS,
                      data: {
                        student: {
                          ...student,
                          courseRequests: student.courseRequests.concat([createCourseRequest])
                        }
                      }
                    })
                  }}
                >
                  {createRequest => {
                    return (
                      <div className="new-request-container">
                        <h3 className="card-header">Enter a class code to request an invitation</h3>
                        {this.state.error !== ''
                          ? <p className="error">{this.state.error}</p>
                          : null
                        }
                        <Input
                          className="class-code-input"
                          placeholder="Class Code"
                          value={this.state.code}
                          onChange={(e: any) => this.setState({ code: e.target.value })}
                        />
                        <ConfirmButton
                            className="green accept"
                            confirmClassName="confirm-button"
                            disableTimeout={2000}
                            onClick={(e: any) => {
                              e.preventDefault()
                              if (this.state.code === '') {
                                this.setState({ error: 'Class code is required' })
                                return
                              } else {
                                this.setState({
                                  error: '',
                                  code: '',
                                })
                              }
                              createRequest({
                                variables: { input: {
                                  code: this.state.code,
                                  studentId: data.student.id,
                                }}
                              })}
                            }
                          >
                            <span className="default">Send</span>
                            <span className="confirmation">Are you sure?</span>
                          </ConfirmButton>
                      </div>
                    )
                  }}
                </Mutation>

                {courseRequests.length > 0
                  ? courseRequests.map(({ id, course }: ICourseRequest) => (
                    <Mutation
                      key={id}
                      mutation={REMOVE_REQUEST}
                      variables={{ id }}
                      onError={() => this.setState({ error: 'There was an unexpected server error. Please try again later.' })}
                      update={(cache) => {
                        const { student }: any = cache.readQuery({ query: GET_COURSE_REQUESTS })
                        cache.writeQuery({
                          query: GET_COURSE_REQUESTS,
                          data: {
                            student: {
                              ...student,
                              courseRequests: student.courseRequests.filter((inv: ICourseRequest) => inv.id !== id),
                            }
                          }
                        })
                      }}
                    >
                      {removeCourseRequest => (
                        <Card className="request-card">
                          <h3 className="card-header">Request for {course.name} is pending</h3>
                          <ConfirmButton
                            onClick={() => removeCourseRequest()}
                            className="red decline"
                            confirmClassName="confirm-button"
                          >
                            <span className="default">Remove</span>
                            <span className="confirmation">Are you sure?</span>
                          </ConfirmButton>
                        </Card>
                      )}
                    </Mutation>
                  )) : null
                }
              </ModalContent>
            </Modal>
        )}}
      </Query>
    )
  }
}
