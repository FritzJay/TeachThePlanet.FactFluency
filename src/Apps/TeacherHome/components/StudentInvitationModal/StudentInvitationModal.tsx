import * as React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { RouteComponentProps } from 'react-router'

import { Button, CopyToClipboard, Input, Modal, ModalContent, ModalHeader, Loading, Card } from 'src/sharedComponents'
import './StudentInvitationModal.css'

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
    const { student, successMessage } = this.state

    return (
      <Mutation
        mutation={CREATE_COURSE_INVITATION}
      >
        {(createCourseInvitation, { loading, error }) => {

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
                  <CopyToClipboard
                    text={'TEMP'}
                    className="copy-to-clipboard"
                  >
                    <h3 className="header">Let your students join your class using your class code:</h3>
                    <div className="class-code">
                      <i className="material-icons">assignment</i>
                      <p>{'TEMP'}</p>
                    </div>
                  </CopyToClipboard>
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
                      await createCourseInvitation({
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
        }}
      
      </Mutation>
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
