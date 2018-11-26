import * as React from "react"
import gql from 'graphql-tag'
import { Mutation, Query } from "react-apollo"
import { ApolloClient } from "apollo-boost"
import { RouteComponentProps } from "react-router-dom"

import {
  initializeQuestions,
  randomizeQuestions,
  sortQuestions,
  startQuestion,
  ITest,
} from 'src/utils'
import { IDisplayQuestion, IQuestion } from "src/utils"
import { getOperatorSymbol } from "src/utils"
import { Button, Card, Input, Loading } from "src/sharedComponents"
import { Keyboard } from './Keyboard/Keyboard'
import './TakeTest.css'

const GET_TEST_ID = gql`
  {
    test @client
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

export const TakeTestContainer = (props: any) => (
  <Query query={GET_TEST_ID}>
    {({ data: { test: id }, loading: firstLoading, error: firstError }) => (
      <Query query={GET_TEST} variables={{ id }}>
        {({ data: { test }, client, loading: secondLoading, error: secondError }) => {
          if (firstLoading || secondLoading) {
            return (
              <div className="TakeTest">
                <Loading className="loading" />
              </div>
            )
          }
          if (firstError || secondError) {
            return (
              <div className="TakeTest">
                <h3 className="error">{firstError ? firstError.message : secondError ? secondError.message : ''}</h3>
              </div>
            )
          }
          return <TakeTest
            {...props}
            client={client}
            test={test}
          />
        }}
      </Query>
    )}
  </Query>
)

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

interface IProps extends RouteComponentProps<{}> {
  history: any
  client: ApolloClient<any>
  test: ITest
}

interface IState {
  start?: number
  answer: string
  keyboard: boolean
  question?: IDisplayQuestion
  questionIndex: number
  questions?: IQuestion[]
}

class TakeTest extends React.Component<IProps, IState> {
  public state: IState = {
    answer: '',
    keyboard: false,
    questionIndex: 0,
  }

  private submitTestOnTimeout: any
  private gradeTest: any

  public componentDidMount() {
    const questions = randomizeQuestions(
      initializeQuestions(this.props.test.questions)
    )
    const question = startQuestion(questions[0])

    this.setState ({
      start: new Date().getTime(),
      answer: '',
      keyboard: false,
      question,
      questionIndex: 0,
      questions,
    })

    window.addEventListener('keydown', this.handleKeyDown)
    if (this.props.test.duration) {
      this.submitTestOnTimeout = setTimeout(this.submitTest, this.props.test.duration * 1000)
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)

    if (this.submitTestOnTimeout !== undefined) {
      clearTimeout(this.submitTestOnTimeout)
    }
  }

  public render() {
    return (
      <Mutation
        mutation={GRADE_TEST}
        onCompleted={async ({ gradeTest }: any) => {
          this.props.client.writeData({ data: {
            testResults: gradeTest.testResults
          }})
          this.props.history.push('/fact-fluency/test-results')}}
      >
        {(gradeTest, { loading, error }) => {
          if (loading) {
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
          
          this.gradeTest = gradeTest
          const { answer, keyboard, question } = this.state
          
          if (question) {
            const operator = getOperatorSymbol(question.operator)
            return (
              <Card className={`TakeTest ${keyboard ? 'active-keyboard': ''}`}>
                <div className="question-problem">
                  <p className="number-top">{question.top}</p>
                  <p className="operator">{operator}</p>
                  <p className="number-bottom">{question.bottom}</p>
                  <p className="equals">=</p>
                  <Input type="text" dir="rtl" className="input-answer" value={answer} />
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
            return null
          }
        }}
      </Mutation>
    )
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
    const { questions, questionIndex } = this.state
    const { test } = this.props

    if (questions === undefined) {
      return
    }

    this.answerCurrentQuestion()
    const nextQuestionIndex = questionIndex + 1
    if (nextQuestionIndex < test.questions.length) {
      const nextQuestion = startQuestion(questions[nextQuestionIndex])
      this.setState({
        answer: '',
        question: nextQuestion,
        questionIndex: nextQuestionIndex,
      })
    } else {
      this.submitTest()
    }
  }

  private answerCurrentQuestion = () => {
    const { questions, question } = this.state
    if (questions === undefined || question === undefined) {
      return
    }

    const nextQuestion = questions[this.state.questionIndex]
    const answer = parseInt(this.state.answer, 10)
    nextQuestion.studentAnswer = answer
    nextQuestion.start = question.start
    nextQuestion.end = new Date().getTime()
    this.setState({
      answer: '',
      questions
    })
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
          start: this.state.start,
          end: new Date().getTime(),
          questions: sortedQuestions,
        }
      }
    })
  }
}
