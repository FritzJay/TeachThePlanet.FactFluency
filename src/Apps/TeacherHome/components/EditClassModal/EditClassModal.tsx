import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { IClass } from 'src/utils'
import { handleRemoveClass, handleUpdateClass } from 'src/handlers/courses'
import { Input, Loading, Modal, ModalContent, ModalHeader } from 'src/sharedComponents'
import { Button } from 'src/sharedComponents/Button/Button'
import './EditClassModal.css'

const DEFAULT_DELETE_TEXT = 'Delete Class'
const CONFIRM_DELETE_TEXT = 'Confirm'

interface IProps extends RouteComponentProps<{ id: string }> {
  dispatch: any
  selectedCourse?: IClass
  token?: string
}

interface IState {
  deleteText: string
  error: string
  loading: boolean
  name?: string
  grade?: string
}

export class DisconnectedEditClassModal extends React.Component<IProps, IState> {
  public state: IState = {
    deleteText: DEFAULT_DELETE_TEXT,
    error: '',
    loading: false,
    grade: this.props.selectedCourse
      ? this.props.selectedCourse.grade
      : undefined,
    name: this.props.selectedCourse
      ? this.props.selectedCourse.name
      : undefined,
  }

  private deleteConfirmationTimeout: any

  public componentWillUnmount() {
    window.clearTimeout(this.deleteConfirmationTimeout)
  }

  public render() {
    const { selectedCourse, token } = this.props
    const { deleteText, error, loading, name, grade } = this.state

    if (token === undefined || selectedCourse === undefined || loading) {
      return (
        <Modal
          overlay={true}
          closeTo="GO_BACK"
          className="EditClassModal"
        >
          <Loading className="loading" />
        </Modal>
      )
    }

    return (
      <Modal
        overlay={true}
        closeTo="GO_BACK"
        className="EditClassModal"
      >

        <ModalHeader className="modal-header">
          <h2>Edit Class</h2>
        </ModalHeader>

        <ModalContent>
          <div className="input-fields">

            <label className="label">Change Grade Level</label>
            <select
              name="grade"
              onChange={this.handleChange}
              value={grade}
            >
              <option value="kindergarten">Kindergarten</option>
              <option value="first">1st Grade</option>
              <option value="second">2nd Grade</option>
              <option value="third">3rd Grade</option>
              <option value="fourth">4th Grade</option>
              <option value="fifth">5th Grade</option>
              <option value="middle">Middle School (6-8)</option>
              <option value="high">High School (9-12)</option>
              <option value="beyond">College or Beyond</option>
            </select>

            <label className="label">Change Class Name</label>
            <Input
              name="name"
              className="class-name"
              placeholder={selectedCourse.name}
              value={name}
              onChange={this.handleChange}
            />
            
            {error !== '' && <p className="error">{error}</p>}

          </div>

            {deleteText === DEFAULT_DELETE_TEXT
              ? (
                <div className="btn-row">
                  <Button
                    className="red delete-class"
                    onClick={this.handleDeleteClick}
                  >
                    {deleteText}
                  </Button>

                  <Button
                    className="green save-changes"
                    onClick={this.handleSaveChangesClick}
                  >
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="btn-row">
                  <Button
                    className="red delete-class confirm"
                    onClick={this.handleDeleteClick}
                  >
                    {deleteText}
                  </Button>
                </div>
              )}

        </ModalContent>
      </Modal>
    )
  }
  
  private handleDeleteClick = () => {
    const { dispatch, token, history, selectedCourse } = this.props

    if (token === undefined || selectedCourse === undefined) {
      return
    }

    if (this.state.deleteText !== CONFIRM_DELETE_TEXT) {
      this.setState({ deleteText: CONFIRM_DELETE_TEXT })
      
      this.deleteConfirmationTimeout = window.setTimeout(() => {
        this.setState({ deleteText: DEFAULT_DELETE_TEXT })
      }, 3000)

      return
    }

    this.setState({ loading: true }, () => {
      try {
        dispatch(handleRemoveClass(token, selectedCourse.id))
        history.push('/teacher')
  
      } catch (error) {
        console.warn(error)
        this.setState({
          error: 'An unexpected error ocurred. Please try again later',
          loading: false,
        })
      }
    })
  }

  private handleSaveChangesClick = async () => {
    const { dispatch, token, history, selectedCourse } = this.props
    const { grade, name } = this.state
    if (token === undefined || selectedCourse === undefined || grade === undefined || name === undefined) {
      return
    }
    const { id } = selectedCourse

    this.setState({ loading: true }, async () => {
      try {
        await dispatch(handleUpdateClass(token, id, { grade, name }))
        history.goBack()

      } catch (error) {
        console.warn(error)
        this.setState({
          error: error.message,
          loading: false,
        })
      }
    })
  }
  
  private handleChange = (e: any) => {
    const { value, name } = e.target

    const state = { error: '' }
    state[name] = value

    this.setState(state)
  }
}

const mapStateToProps = ({ user, courses }: any, { match }: any) => ({
  token: user.token,
  selectedCourse: courses
    ? courses[match.params.id]
    : undefined,
})

export const EditClassModal = connect(mapStateToProps)(DisconnectedEditClassModal)