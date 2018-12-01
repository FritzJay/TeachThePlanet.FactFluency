import * as React from 'react'
import { Query, Mutation } from 'react-apollo' 
import gql from 'graphql-tag'

import { ICourseInvitation } from 'src/utils'
import { Card, ConfirmButton, Loading, Modal, ModalHeader, ModalContent } from 'src/sharedComponents'
import './CourseInvitations.css'

const GET_COURSE_INVITATIONS = gql`
  query student {
    student {
      id
      courseInvitations {
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
      }
    }
  }
`

const ACCEPT_INVITATION = gql`
  mutation acceptCourseInvitation($id: ObjID!) {
    acceptCourseInvitation(id: $id) {
      id
      name
      code
      teacher {
        id
        name
      }
      testParameters {
        id
        operators
        numbers
      }
    }
  }
`

const REMOVE_INVITATION = gql`
  mutation removeCourseInvitation($id: ObjID!) {
    removeCourseInvitation(id: $id)
}
`

export const CourseInvitations = () => (
  <Query
    query={GET_COURSE_INVITATIONS}
    pollInterval={120000}
  >
    {({ error, loading, data }: any) => {
      if (loading) {
        return (
          <div className="CourseInvitations">
            <Loading className="loading" />
          </div>
        )
      }
      
      if (error) {
        return (
          <div className="CourseInvitations">
            <h3 className="error">{error.message}</h3>
          </div>
        )
      }
      
      const { student: { courseInvitations } } = data

      return (
        <Modal
          className="CourseInvitations"
          overlay={true}
          closeTo="/fact-fluency"
        >
          <ModalHeader className="header">
            <h2>Select an invitation to join the classroom!</h2>
          </ModalHeader>
          <ModalContent>
            {courseInvitations.length > 0
              ? courseInvitations.map(({ id, course }: ICourseInvitation) => (
                <Mutation
                  key={id}
                  mutation={ACCEPT_INVITATION}
                  variables={{ id }}
                  update={(cache, { data: { acceptCourseInvitation } }) => {
                    const { student }: any = cache.readQuery({ query: GET_COURSE_INVITATIONS })
                    cache.writeQuery({
                      query: GET_COURSE_INVITATIONS,
                      data: {
                        student: {
                          ...student,
                          courseInvitations: student.courseInvitations.filter((inv: ICourseInvitation) => inv.id !== id),
                          courses: student.courses
                            ? student.courses.concat([ acceptCourseInvitation ])
                            : [acceptCourseInvitation]
                        }
                      }
                    })
                  }}
                >
                  {acceptCourseInvitation => (
                    <Mutation
                      mutation={REMOVE_INVITATION}
                      variables={{ id }}
                      update={(cache) => {
                        const { student }: any = cache.readQuery({ query: GET_COURSE_INVITATIONS })
                        cache.writeQuery({
                          query: GET_COURSE_INVITATIONS,
                          data: {
                            student: {
                              ...student,
                              courseInvitations: student.courseInvitations.filter((inv: ICourseInvitation) => inv.id !== id),
                            }
                          }
                        })
                      }}
                    >
                      {removeCourseInvitation => (
                        <Card className="invitation-card">
                          <h3 className="card-header">{course.teacher.name} invited you to join the class {course.name}</h3>
                          <ConfirmButton
                            value={id}
                            onClick={() => removeCourseInvitation()}
                            className="red decline"
                            confirmClassName="confirm-button"
                          >
                            <span className="default">Decline</span>
                            <span className="confirmation">Are you sure?</span>
                          </ConfirmButton>
                          <ConfirmButton
                            value={id}
                            onClick={() => acceptCourseInvitation()}
                            className="green accept"
                            confirmClassName="confirm-button"
                          >
                            <span className="default">Accept</span>
                            <span className="confirmation">Are you sure?</span>
                          </ConfirmButton>
                        </Card>
                      )}
                    </Mutation>
                  )}
                </Mutation>
              )) : <p>You don't have any class invitations. Ask your teacher to create an invitation for "student2@email.com"!</p>
            }
          </ModalContent>
        </Modal>
      )
    }}
  </Query>
)
