import * as React from 'react'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import { RouteComponentProps } from 'react-router'

import { Button, Input, Modal, ModalContent, ModalHeader, Loading, Card } from 'src/sharedComponents'
import { IClass } from 'src/utils'
import './StudentInvitationModal.css'

interface IProps extends RouteComponentProps<{ id: string }> {
  data: {
    course: IClass
    error: Error
    loading: boolean
  }
  mutate: any
}

interface IState {
  student: string
  successMessage: string
}

class StudentInvitationModal extends React.Component<IProps, IState> {
  public state: IState = {
    student: '',
    successMessage: '',
  }

  public render() {
    const { error, loading, course } = this.props.data
    const { student, successMessage } = this.state

    return (
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
            <h3 className="class-code">{course && course.code}</h3>
          </Card>
      
          <Card className="option-card">
            <h3 className="header">Enter the email or username of a student and send them an invite</h3>
  
            {error && error.message === 'GraphQL error: The course already contains an invitation for the given student'
              ? <p className="error">You have already sent an invitation to this student</p>
              : null
            }
  
            {!error && successMessage !== ''
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
                await this.props.mutate({
                  variables: {
                    input: {
                      courseId: this.props.match.params.id,
                      email: student,
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

          {loading
            ? <Loading />
            : null
          }
          

          <Button
            className="gray back-button"
            onClick={this.handleBackClick}
          >
            Back
          </Button>
        </ModalContent>
      </Modal>
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

export const StudentInvitationModalWithData = compose(
  graphql(
    GET_COURSE,
    { options: ({ match }: IProps) => ({
      variables: {
        id: match.params.id
      }
    })
  }),
  graphql(CREATE_COURSE_INVITATION)
)(StudentInvitationModal)
