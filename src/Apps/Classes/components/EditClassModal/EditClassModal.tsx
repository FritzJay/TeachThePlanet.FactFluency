import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { deleteClass, updateClass } from 'src/lib/Api/Classes'
import { IClass } from 'src/lib/Interfaces'
import { Input, Modal, ModalContent, ModalHeader } from 'src/sharedComponents'
import { Button } from 'src/sharedComponents/Button/Button'
import './EditClassModal.css'

interface IProps extends RouteComponentProps<{}> {
  cls: IClass
  token: string
  onSave: () => void
}

interface IState {
  error: string
  name: string
  grade: string
}

export class EditClassModal extends React.Component<IProps, IState> {
  public state = {
    error: '',
    grade: this.props.cls.grade,
    name: this.props.cls.name,
  }

  public render() {
    const { cls } = this.props
    const { name, grade } = this.state

    return (
      <Modal
        overlay={true}
        className="EditClassModal"
      >

        <ModalHeader className="modal-header">
          <h2>Edit Class</h2>
        </ModalHeader>

        <ModalContent>
          <div className="input-fields">

            <label className="label">Change Class Name</label>
            <Input
              name="name"
              className="class-name"
              placeholder={cls.name}
              value={name}
              onChange={this.handleChange}
            />

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

          </div>

          <div className="btn-row">

            <Button
              className="delete-class"
              onClick={this.handleDeleteClick}
            >
              Delete Class
            </Button>

            <Button
              className="cancel"
              onClick={this.handleCancelClick}
            >
              Cancel
            </Button>

            <Button
              className="save-changes"
              onClick={this.handleSaveChangesClick}
            >
              Save Changes
            </Button>
          </div>

        </ModalContent>
      </Modal>
    )
  }
  
  private handleDeleteClick = async () => {
    const { token, history, cls, onSave } = this.props
    
    try {
      await deleteClass(token, cls._id)

      onSave()
      
      history.push('/classes')
      
    } catch (error) {
      console.log(error)
      this.setState({ error: 'An unexpected error ocurred. Please try again later' })
    }
  }

  private handleSaveChangesClick = async () => {
    const { token, history, cls, onSave } = this.props
    const { grade, name } = this.state

    try {
      await updateClass(token, {
        _id: cls._id,
        classCode: cls.classCode,
        grade,
        name,
      })

      onSave()
      
      history.goBack()

    } catch (error) {
      console.log(error)
      this.setState({ error: 'An unexpected error ocurred. Please try again later' })
    }
  }

  private handleCancelClick = () => {
    this.props.history.goBack()
  }
  
  private handleChange = (e: any) => {
    const { value, name } = e.target

    const state = { error: '' }
    state[name] = value

    this.setState(state)
  }
}