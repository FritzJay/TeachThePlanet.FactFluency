import * as React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { GET_COURSE } from '../../ClassDetail'

import { ICourseRequest, IStudentUser } from 'src/utils'
import { Button, Card, ConfirmButton } from 'src/sharedComponents'
import { PendingRequestsDescription } from '../PendingRequestsDescription/PendingRequestsDescription'
import './PendingRequests.css'

interface ICourseRequestCardProps {
  date: Date
  student: IStudentUser
  onDelete: () => void
  onAccept: () => void
}

const CourseRequestCard = ({ date, student, onDelete, onAccept }: ICourseRequestCardProps) => (
  <Card className="CourseRequestCard">
    <h3 className="student-name">
      {student.name.length > 15
        ? student.name.slice(0, 15) + '...'
        : student.name}
    </h3>

    <span className="email">{student.user.email}</span>

    <h4 className="date">{date.getMonth()}/{date.getDate()}/{date.getFullYear()}</h4>

    <ConfirmButton
      className="delete"
      confirmClassName="confirm"
      onClick={onDelete}
    >
      <span className="confirmation">Delete?</span>
      <i className="material-icons">delete</i>
    </ConfirmButton>
    
    <ConfirmButton
      className="accept green"
      confirmClassName="confirm"
      onClick={onAccept}
    >
      <span className="default">Accept</span>
      <span className="confirmation">Accept?</span>
    </ConfirmButton>
  </Card>
)


const REMOVE_COURSE_REQUEST = gql`
  mutation removeCourseRequest($id: ObjID!) {
    removeCourseRequest(id: $id)
  }
`

const ACCEPT_COURSE_REQUEST = gql`
  mutation acceptCourseRequest($id: ObjID!) {
    acceptCourseRequest(id: $id) {
      id
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
    }
  }
`

interface IProps {
  courseRequests: ICourseRequest[]
  courseId: string
}

interface IState {
  activeDescription: boolean
}

export class PendingRequests extends React.Component<IProps, IState> {
  public state: IState = {
    activeDescription: false,
  }

  public render() {
    const { activeDescription } = this.state
    const { courseRequests, courseId } = this.props

    return (
      <div className="PendingRequests">
        <div className="section-header">
            <h2>Class Requests</h2>
            <Button
              name="activeDescription"
              className="blue description-button"
              onClick={this.toggleDescription}
            >
              {!activeDescription
                ? 'More info'
                : 'Close'
              }
            </Button>
          </div>
  
          {activeDescription
            ? <PendingRequestsDescription />
            : null
          }

          {courseRequests.map(({ id, createdAt, student }) => (
            <Mutation
              key={id}
              mutation={REMOVE_COURSE_REQUEST}
              optimisticResponse={{
                __typename: 'Mutation',
                removeCourseRequest: true
              }}
              update={cache => {
                const { course }: any = cache.readQuery({
                  query: GET_COURSE,
                  variables: { id: courseId },
                })
                cache.writeQuery({
                  query: GET_COURSE,
                  data: {
                    course: {
                      ...course,
                      courseRequests: course
                        ? course.courseRequests.filter((inv: ICourseRequest) => inv.id !== id)
                        : []
                    }
                  }
                })
              }}
            >
              {removeCourseRequest => (
                <Mutation
                  key={id}
                  mutation={ACCEPT_COURSE_REQUEST}
                  update={cache => {
                    const { course }: any = cache.readQuery({
                      query: GET_COURSE,
                      variables: { id: courseId },
                    })
                    cache.writeQuery({
                      query: GET_COURSE,
                      data: {
                        course: {
                          ...course,
                          courseRequests: course
                            ? course.courseRequests.filter((inv: ICourseRequest) => inv.id !== id)
                            : []
                        }
                      }
                    })
                  }}
                  refetchQueries={[{
                    query: GET_COURSE,
                    variables: { id: courseId }
                  }]}
                >
                  {acceptCourseRequest => (
                    <CourseRequestCard
                      date={new Date(createdAt)}
                      student={student}
                      onDelete={() => removeCourseRequest({ variables: { id } })}
                      onAccept={() => acceptCourseRequest({ variables: { id } })}
                    />
                  )}
                </Mutation>
              )}
            </Mutation>
          ))}
      </div>
    )
  }

  private toggleDescription = () => {
    this.setState((prevState: IState) => ({
      activeDescription: !prevState.activeDescription
    }))
  }
}