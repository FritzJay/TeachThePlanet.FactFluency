import * as React from 'react'
import gql from 'graphql-tag'
import { ApolloConsumer, Mutation } from 'react-apollo'

import { Button, Card } from 'src/sharedComponents'
import { Link } from 'react-router-dom'
import './StartTest.css'

const ENCOURAGING_TEXT = ['We know you got this!', 'Keep calm and rock this test!', 'You can do it!']

const REMOVE_TEST = gql`
  mutation removeTest($id: ObjID!) {
    removeTest(id: $id)
  }
`

export const StartTest = ({ testId }: { testId: string }) => (
  <ApolloConsumer>
    {client => (
      <Card className="StartTest">
        <div className="header">
          <h1>{ENCOURAGING_TEXT[Math.floor(Math.random() * ENCOURAGING_TEXT.length)]}</h1>
        </div>
        <div className="buttons">
          <Link to="/fact-fluency/take-test">
            <Button
              className="green"
              autoFocus={true}
            >
              Start Test
            </Button>
          </Link>
          <Link to="/fact-fluency">
            <Mutation mutation={REMOVE_TEST}>
              {removeTest => (
                <Button
                  className="cancel-button"
                  onClick={() => {
                    removeTest({
                      variables: {
                        id: testId
                      }
                    })
                    client.writeData({ data: { testId: null } })
                  }}
                >
                  Cancel
                </Button>
              )}
            </Mutation>
          </Link>
        </div>
      </Card>
    )}
  </ApolloConsumer>
)
