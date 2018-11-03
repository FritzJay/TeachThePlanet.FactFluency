import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button } from 'src/Components/Button/Button'
import { Input, Modal, ModalContent, ModalHeader } from '../../../../../../Components/Components'
import { IClass } from '../../../../../../lib/Interfaces'
import './EditClassModal.css'

interface IProps extends RouteComponentProps<{}> {
  cls: IClass
}

interface IState {
  name: string
  grade: string
}

export class EditClassModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      grade: '',
      name: '',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  public render() {
    const { cls } = this.props
    const { name, grade } = this.state

    return (
      <Modal className="edit-class-modal">

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

            <Button className="delete-class">Delete Class</Button>

            <Link to={'/classes'}>
              <Button className="cancel">Cancel</Button>
            </Link>

            <Button className="save-changes">Save Changes</Button>
          </div>

        </ModalContent>
      </Modal>
    )
  }

  private handleChange(e: any) {
    const { value, name } = e.target

    const state = {}
    state[name] = value

    this.setState(state)
  }
}