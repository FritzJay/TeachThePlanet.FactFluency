import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Input, Modal, ModalContent, ModalHeader } from '../../../../../../Components/Components';
import './NewClassModal.css';

interface IProps extends RouteComponentProps<{}> {}

interface IState {
  grade: string
  name: string
}

export class NewClassModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      grade: '',
      name: '',
    }

    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  public render() {
    const { name, grade } = this.state

    return (
      <Modal className="new-class-modal">

        <ModalHeader className="modal-header">
          <h2>New Class</h2>
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

            <label className="label">Class Name</label>

            <Input
              name="name"
              className="class-name"
              placeholder="e.g. Homeroom"
              value={name}
              onChange={this.handleChange}
            />
          </div>

          <div className="btn-row">
            <Button
              className="cancel"
              onClick={this.handleCancelClick}
            >
              Cancel
            </Button>

            <Button className="create-class">Create Class</Button>
          </div>

        </ModalContent>
      </Modal>
    );
  }

  private handleCancelClick() {
    this.props.history.goBack()
  }

  private handleChange(e: any) {
    const { value, name } = e.target

    const state = {}
    state[name] = value

    this.setState(state)
  }
}