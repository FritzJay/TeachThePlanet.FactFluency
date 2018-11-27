import * as React from "react"
import gql from 'graphql-tag'
import { compose, graphql } from "react-apollo"
import { RouteComponentProps } from "react-router-dom"

import {
  initializeQuestions,
  randomizeQuestions,
  sortQuestions,
  startQuestion,
  randomlyFlipQuestion,
  IQuestion,
} from 'src/utils'
import { getOperatorSymbol } from "src/utils"
import { Button, Card, Input, Loading } from "src/sharedComponents"
import { Keyboard } from './Keyboard/Keyboard'
import './TakeTest.css'

interface IProps extends RouteComponentProps<{}> {
  data: {
    noTest: boolean
    test: any
    loading: boolean
    error: Error
  }
  mutate: any
}

interface IState {
  answer: string
  keyboard: boolean
  questionIndex: number
  questionStarted?: number
  questions: IQuestion[]
}

class TakeTest extends React.Component<IProps, IState> {
  public state: IState = {
    answer: '',
    keyboard: false,
    questionIndex: 0,
    questions: [],
  }

  private submitTestOnTimeout: any

  public componentDidMount() {
    if (this.props.data.noTest === true) {
      this.props.history.replace('/fact-fluency')
      return
    } 
    window.addEventListener('keydown', this.handleKeyDown)
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
    if (this.submitTestOnTimeout !== undefined) {
      clearTimeout(this.submitTestOnTimeout)
    }
  }

  public render() {
    const { loading, error, noTest } = this.props.data

    if (loading || noTest) {
      return (
        <div className="TakeTest">
          <Loading className="loading" />
        </div>
      )
    }

    if (error) {
      return (
        <div className="TakeTest">
          <h3 className="error">{error.message}</h3>
        </div>
      )
    }

    const { answer, keyboard } = this.state
    const question = this.props.data.test.questions[this.state.questionIndex]

    if (question) {
      const { operator, top, bottom } = randomlyFlipQuestion(question, this.state.questions.length)
      const displayOperator = getOperatorSymbol(operator)
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
    if (nextQuestionIndex < this.props.data.test.questions.length) {
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
    const question = {
      ...this.props.data.test.questions[this.state.questionIndex]
    }
    if (question === undefined) {
      return
    }
    return {
      ...question,
      studentAnswer: parseInt(this.state.answer, 10),
      start: this.state.questionStarted,
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
    await this.props.mutate({
      variables: { 
        id: this.props.data.test.id,
        input: {
          start: this.props.data.test.start,
          end: new Date().getTime(),
          questions: sortedQuestions,
        }
      }
    })
    this.props.history.push('/fact-fluency/test-results')
  }
}

const GET_TEST_ID = gql`
  {
    testId @client
  }
`

const GET_TEST = gql`
  query Test($id: ObjID!) {
    test(id: $id) {
      id
      duration
      number
      operator
      randomQuestions
      start
      end
      student {
        id
      }
      course {
        id
      }
      questions {
        id
        question
        studentAnswer
        start
        end
      }
    }
  }
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

// Queries/mutations are executed in order.
// GET_TEST_ID must be the first argument in `compose`
// for `testId` to be accessible to GET_TEST.
export const TakeTestWithData = compose(
  graphql(
    GET_TEST_ID,
    {
      props: (props: any) => {
        if (props.data.testId === null) {
          return {
            data: {
              noTest: true
            }
          }
        }
        return {
          data: {
            ...props.data,
            noTest: false,
          }
        }
      }
    }
  ),
  graphql(
    GET_TEST,
    {
      options: ({ data }: any) => ({
        variables: { id: data.testId },
        name: 'test',
      }),
      skip: ({ data: { noTest } }) => noTest === true,
      props: (props: any) => {
        const { data, ownProps } = props
        if (data.loading || data.error || ownProps.loading || ownProps.error) {
          return { data }
        }
        const questions = randomizeQuestions(
          initializeQuestions(data.test.questions)
        )
        startQuestion(questions[0])
        return ({
          data: {
            ...ownProps.data,
            test: {
              ...data.test,
              start: new Date().getTime(),
              questions
            }
          }
        })
      }
    }
  ),
  graphql(
    GRADE_TEST
  ),
)(TakeTest)