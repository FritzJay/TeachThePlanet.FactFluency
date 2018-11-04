import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button } from 'src/Components/Button/Button'
import { Input, Modal, ModalContent, ModalHeader } from '../../../../../../Components/Components'
import { deleteClass, updateClass } from '../../../../../../lib/Api';
import { IClass } from '../../../../../../lib/Interfaces'
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
  constructor(props: IProps) {
    super(props)
    
    const { grade='', name='' } = this.props.cls

    this.state = {
      error: '',
      grade,
      name,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleSaveChangesClick = this.handleSaveChangesClick.bind(this)
  }

  public render() {
    const { cls } = this.props
    const { name, grade } = this.state

    return (
      <Modal
        overlay={true}
        className="edit-class-modal"
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

          <div className="buttons">

            <Button
              className="delete-class"
              onClick={this.handleDeleteClick}
            >
              Delete Class
            </Button>

            <Link to={'/classes'}>
              <Button className="cancel">Cancel</Button>
            </Link>

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
  
  private async handleDeleteClick() {
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

  private async handleSaveChangesClick() {
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
      
      history.push('/classes')

    } catch (error) {
      console.log(error)
      this.setState({ error: 'An unexpected error ocurred. Please try again later' })
    }
  }
  
  private handleChange(e: any) {
    const { value, name } = e.target

    const state = { error: '' }
    state[name] = value

    this.setState(state)
  }
}