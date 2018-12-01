import * as React from 'react'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import { Link, RouteComponentProps, Redirect } from 'react-router-dom'

import { Modal, ModalHeader, ModalContent, Button, Loading, Input } from '..'
import './UpdateStudentModal.css'

const UPDATE_NEW_STUDENT = gql`
  mutation updateNewStudent($input: UpdateNewStudentInput!) {
    updateNewStudent(input: $input) {
      id
      name
      createdAt
      updatedAt
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
        email
      }
    }
  }
`

interface IProps extends RouteComponentProps {
  dispatch: any
  email: string
  password: string
  secondPassword: string
  onChange: (e: any) => void
}

interface IState {
  error: string
  loading: boolean
}

export class UpdateStudentModal extends React.Component<IProps, IState> {
  public state: IState = {
    error: '',
    loading: false,
  }

  public componentDidMount() {
    this.props.onChange({
      target: {
        name: 'password',
        value: '',
      }
    })
  }

  public render() {
    const { email, password, secondPassword, onChange } = this.props
    
    if (email === '') {
      return <Redirect to="/index/login" />
    }

    return (
      <Mutation mutation={UPDATE_NEW_STUDENT}>
        {(mutate, { error, loading }) => {
          if (loading) {
            return (
              <Modal
                overlay={true}
                className="UpdateStudentModal"
              >
                <ModalHeader className="header">
                  <h1>Update Your Password</h1>
                </ModalHeader>

                <ModalContent className="inputs">
                  <Loading className="loading" />
                </ModalContent>
              </Modal>
            )
          }
          return (
            <Modal
              overlay={true}
              className="UpdateStudentModal"
            >
              <ModalHeader className="header">
                <h1>Update Your Password</h1>
              </ModalHeader>
      
              <ModalContent className="inputs">
                {error ? <p className="error active">{error.message}</p> : null}
      
                <Input
                  onChange={onChange}
                  value={password}
                  name="password"
                  placeholder="Password"
                  type="password"
                />
      
                <Input
                  onChange={onChange}
                  value={secondPassword}
                  name="secondPassword"
                  placeholder="Verify password"
                  type="password"
                />
              </ModalContent>
      
              <ModalContent className="bottom-buttons">
                <Button
                  className="signup-modal-button gray"
                  onClick={() => this.handleChangePassword(mutate)}
                >
                  Change Password
                </Button>
      
                <Link to='/index/login'>
                  <Button className="red cancel-button">
                    Cancel
                  </Button>
                </Link>
              </ModalContent>
            </Modal>
          )
        }}
      </Mutation>
    )
  }

  private handleChangePassword = async (mutate: any) => {
    const { email, history, password, secondPassword } = this.props

    if (password === '') {
      this.setState({ error: 'Please enter a password' })
      return
    }

    if (secondPassword === '') {
      this.setState({ error: 'Please confirm your password' })
      return
    }

    if (password !== secondPassword) {
      this.setState({ error: 'Passwords do not match' })
      return
    }

    mutate({ variables: { email, password }})
    history.push('/fact-fluency')
  }
}
