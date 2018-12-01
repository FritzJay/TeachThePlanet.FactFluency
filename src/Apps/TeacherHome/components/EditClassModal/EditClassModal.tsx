import * as React from 'react'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'

import { IClass } from 'src/utils'
import { Input, Loading, Modal, ModalContent, ModalHeader } from 'src/sharedComponents'
import { ConfirmButton } from 'src/sharedComponents/Button/Button'
import { QUERY } from '../../TeacherHome'
import './EditClassModal.css'

const GET_COURSE = gql`
  query course($id: ObjID!) {
    course(id: $id) {
      id
      name
      grade
    }
  }
`

const UPDATE_COURSE = gql`
  mutation updateCourse($id: ObjID!, $input: UpdateCourseInput!) {
    updateCourse(id: $id, input: $input) {
      id
      code
      grade
      name
    }
  }
`

const REMOVE_COURSE = gql`
  mutation removeCourse($id: ObjID!) {
    removeCourse(id: $id)
  }
`

export const EditClassModalWithData = (props: RouteComponentProps<{ id: string }>) => (
  <Query
    query={GET_COURSE}
    variables={{ id: props.match.params.id }}
  >
    {({ error: getCourseError, loading: getCourseLoading, data: getCourseData }) => {
      if (getCourseLoading) {
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
      if (getCourseError) {
        return (
          <Modal
            overlay={true}
            closeTo="GO_BACK"
            className="EditClassModal"
          >
            <h3 className="error">{getCourseError.message}</h3>
          </Modal>
        )
      }

      return (
        <Mutation mutation={UPDATE_COURSE}>
          {updateCourse => (
            <Mutation
              mutation={REMOVE_COURSE}
              refetchQueries={() => [{ query: QUERY }]}
              variables={{ id: props.match.params.id }}
            >
              {removeCourse => (
                <EditClassModal
                  {...props}
                  course={getCourseData.course}
                  removeCourse={removeCourse}
                  updateCourse={updateCourse}
                />
              )}
            </Mutation>
          )}
        </Mutation>
      )
    }}
  </Query>
)


interface IProps extends RouteComponentProps<{ id: string }> {
  course: IClass
  removeCourse: () => void
  updateCourse: ({ variables: { name, grade }}: any) => void
}

interface IState {
  name?: string
  grade?: string
}

class EditClassModal extends React.Component<IProps, IState> {
  public state: IState = {
    grade: this.props.course.grade,
    name: this.props.course.name,
  }

  public render() {
    const { course } = this.props
    const { name, grade } = this.state

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
              placeholder={course.name}
              value={name}
              onChange={this.handleChange}
            />

          </div>

          <div className="btn-row">
            <ConfirmButton
              className="red delete-class"
              confirmClassName="confirm"
              disableTimeout={2000}
              onClick={this.handleDeleteClick}
            >
              <span className="default">Delete Class</span>
              <span className="confirmation">Are you sure?</span>
            </ConfirmButton>

            <ConfirmButton
              className="green save-changes"
              confirmClassName="confirm"
              disableTimeout={2000}
              onClick={this.handleSaveChangesClick}
            >
              <span className="default">Save Changes</span>
              <span className="confirmation">Are you sure?</span>
            </ConfirmButton>
          </div>
          
        </ModalContent>
      </Modal>
    )
  }
  
  private handleDeleteClick = () => {
    this.props.history.push('/teacher')
    this.props.removeCourse()
  }

  private handleSaveChangesClick = async () => {
    const { history, updateCourse, match } = this.props
    const { name, grade } = this.state
    history.goBack()
    updateCourse({ variables: {
      id: match.params.id,
      input: {
        name,
        grade,
      }
    }})
  }
  
  private handleChange = (e: any) => {
    const { value, name } = e.target
    const state = {}
    state[name] = value
    this.setState(state)
  }
}
