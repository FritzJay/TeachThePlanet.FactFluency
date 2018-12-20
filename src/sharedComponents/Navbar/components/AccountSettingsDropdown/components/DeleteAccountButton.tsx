import * as React from 'react'
import { gql } from 'apollo-boost'
import { Mutation, ApolloConsumer } from 'react-apollo'
import { withRouter, RouteComponentProps } from 'react-router'

import { clearCached } from 'src/utils'
import { ConfirmButton } from 'src/sharedComponents'

interface IProps extends RouteComponentProps<{}> {
  userId: string
}

const DeleteAccountButtonWithRouter = ({ history, userId }: IProps) => (
  <ApolloConsumer>
    {client => (
      <Mutation
        mutation={gql`
          mutation deleteUserById($input: DeleteUserByIdInput!) {
            deleteUserById(input: $input) {
              user {
                nodeId
                id
              }
            }
          }
        `}
        onCompleted={() => {
          history.push('/index')
          client.clearStore()
          clearCached()
        }}
      >
        {(deleteAccount) => (
          <ConfirmButton
            onClick={() => deleteAccount({ variables: { input: { id: userId } }})}
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