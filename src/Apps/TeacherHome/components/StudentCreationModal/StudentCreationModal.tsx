import * as React from 'react'
import { gql, ApolloClient } from 'apollo-boost'
import { graphql, compose, ApolloConsumer } from 'react-apollo'
import { RouteComponentProps } from 'react-router'

import { Modal, ModalHeader, ModalContent, Input, Button, Loading, DisableButton } from 'src/sharedComponents'
import { StudentCreationCard } from './StudentCreationCard'
import { IClass } from 'src/utils'
import { GET_COURSE as GET_FULL_COURSE } from '../ClassDetail/ClassDetail'
import './StudentCreationModal.css'

interface IProps extends RouteComponentProps<{ id: string }> {
  data: {
    loading: boolean
    error: Error
    course: IClass
  }
  mutate: any
}

interface INewStudent {
  username: string,
  password: string,
}

interface IState {
  students: {
    [id: string]: INewStudent
  }
  name: string
  error: string
}

class StudentCreationModal extends React.Component<IProps, IState> {
  public state: IState = {
    name: '',
    error: '',
    students: {}
  }

  public render() {
    const { name, students } = this.state
    const { data: { error, loading } } = this.props

    if (loading) {
      return (
        <Modal
          overlay={true}
          className="StudentCreationModal"
        >
          <Loading className="loading" />
        </Modal>
      )
    }

    return (
      <ApolloConsumer>
        {client => (
          <Modal
            overlay={true}
            className="StudentCreationModal"
          >
            <ModalHeader className="header">
              <h1>Create Accounts</h1>

              <Button onClick={this.closeModal} className="close-modal-button white">
                <i className="material-icons">clear</i>
              </Button>
            </ModalHeader>

            <ModalContent className="content">
              <h3 className="sub-header">Type in your students' names.</h3>
              {error || this.state.error
                ? <p className="error">{this.state.error || (error && error.message)}</p>
                : null
              }
              <label className="label" htmlFor="studentInput">
                Enter a first name and last initial.
              </label>
              <Input
                className="input" 
                name="studentInput"
                placeholder="Fritz J"
                onChange={this.handleChange}
                value={name}
              />
              <Button
                className="blue add-button"
                onClick={() => this.handleAddStudent(client)}
              >
                Add
              </Button>
              <div className="student-list">
                {Object.keys(students).length > 0
                  ? (
                    <div className="student-card example">
                      <h4 className="username">Username</h4>
                      <h4 className="password">Password</h4>
                      <h4 className="remove">Remove</h4>
                    </div>
                  ) : null}
                {Object.keys(students).map(id => (
                  <StudentCreationCard
                    key={id}
                    name={id}
                    password={students[id].password}
                    username={students[id].username}
                    onPasswordChange={this.handlePasswordChange}
                    onUsernameChange={this.handleUsernameChange}
                    onDelete={this.handleRemoveStudent}
                  />
                ))}
              </div>
              <Button
                className="gray back-button"
                onClick={this.handleBack}
              >
                Back
              </Button>
              <DisableButton
                className="green create-button"
                duration={2000}
                onClick={this.handleCreateAccounts}
              >
                Create Accounts
              </DisableButton>
            </ModalContent>
          </Modal>
        )}
      </ApolloConsumer>
    )
  }

  private handleAddStudent = async (client: ApolloClient<any>) => {
    const { name, students } = this.state

    const splitName = name.split(' ')

    this.setState({ error: '' })

    if (name === '') {
      this.setState({ error: 'First name and last initial are required' })
      return
    }

    
    if (splitName.length < 2) {
      this.setState({ error: 'Both first name and last initial are required' })
      return
    }
    
    if (splitName.length > 2) {
      this.setState({ error: 'Please enter first name and last initial only' })
      return
    }

    if (splitName[1] === '') {
      this.setState({ error: 'Both first name and last initial are required' })
      return
    }
    
    const displayName = this.getDisplayName(name)
    
    if (Object.keys(students).includes(displayName)) {
      this.setState({ error: `You have already added ${displayName} to the list of invitations` })
      return
    }

    const username = await this.getUsername(name, client);

    this.setState(prevState => ({
      students: {
        ...prevState.students,
        [displayName]: {
          username,
          password: this.props.data.course.code,
        },
      },
      name: '',
      error: '',
    }))
  }
  
    private handleRemoveStudent = (student: string) => {
      this.setState(prevState => {
        const newStudents = { ...prevState.students }
        delete newStudents[student]
        return {
          students: newStudents,
          error: '',
        }
      })
    }

  private handleChange = (e: any) => {
    const value = e.target.value
    this.setState({ name: value })
  }

  private handlePasswordChange = (id: string, password: string) => {
    this.setState(prevState => ({
      students: {
        ...prevState.students,
        [id]: {
          ...prevState.students[id],
          password,
        },
      }
    }))
  }

  private handleUsernameChange = (id: string, username: string) => {
    this.setState(prevState => ({
      students: {
        ...prevState.students,
        [id]: {
          ...prevState.students[id],
          username,
        },
      }
    }))
  }

  private handleCreateAccounts = async () => {
    const { students } = this.state

    if (Object.keys(students).length === 0) {
      this.setState({ error: 'At least one student is required' })
      return
    }

    const { match, history } = this.props
    
    try {
      await Promise.all(Object.keys(students).map(async (id) => {
        await this.props.mutate({
          variables: {
            input: {
              courseId: match.params.id,
              name: this.getDisplayName(id),
              user: {
                username: students[id].username,
                password: students[id].password,
                firstName: this.getFirstName(id),
                lastName: this.getLastInitial(id),
              }
            }
          }
        })
      }))
    } catch (error) {
      if (error.message === 'GraphQL error: A user with the username "FritzJ@Homeroom" already exists') {
        this.setState({ error: 'A user with the username "FritzJ@Homeroom" already exists' })
        return
      } else {
        throw error
      }
    }

    history.push(`/teacher/class-detail/${this.props.match.params.id}`)
  }

  private handleBack = () => {
    this.props.history.goBack()
  }

  private getDisplayName = (name: string): string => {
    return `${this.getFirstName(name)} ${this.getLastInitial(name)}`
  }

  private getUsername = async (name: string, client: any): Promise<string> => {
    const firstName = this.getFirstName(name)
    const lastName = this.getLastInitial(name)
    const { data }: any = await client.query({
      query: GET_UNIQUE_USERNAME,
      variables: {
        firstName,
        lastName,
        courseName: this.props.data.course.name,
      }
    })
    return data.uniqueUserName
  }

  private getFirstName = (name: string): string => {
    const firstName = name.split(' ')[0]
    return firstName[0].toUpperCase() + firstName.slice(1, firstName.length)
  }

  private getLastInitial = (name: string): string => {
    return name.split(' ')[1][0].toUpperCase()
  }

  private closeModal = () => {
    this.props.history.push(`/teacher/class-detail/${this.props.match.params.id}`)
  }
}

const GET_COURSE = gql`
  query course($id: ObjID!) {
    course(id: $id) {
      id
      code
      name
      students {
        id
      }
    }
  }
`

const GET_UNIQUE_USERNAME = gql`
  query uniqueUserName($firstName: String!, $lastName: String!, $courseName: String!) {
    uniqueUserName(firstName: $firstName, lastName: $lastName, courseName: $courseName)
  }
`

const CREATE_PENDING_STUDENT = gql`
  mutation createAccountForStudent($input: CreateAccountForStudentInput!) {
    createAccountForStudent(input: $input) {
      id
      name
      createdAt
      updatedAt
      changePasswordRequired
      tests {
        id
        number
        operator
        start
        end
        testResults {
          id
          total
          needed
          correct
          createdAt
        }
      },
      user {
        id
        email
        username
      }
      courses {
        id
      }
    }
  }
`

export const StudentCreationModalWithData = compose(
  graphql(GET_COURSE, {
    options: ({ match }: any) => ({
      variables: {
        id: match.params.id
      }
    })
  }),
  graphql(CREATE_PENDING_STUDENT, {
    options: ({ match }: any) => ({
      update: (cache, { data: { createAccountForStudent } }: any) => {
        const { course }: any = cache.readQuery({
          query: GET_FULL_COURSE,
          variables: { id: match.params.id }
        })
        cache.writeQuery({
          query: GET_FULL_COURSE,
          data: {
            course: {
              ...course,
              students: course.students.concat([createAccountForStudent])
            }
          }
        })
      }
    })
  }),
)(StudentCreationModal)