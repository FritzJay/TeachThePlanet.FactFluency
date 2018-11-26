import * as React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { RouteComponentProps } from 'react-router'

import { Button, Card } from 'src/sharedComponents'
import './StartTest.css'

const encouragingTexts = ['We know you got this!', 'Keep calm and rock this test!', 'You can do it!']

export const StartTest = ({ history }: RouteComponentProps) => {
  const headerText = encouragingTexts[Math.floor(Math.random() * encouragingTexts.length)]

  return (
    <ApolloConsumer>
      {client => (
        <Card className="StartTest">
          <div className="header">
            <h1>{headerText}</h1>
          </div>
          <div className="buttons">
            <Button
              className="green"
              autoFocus={true}
              onClick={() => {
                client.writeData({ data: { testResults: null } })
                history.push('/fact-fluency/take-test')
              }}
            >
              Start Test
            </Button>

            <Button
              className="cancel-button"
              onClick={() => {
                client.writeData({ data: { test } })
                history.push('/fact-fluency')
              }}
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}
    </ApolloConsumer>
  )
}
