import * as React from "react"
import { gql } from 'apollo-boost'
import { Mutation } from "react-apollo"
import { Redirect } from "react-router-dom"

import {
  initializeQuestions,
  randomizeQuestions,
  randomlyFlipQuestion,
  IQuestion,
  ITest,
} from 'src/utils'
import { getOperatorSymbol } from "src/utils"
import { Button, Card, Input, Loading } from "src/sharedComponents"
import { Keyboard } from './Keyboard/Keyboard'
import { TestResultsQueryFragment } from "../TestResults/TestResults"
import './TakeTest.css'

export const TakeTestQueryFragment = gql`
  fragment TakeTestQueryFragment on Test {
    id
    duration
    number
    operator
    randomQuestions
    start
    end
    questions {
      id
      question
      start
      end
    }
  }
`

export const TakeTestCacheFragment = `
  testId @client
`

const GRADE_TEST = gql`
  mutation gradeTest($id: ObjID!, $input: GradeTestInput!) {
    gradeTest(id: $id, input: $input) {
      ...TestResultsQueryFragment
    }
  }
  ${TestResultsQueryFragment}
`

interface IProps {
  test: ITest
}

interface IState {
  answer: string
  keyboard: boolean
  questionIndex: number
  questionStarted: number
  answeredQuestions: IQuestion[]
  originalQuestions: IQuestion[]
  redirectToTestResults: boolean
  redirectToFactFluency: boolean
}

export class TakeTest extends React.Component<IProps, IState> {
  public state: IState = {
    answer: '',
    keyboard: false,
    questionIndex: 0,
    redirectToTestResults: false,
    redirectToFactFluency: false,
    originalQuestions: [],
    answeredQuestions: [],
    questionStarted: new Date().getTime(),
  }

  private submitTestOnTimeout: any
  private gradeTest: any

  public componentDidMount() {
    const { test } = this.props

    if (test === null) {
      console.warn('Test was not found')
      this.setState({ redirectToFactFluency: true })
      return
    }

    const initializedQuestions = initializeQuestions(test.questions)
    this.setState({
      questionStarted: new Date().getTime(),
      originalQuestions: randomizeQuestions(initializedQuestions),
    })
    window.addEventListener('keydown', this.handleKeyDown)
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
    if (this.submitTestOnTimeout !== undefined) {
      clearTimeout(this.submitTestOnTimeout)
    }
  }

  public render() {
    const { answer, keyboard, redirectToTestResults, redirectToFactFluency, answeredQuestions, originalQuestions, questionIndex } = this.state

    if (redirectToTestResults) {
      return <Redirect to="/fact-fluency/test-results" />
    }

    if (redirectToFactFluency) {
      return <Redirect to="/fact-fluency" />
    }

    const question = originalQuestions[questionIndex]

    if (question) {
      const { operator, top, bottom } = randomlyFlipQuestion(question, answeredQuestions.length)
      const displayOperator = getOperatorSymbol(operator)
      return (
        <Mutation mutation={GRADE_TEST}>
          {gradeTest => {
            this.gradeTest = gradeTest
            return (
              <Card className={`TakeTest ${keyboard ? 'active-keyboard': ''}`}>
                <div className="question-problem">
                  <p className="number-top">{top}</p>
                  <p className="operator">{displayOperator}</p>
                  <p className="number-bottom">{bottom}</p>
                  <p className="equals">=</p>
                  <Input type="text" dir="rtl" className="input-answer" value={answer} readOnly={true} />
                </div>
                <div className="button-container">
                    <Button className="green submit-button" onClick={this.handleSubmitClick}>Submit</Button>
                </div>
                <Keyboard
                  onDeleteClick={this.handleDeleteClick}
                  onSubmitClick={this.handleSubmitClick}
                  onNumberClick={this.handleNumberClick}
                  onToggle={this.handleKeyboardToggle}
                />
              </Card>
            )
          }}
        </Mutation>
      )
    } else {
      return (
        <div className="TakeTest">
          <Loading className="loading" />
        </div>
      )
    }
  }

  private handleKeyDown = (event: any) => {
    switch (event.key) {
      case 'Backspace':
        event.preventDefault()
        this.handleDeleteClick()
        return
      case 'Delete':
        this.handleDeleteClick()
        return
      case 'Enter':
        event.preventDefault()
        this.handleSubmitClick()
        return
      default:
        break
    }

    const num = parseInt(event.key, 10)
    if (!isNaN(num)) {
      this.handleNumberClick(num)
    }
  }

  private handleKeyboardToggle = () => {
    this.setState((prevState: IState) => ({
      keyboard: !prevState.keyboard
    }))
  }

  private handleDeleteClick = () => {
    this.setState((prevState: IState) => ({
      answer: prevState.answer.slice(0, -1)
    }))
  }

  private handleNumberClick = (num: number) => {
    if (this.state.answer.length < 3) {
      this.setState((prevState) => ({
        answer: prevState.answer + num
      }))
    }
  }

  private handleSubmitClick = () => {
    const { questionIndex, originalQuestions, answeredQuestions } = this.state
    const answeredQuestion = this.answerCurrentQuestion()
    const nextQuestionIndex = questionIndex + 1
    this.setState({
      answer: '',
      questionStarted: new Date().getTime(),
      questionIndex: nextQuestionIndex,
      answeredQuestions: answeredQuestions.concat([answeredQuestion]),
    }, () => {
      if (nextQuestionIndex === originalQuestions.length) {
        this.submitTest()
      }
    })
  }

  private answerCurrentQuestion = () => {
    const { questionIndex, answer, questionStarted } = this.state
    const question = {
      ...this.state.originalQuestions[questionIndex]
    }
    const answeredQuestion = {
      ...question,
      studentAnswer: parseInt(answer, 10),
      start: questionStarted,
      end: new Date().getTime()
    }
    return answeredQuestion
  }

  private submitTest = async () => {
    const { answeredQuestions } = this.state
    await this.gradeTest({
      variables: { 
        id: this.props.test.id,
        input: {
          start: answeredQuestions[0].start,
          end: new Date().getTime(),
          questions: answeredQuestions.map(({ id, studentAnswer, start, end }) => ({
            id,
            studentAnswer,
            start,
            end,
          })),
        }
      }
    })
    this.setState({ redirectToTestResults: true })
  }
}
