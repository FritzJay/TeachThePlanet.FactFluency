import * as React from "react"
import gql from 'graphql-tag'
import { Mutation } from "react-apollo"
import { Redirect } from "react-router-dom"

import {
  initializeQuestions,
  randomizeQuestions,
  sortQuestions,
  startQuestion,
  randomlyFlipQuestion,
  IQuestion,
  ITest,
} from 'src/utils'
import { getOperatorSymbol } from "src/utils"
import { Button, Card, Input, Loading } from "src/sharedComponents"
import { Keyboard } from './Keyboard/Keyboard'
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
      id,
      testResults {
        total,
        needed,
        correct,
        incorrect {
          question,
          studentAnswer,
          correctAnswer,
          start,
          end
        },
        quickest {
          question,
          studentAnswer,
          correctAnswer,
          start,
          end
        },
      }
    }
  }
`

interface IProps {
  test: ITest
}

interface IState {
  answer: string
  keyboard: boolean
  questionIndex: number
  questionStarted?: number
  questions: IQuestion[]
  redirectToTestResults: boolean
}

export class TakeTest extends React.Component<IProps, IState> {
  public state: IState = {
    answer: '',
    keyboard: false,
    questionIndex: 0,
    questions: randomizeQuestions(
      initializeQuestions(this.props.test.questions)
    ),
    redirectToTestResults: false,
  }

  private submitTestOnTimeout: any
  private gradeTest: any

  public componentDidMount() {
    this.setState({ questions: [startQuestion(this.props.test.questions[0])] })
    window.addEventListener('keydown', this.handleKeyDown)
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
    if (this.submitTestOnTimeout !== undefined) {
      clearTimeout(this.submitTestOnTimeout)
    }
  }

  public render() {
    if (this.state.redirectToTestResults) {
      return <Redirect to="fact-fluency/test-results" />
    }

    const { answer, keyboard } = this.state
    const question = this.props.test.questions[this.state.questionIndex]

    if (question) {
      const { operator, top, bottom } = randomlyFlipQuestion(question, this.state.questions.length)
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
    const { questionIndex, questions } = this.state
    const answeredQuestion = this.answerCurrentQuestion()
    const nextQuestionIndex = questionIndex + 1
    if (nextQuestionIndex < this.props.test.questions.length && answeredQuestion !== undefined) {
      this.setState({
        answer: '',
        questionStarted: new Date().getTime(),
        questionIndex: nextQuestionIndex,
        questions: questions.concat([answeredQuestion]),
      })
    } else {
      this.submitTest()
    }
  }

  private answerCurrentQuestion = () => {
    const { questionIndex, answer, questionStarted } = this.state
    const question = {
      ...this.props.test.questions[questionIndex]
    }
    if (question === undefined) {
      return
    }
    return {
      ...question,
      studentAnswer: parseInt(answer, 10),
      start: question.start || questionStarted,
      end: new Date().getTime()
    }
  }

  private submitTest = async () => {
    const { questions } = this.state
    if (questions === undefined) {
      return
    }
    const sortedQuestions = sortQuestions(questions)
      .map(({ id, studentAnswer, start, end }) => ({
        id,
        studentAnswer,
        start,
        end
      }))
    await this.gradeTest({
      variables: { 
        id: this.props.test.id,
        input: {
          start: this.props.test.start,
          end: new Date().getTime(),
          questions: sortedQuestions,
        }
      }
    })
    this.setState({ redirectToTestResults: true })
  }
}
