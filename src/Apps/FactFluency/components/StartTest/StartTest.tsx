import * as React from 'react'
import { fetchNewTest } from 'src/lib/Api/Tests';
import { ITest } from 'src/lib/Interfaces';
import { Button, Card } from 'src/sharedComponents'
import './StartTest.css'

interface IProps {
  testParameters: {
    operator: string
    number: number
  }
  token: string
  onSubmit: () => void
  onCancel: () => void
  storeTest: (test: ITest) => void
}

interface IState {
  error: string
  loading: boolean
}

const encouragingTexts = ['We know you got this!', 'Keep calm and rock this test!', 'You can do it!']

export class StartTest extends React.Component<IProps, IState> {
  public state: IState = {
    error: '',
    loading: true,
  }

  public async componentDidMount() {
    const { testParameters, token, storeTest } = this.props
    try {
      const test = await fetchNewTest(token, testParameters)
      storeTest(test)
      this.setState({ loading: false })

    } catch(error) {
      this.setState({ error })
    }
  }

  public render() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }

    const { onCancel, onSubmit } = this.props
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
            onClick={onSubmit}
          >
            Start Test
          </Button>

          <Button
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </Card>
    )
  }
}