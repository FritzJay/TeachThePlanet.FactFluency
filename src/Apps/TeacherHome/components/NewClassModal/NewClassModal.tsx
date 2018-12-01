import * as React from 'react'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { Button, Input, Loading, Modal, ModalContent, ModalHeader } from 'src/sharedComponents'
import { ClassCardQueryFragment } from '..'
import { QUERY } from '../../TeacherHome'
import './NewClassModal.css'

const CREATE_COURSE = gql`
  mutation createCourse($input: CreateCourseInput!) {
    createCourse(input: $input) {
      ...ClassCardQueryFragment
    }
  }
  ${ClassCardQueryFragment}
`

interface IProps extends RouteComponentProps<{}> {}

interface IState {
  grade: string
  error: string
  name: string
}

export class NewClassModal extends React.Component<IProps, IState> {
  public state = {
    grade: 'kindergarten',
    name: '',
    error: '',
  }

  public render() {
    return (
      <Mutation
        mutation={CREATE_COURSE}
        update={(cache, { data: { createCourse } }) => {
          const { teacher }: any = cache.readQuery({ query: QUERY })
          cache.writeQuery({
            query: QUERY,
            data: {
              teacher: {
                ...teacher,
                courses: teacher.courses.concat([createCourse])
              }
            }
          })
        }}
      >
        {(mutate, { loading, error }: any) => {
          if (loading) {
            return (
              <Modal
                overlay={true}
                closeTo="/teacher"
                className="NewClassModal"
              >
                <Loading className="loading" />
              </Modal>
            )
          }
          const { name, grade } = this.state

          return (
            <Modal
              overlay={true}
              closeTo="/teacher"
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

                {error || this.state.error !== '' && <p className="error">{error ? error.message : this.state.error}</p>}

                <div className="buttons">
                  <Button
                    className="create-class green"
                    onClick={() => this.handleCreateClassClick(mutate)}
                  >
                    Create Class
                  </Button>
                </div>

              </ModalContent>
            </Modal>
          )
        }}
      </Mutation>
    )
  }

  private handleCreateClassClick = async (mutate: any) => {
    const { history } = this.props
    const { grade, name } = this.state
    
    if (grade === '' || name === '') {
      this.setState({ error: 'Grade and name are required' })
      return
    }

    history.push('/teacher/classes')
    mutate({
      variables: {
        input: {
          grade,
          name,
        }
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