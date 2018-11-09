import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { fetchTestResults } from 'src/lib/Api/Tests'
import { Button, Card } from 'src/sharedComponents'
import { IQuestion, ITest, ITestResults } from '../../../../lib/Interfaces'
import { padString } from '../../../../lib/Utility/Utility'
import './TestResults.css'

interface IQuickestCardProps {
  question?: IQuestion
}

const QuickestCard = ({ question }: IQuickestCardProps) => {
  if (question && question.start && question.end) {
    const durationInSeconds = (new Date(question.end).getTime() - new Date(question.start).getTime()) / 1000
    
    return (
      <Card className="QuickestCard">
        <div className="header">
          <p>You Rocked This Problem!</p>
        </div>
        <div className="card-main-content">
          <h3>{question.question} = {question.correctAnswer}</h3>
          <p className="breakdown-text">It only took you {durationInSeconds} second.</p>
        </div>
      </Card>
    )
  } else {
    return null
  }
}


interface IIncorrectCardProps {
  question?: IQuestion
}

const IncorrectCard = ({ question }: IIncorrectCardProps) => {
  if (question) {
    const youAnsweredMessage = question.studentAnswer ? `You answered ${question.studentAnswer}` : 'You didn\'t answer this question'

    return (
      <Card className="IncorrectCard">
        <div className="header">
          <p>This Gave You Some Trouble.</p>
        </div>
        <div className="card-main-content">
            <h3>{question.question} = {question.correctAnswer}</h3>
            <h3>{youAnsweredMessage}</h3>
            <p className="breakdown-text">Hint: It might be a good idea to practice this one.</p>
        </div>
      </Card>
    )
  } else {
    return null
  }
}


interface IProps extends RouteComponentProps<{}> {
  test: ITest
  token: string
  storeTestResults: (testResults: ITestResults) => void
}

interface IState {
  error: string
  testResults?: ITestResults
}

export class TestResults extends React.Component<IProps, IState> {
  public state: IState = {
    error: ''
  }

  public async componentDidMount() {
    const { test, token, storeTestResults } = this.props

    try {
      const testResults = await fetchTestResults(token, test)
      
      storeTestResults(testResults)

      this.setState({
        error: '',
        testResults,
      })

    } catch(error) {
      this.setState({ error })
    }
  }

  public render() {
    if (this.state.testResults === undefined) {
      return <p>Loading...</p>
    }
    const { correct, needed, total, quickest, incorrect } = this.state.testResults

    return (
      <div className="TestResults">
        <h1 className="amount-correct-text">
          You got <span className={correct >= needed ? 'pass' : 'fail'}>{padString(correct, 2, '\xa0')}</span> out of <span className="pass">{padString(total, 2, '\xa0')}</span> correct!
        </h1>

        <p>Remember you need {needed}/{total} to pass.</p>

        <div className="cards-container">
          <QuickestCard question={quickest} />
          <IncorrectCard question={incorrect} />
        </div>

        <div className="buttons-container">
          <Button className="blue" onClick={this.handleRetryClick}>
            <span className="btn-text">Retry</span>
            <span className="btn-icon">
              <i className="material-icons">replay</i>
            </span>
          </Button>

          <Button className="blue" onClick={this.handleHomeClick}>
            <span className="btn-text">Home</span>
            <span className="btn-icon">
              <i className="material-icons">home</i>
            </span>
          </Button>
        </div>
      </div>
    )
  }

  private handleRetryClick = () => {
    localStorage.removeItem('testResults')
    this.props.history.replace('/fact-fluency/start-test')
  }

  private handleHomeClick = () => {
    localStorage.removeItem('testResults')
    this.props.history.push('/fact-fluency')
  }
}