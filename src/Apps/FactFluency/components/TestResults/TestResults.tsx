/* tslint:disable:jsx-no-lambda */

import * as React from 'react'
import { Mutation } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

import { removeTest, removeTestResults, receiveTest } from 'src/actions/factFluency'
import { IQuestion, ITestResults, getOperatorSymbol } from 'src/utils'
import { Button, Card, Loading } from 'src/sharedComponents'
import { CREATE_TEST } from '../SelectTest/SelectTest'
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
          <h3>You Rocked This Problem!</h3>
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
          <h3>This Gave You Some Trouble.</h3>
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
  studentId: string
  courseId: string
  operator: string
  number: number
  testResults: ITestResults
  dispatch: any
}

class DisconnectedTestResults extends React.Component<IProps> {
  public render() {
    const { operator, number: num } = this.props
    const { correct, needed, total, quickest, incorrect } = this.props.testResults

    return (
      <Mutation
        mutation={CREATE_TEST}
        onCompleted={({ createTest }) => {
          this.props.dispatch(removeTestResults())
          this.props.dispatch(receiveTest(createTest))
          this.props.history.push('/fact-fluency/start-test')
        }}
      >
        {(createTest, { loading, error }: any ) => {
          if (loading) {
            return (
              <div className="TestResults">
                <Loading className="loading" />
              </div>
            )
          }

          if (error) {
            return (
              <div className="TestResults">
                <h3 className="error">{error}</h3>
              </div>
            )
          }

          return (
            <div className="TestResults">
              <h1 className="header">{`You ${correct >= needed ? 'passed' : 'did not pass'} your ${getOperatorSymbol(operator)} ${num}s`}</h1>

              <h2 className="subheader">
                You got <span className={correct >= needed ? 'pass' : 'fail'}>{correct}</span> out of <span className="pass">{total}</span> correct!
              </h2>

              <p className="detail">Remember you need {needed}/{total} to pass.</p>

              <QuickestCard question={quickest} />

              <IncorrectCard question={incorrect} />

              <hr />

              <Button className="blue retry" onClick={() => createTest({
                variables: {
                  input: {
                    number: num,
                    operator,
                    studentId: this.props.studentId,
                    courseId: this.props.courseId,
                  }
                }
              })}>
                <span className="btn-text">Retry</span>
                <span className="btn-icon">
                  <i className="material-icons">replay</i>
                </span>
              </Button>

              <Button className="blue home" onClick={this.handleHomeClick}>
                <span className="btn-text">Home</span>
                <span className="btn-icon">
                  <i className="material-icons">home</i>
                </span>
              </Button>
            </div>
          )
        }}
      </Mutation>
    )
  }

  private handleHomeClick = () => {
    this.props.dispatch(removeTestResults())
    this.props.dispatch(removeTest())
    this.props.history.push('/fact-fluency')
  }
}

const mapStateToProps = ({ factFluency }: any) => ({
  studentId: factFluency.id,
  courseId: factFluency.activeClass,
  testResults: factFluency.testResults,
  number: factFluency.test
    ? factFluency.test.number
    : undefined,
  operator: factFluency.test
    ? factFluency.test.operator
    : undefined,
})

export const TestResults = connect(mapStateToProps)(DisconnectedTestResults)