import * as React from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { removeTest, removeTestResults } from 'src/actions/factFluency';
import { handleReceiveTest } from 'src/handlers/factFluency';
import { ITest } from 'src/utils'
import { Button, Card, Loading } from 'src/sharedComponents'
import './StartTest.css'

interface IProps extends RouteComponentProps<{}> {
  dispatch: any
  newTestParameters: {
    num: number
    operator: string
  }
  test: ITest
  token: string
}

interface IState {
  error: string
}

const encouragingTexts = ['We know you got this!', 'Keep calm and rock this test!', 'You can do it!']

export class DisconnectedStartTest extends React.Component<IProps, IState> {
  public state: IState = { error: '' }

  public async componentDidMount() {
    const { dispatch, newTestParameters, token } = this.props

    try {
      await dispatch(handleReceiveTest(token, newTestParameters))
      this.setState({ error: '' })

    } catch (error) {
      this.setState({ error: error.toString() })
    }
  }

  public render() {
    if (this.state.error !== '') {
      return (
        <div className="StartTest">
          <h1 className="error">{this.state.error}</h1>
          <h2 className="error">Please Try Again Later</h2>
        </div>
      )
    }

    if (this.props.test === undefined || this.props.test === null) {
      return (
        <div className="StartTest">
          <Loading className="loading" />
        </div>
      )
    }

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
    this.props.history.push('/fact-fluency/')
  }
}

const mapStateToProps = ({ factFluency, user }: any) => ({
  newTestParameters: factFluency.newTestParameters,
  test: factFluency.test,
  token: user.token,
})

export const StartTest = connect(mapStateToProps)(DisconnectedStartTest)