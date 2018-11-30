import * as React from 'react'
import { ApolloConsumer } from 'react-apollo'

import { Button, Card } from 'src/sharedComponents'
import { Link } from 'react-router-dom'
import './StartTest.css'

const ENCOURAGING_TEXT = ['We know you got this!', 'Keep calm and rock this test!', 'You can do it!']

export const StartTest = () => (
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
            <Button
              className="cancel-button"
              onClick={() => {
                client.writeData({ data: { testId: null } })
              }}
            >
              Cancel
            </Button>
          </Link>
        </div>
      </Card>
    )}
  </ApolloConsumer>
)
