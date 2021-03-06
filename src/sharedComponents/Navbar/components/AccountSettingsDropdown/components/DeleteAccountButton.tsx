import * as React from 'react'
import { gql } from 'apollo-boost'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { withRouter, RouteComponentProps } from 'react-router'

import { clearCached } from 'src/utils'
import { ConfirmButton } from 'src/sharedComponents'

const DELETE_STUDENT = gql`
  mutation removeStudent {
    removeStudent
  }
`

const DELETE_TEACHER = gql`
  mutation removeTeacher {
    removeTeacher
  }
`

interface IProps extends RouteComponentProps<{}> {
  userId: string
  role: string
}

const DeleteAccountButtonWithRouter = ({ history, userId, role }: IProps) => (
  <ApolloConsumer>
    {client => (
      <Mutation
        mutation={role.toLowerCase() === 'teacher' ? DELETE_TEACHER : DELETE_STUDENT}
        onCompleted={() => {
          history.push('/index')
          client.clearStore()
          clearCached()
        }}
      >
        {(deleteAccount) => (
          <ConfirmButton
            onClick={() => deleteAccount({ variables: { id: userId }})}
            className="delete-button"
            confirmClassName="confirm"
          >
            <span className="default">Delete Account</span>
            <span className="confirmation">Are you sure?</span>
          </ConfirmButton>
        )}
      </Mutation>
    )}
  </ApolloConsumer>
)

export const DeleteAccountButton = withRouter(DeleteAccountButtonWithRouter)