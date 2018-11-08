import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { createClass } from 'src/lib/Api/Classes'
import { Button, Input, Modal, ModalContent, ModalHeader } from 'src/sharedComponents'
import './NewClassModal.css'

interface IProps extends RouteComponentProps<{}> {
  token: string
  onSave: () => void
}

interface IState {
  error: string
  grade: string
  name: string
}

export class NewClassModal extends React.Component<IProps, IState> {
  public state = {
    error: '',
    grade: 'kindergarten',
    name: '',
  }

  public render() {
    const { error, name, grade } = this.state

    return (
      <Modal
        overlay={true}
        className="NewClassModal"
      >

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

          {error !== '' && <p className="error">{error}</p>}

          <div className="buttons">
            <Button
              className="create-class"
              onClick={this.handleCreateClassClick}
            >
              Create Class
            </Button>

            <Button
              className="cancel"
              onClick={this.handleCancelClick}
            >
              Cancel
            </Button>
          </div>

        </ModalContent>
      </Modal>
    )
  }

  private handleCreateClassClick = async () => {
    const { token, history, onSave } = this.props
    const { grade, name } = this.state
    
    if (grade === '' || name === '') {
      this.setState({ error: 'Grade and name are required' })
      return
    }

    try {
      await createClass(token, grade, name)

      onSave()

      history.push('/classes')

    } catch (error) {
      console.log(error)
      this.setState({ error: 'An unexpected error ocurred. Please try again later' })
    }
  }

  private handleCancelClick = () => {
    this.props.history.push('/classes')
  }

  private handleChange = (e: any) => {
    const { value, name } = e.target

    const state = { error: '' }
    state[name] = value

    this.setState(state)
  }
}