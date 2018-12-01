import * as React from 'react'
import gql from 'graphql-tag'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { Mutation } from 'react-apollo'

import { IClass } from 'src/utils'
import { Input, Modal, ModalContent, ModalHeader } from 'src/sharedComponents'
import { ConfirmButton } from 'src/sharedComponents/Button/Button'
import { QUERY } from '../../TeacherHome'
import './EditClassModal.css'

export const EditClassModalQueryFragment = gql`
  fragment EditClassModalQueryFragment on Course {
    id
    name
    grade
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

interface IProps extends RouteComponentProps<{ id: string }> {
  courses: IClass[]
}

interface IState {
  name?: string
  grade?: string
}

export class EditClassModal extends React.Component<IProps, IState> {
  public state: IState = {
    grade: '',
    name: '',
  }

  public componentDidMount() {
    const course = this.props.courses.find((c) => c.id === this.props.match.params.id)
    this.setState({
      grade: course && course.grade,
      name: course && course.name,
    })
  }

  public render() {
    const { history } = this.props
    const { name, grade } = this.state
    const course = this.props.courses.find((c) => c.id === this.props.match.params.id)

    if (!course) {
      return <Redirect to="/teacher/classes" />
    }

    return (
      <Mutation mutation={UPDATE_COURSE}>
        {updateCourse => (
          <Mutation
            mutation={REMOVE_COURSE}
            variables={{ id: course.id }}
            update={cache => {
              const { teacher }: any = cache.readQuery({ query: QUERY })
              cache.writeQuery({
                query: QUERY,
                data: {
                  teacher: {
                    ...teacher,
                    courses: teacher.courses.filter((c: IClass) => c.id !== course.id)
                  }
                }
              })
            }}
          >
            {removeCourse => (
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
                      onClick={() => {
                        history.push('/teacher')
                        removeCourse()
                      }}
                    >
                      <span className="default">Delete Class</span>
                      <span className="confirmation">Are you sure?</span>
                    </ConfirmButton>

                    <ConfirmButton
                      className="green save-changes"
                      confirmClassName="confirm"
                      disableTimeout={2000}
                      onClick={() => {
                        history.goBack()
                        updateCourse({ variables: {
                          id: course.id,
                          input: {
                            name,
                            grade,
                          }
                        }})
                      }}
                    >
                      <span className="default">Save Changes</span>
                      <span className="confirmation">Are you sure?</span>
                    </ConfirmButton>
                  </div>
                </ModalContent>
              </Modal>
            )}
          </Mutation>
        )}
      </Mutation>
    )
  }
  
  private handleChange = (e: any) => {
    const { value, name } = e.target
    const state = {}
    state[name] = value
    this.setState(state)
  }
}
