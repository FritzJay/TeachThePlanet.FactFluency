import * as React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { RouteComponentProps, withRouter } from 'react-router'

import { Button } from 'src/sharedComponents'
import { clearCached } from 'src/utils'

const LogoutButtonWithRouter = ({ history }: RouteComponentProps) => (
  <ApolloConsumer>
    {client => (
      <Button
        onClick={() => {
          history.push('/index')
          client.clearStore()
          clearCached()
        }}
      >
        Logout
      </Button>
    )}
  </ApolloConsumer>
)

export const LogoutButton = withRouter(LogoutButtonWithRouter)