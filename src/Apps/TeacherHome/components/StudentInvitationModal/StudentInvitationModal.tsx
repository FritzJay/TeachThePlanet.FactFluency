import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

import { Button, CopyToClipboard, Input, Modal, ModalContent, ModalHeader, Loading, Card } from 'src/sharedComponents'
import { handleCreateInvitation } from 'src/handlers/courseInvitations'
import './StudentInvitationModal.css'

interface IProps extends RouteComponentProps<{ id: string }> {
  token: string
  dispatch: any
}

interface IState {
  student: string
  successMessage: string
  loading: boolean
  error: string
}

class StudentInvitationModal extends React.Component<IProps, IState> {
  public state: IState = {
    student: '',
    loading: false,
    error: '',
    successMessage: '',
  }

  public render() {
    const { student, error, loading, successMessage } = this.state

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
          <Card className="option-card">
            <CopyToClipboard
              text={'TEMP'}
              className="copy-to-clipboard"
            >
              <h3 className="header">Let your students join your class using your class code:</h3>
              <div className="class-code">
                <h3>{'TEMP'}</h3>
                <i className="material-icons">assignment</i>
              </div>
            </CopyToClipboard>
          </Card>
          
          <h2 className="or">Or</h2>
      
          <Card className="option-card">
            <h3 className="header">Enter the email or username of a student and send them an invite</h3>
  
            {error !== ''
              ? <p className="error">{error}</p>
              : null
            }
  
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
                onClick={this.handleSendClick}
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

  private handleSendClick = () => {
    if (this.state.student === '') {
      this.setState({
        loading: false,
        error: 'Email or username is required',
        successMessage: ''
      })
      return
    }

    const { dispatch, token, match } = this.props

    this.setState({
      loading: true,
      error: ''
    }, async () => {
      try {
        await dispatch(handleCreateInvitation(token, match.params.id, this.state.student))
        this.setState({
          loading: false,
          error: '',
          successMessage: 'Invitation was successfully submitted!',
          student: '',
        })
      } catch (error) {
        console.warn(error)
        this.setState({
          loading: false,
          error: error.toString(),
          successMessage: '',
        })
      }
    })
  }

  private handleBackClick = () => this.props.history.goBack()

  private handleChange = (e: any) => {
    const { name, value } = e.target
    const newState = {}
    newState[name] = value
    this.setState({
      ...newState,
      error: '',
      successMessage: '',
    })
  }
}
  

const MapStateToProps = ({ user }: any, { match }: any) => ({ token: user.token })

export const ConnectedStudentInvitationModal = connect(MapStateToProps)(StudentInvitationModal)
