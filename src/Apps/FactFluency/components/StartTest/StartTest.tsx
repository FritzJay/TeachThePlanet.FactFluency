import * as React from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { INewTestParameters, ITest } from 'src/lib/Interfaces';
import { handleReceiveTest, removeTest, removeTestResults } from 'src/redux/actions/factFluency';
import { Button, Card } from 'src/sharedComponents'
import './StartTest.css'

interface IProps extends RouteComponentProps<{}> {
  dispatch: any
  newTestParameters: INewTestParameters
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
    const { newTestParameters, token } = this.props
    try {
      this.props.dispatch(handleReceiveTest(token, newTestParameters))
      this.setState({ error: '' })
    } catch(error) {
      this.setState({ error })
    }
  }

  public render() {
    if (this.props.test === undefined || this.props.test === null) {
      return <p>Loading...</p>
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