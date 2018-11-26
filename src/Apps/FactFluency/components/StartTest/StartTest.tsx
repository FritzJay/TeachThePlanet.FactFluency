import * as React from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { removeTest, removeTestResults } from 'src/actions/factFluency';
import { ITest } from 'src/utils'
import { Button, Card } from 'src/sharedComponents'
import './StartTest.css'

interface IProps extends RouteComponentProps<{}> {
  test: ITest
  dispatch: any
}

const encouragingTexts = ['We know you got this!', 'Keep calm and rock this test!', 'You can do it!']

export class DisconnectedStartTest extends React.Component<IProps> {
  public render() {
    const headerText = encouragingTexts[Math.floor(Math.random() * encouragingTexts.length)]

    return (
      <Card className="StartTest">
        <div className="header">
          <h1>{headerText}</h1>
        </div>
        <div className="buttons">
          <Button
            className="green"
            autoFocus={true}
            onClick={this.handleSubmit}
          >
            Start Test
          </Button>

          <Button
            className="cancel-button"
            onClick={this.handleCancel}
          >
            Cancel
          </Button>
        </div>
      </Card>
    )
  }

  private handleSubmit = () => {
    this.props.dispatch(removeTestResults())
    this.props.history.push('/fact-fluency/take-test')
  }

  private handleCancel = () => {
    this.props.dispatch(removeTest())
    this.props.history.push('/fact-fluency')
  }
}

const mapStateToProps = ({ factFluency, user }: any) => ({
  test: factFluency.test
})

export const StartTest = connect(mapStateToProps)(DisconnectedStartTest)