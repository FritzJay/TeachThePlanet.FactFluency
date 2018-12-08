import * as React from 'react'
import { gql } from 'apollo-boost'
import { Mutation, Query } from 'react-apollo'
import { RouteComponentProps } from 'react-router'

import { Button, Input, Modal, ModalContent, ModalHeader, Loading, Card } from 'src/sharedComponents'
import './StudentInvitationModal.css'

interface IProps extends RouteComponentProps<{ id: string }> {}

interface IState {
  student: string
  successMessage: string
}

export class StudentInvitationModal extends React.Component<IProps, IState> {
  public state: IState = {
    student: '',
    successMessage: '',
  }

  public render() {
    const { match } = this.props
    const { student, successMessage } = this.state

    return (
      <Query
        query={GET_COURSE}
        variables={{
          id: match.params.id
        }}
        partialRefetch={true}
      >
        {({ data, loading}) => {
          if (loading) {
            return (
              <Modal
                overlay={true}
                closeTo={`/teacher/class-detail/${this.props.match.params.id}`}
                className="StudentInvitationModal"
              >
                <Loading />
              </Modal>
            )
          }

          return (
            <Mutation mutation={CREATE_COURSE_INVITATION}>
              {(createCourseInvitation, { error: mutationError }) => (
                <Modal
                  overlay={true}
                  closeTo={`/teacher/class-detail/${this.props.match.params.id}`}
                  className="StudentInvitationModal"
                >
                  <ModalHeader className="header">
                    <h1>Invite Students</h1>
                  </ModalHeader>
      
                  <ModalContent className="content">
                    <Card className="option-card top">
                      <h3 className="header">Let your students join your class using your class code:</h3>
                      <h3 className="class-code">{data.course.code}</h3>
                    </Card>
                
                    <Card className="option-card">
                      <h3 className="header">Enter the email or username of a student and send them an invite</h3>
            
                      {mutationError && mutationError.message === 'GraphQL error: The course already contains an invitation for the given student'
                        ? <p className="error">You have already sent an invitation to this student</p>
                        : mutationError && mutationError.message === "GraphQL error: Cannot read property '_id' of null"
                          ? <p className="error">Invalid username/email</p>
                          : mutationError && mutationError.message === 'GraphQL error: The student is already a part of the class'
                            ? <p className="error">The student is already in this class</p>
                            : mutationError
                              ? <p className="error">{mutationError.message}</p>
                              : null}
      
                      {successMessage !== ''
                        ? <p className="success-message">{successMessage}</p>
                        : null
                      }
            
                      <Input
                        className="student-input"
                        name="student"
                        value={student}
                        placeholder="Email/Username"
                        onChange={this.handleChange}
                      />
      
                      <Button
                        className="green send-button"
                        onClick={async () => {
                          await createCourseInvitation({
                            variables: {
                              input: {
                                courseId: this.props.match.params.id,
                                email: student,
                                username: student,
                              }
                            }
                          })
                          this.setState({
                            successMessage: 'Invitation was successfully submitted!',
                            student: '',
                          })
                        }}
                      >
                        Send Invitation
                      </Button>
                    </Card>
                    
                    <Button
                      className="gray back-button"
                      onClick={this.handleBackClick}
                    >
                      Back
                    </Button>
                  </ModalContent>
                </Modal>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }

  private handleBackClick = () => this.props.history.goBack()

  private handleChange = (e: any) => {
    const { name, value } = e.target
    const newState = {}
    newState[name] = value
    this.setState({
      ...newState,
      successMessage: '',
    })
  }
}

const GET_COURSE = gql`
  query course($id: ObjID!) {
    course(id: $id) {
      id
      code
    }
  }
`

const CREATE_COURSE_INVITATION = gql`
  mutation createCourseInvitation($input: CreateCourseInvitationInput!) {
    createCourseInvitation(input: $input) {
      id
      createdAt
      course {
        id
        name
        teacher {
          id
          name
        }
      }
      student {
        id
        name
        createdAt
        updatedAt
        changePasswordRequired
        user {
          id
          email
        }
      }
    }
  }
`

