import * as React from "react"
import { connect } from 'react-redux'
import { RouteComponentProps } from "react-router-dom";
import {
  initializeQuestions,
  randomizeQuestions,
  sortQuestions,
  startQuestion,
} from 'src/utils'
import { IDisplayQuestion, IQuestion, ITest } from "src/utils"
import { getOperatorSymbol } from "src/utils"
import { updateTest } from "src/actions/factFluency";
import { Button, Card, Input } from "src/sharedComponents"
import { Keyboard } from './Keyboard/Keyboard'
import './TakeTest.css'

interface IProps extends RouteComponentProps<{}> {
  dispatch: any
  history: any
  test: ITest
}

interface IState {
  answer: string
  keyboard: boolean
  question: IDisplayQuestion
  questionIndex: number
  questions: IQuestion[]
}

export class DisconnectedTakeTest extends React.Component<IProps, IState> {
  private submitTestOnTimeout: any

  public constructor(props: IProps) {
    super(props)

    this.props.test.start = new Date().getTime()
    initializeQuestions(this.props.test.questions)
    const questions = randomizeQuestions(this.props.test.questions)
    const question = startQuestion(questions[0])

    this.state = {
      answer: '',
      keyboard: false,
      question,
      questionIndex: 0,
      questions,
    }
  }

  public componentDidMount() {
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
      return <div/>
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
    this.answerCurrentQuestion()
    const nextQuestionIndex = this.state.questionIndex + 1
    if (nextQuestionIndex < this.props.test.questions.length) {
      const nextQuestion = startQuestion(this.state.questions[nextQuestionIndex])
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
    const questions = this.state.questions
    const question = questions[this.state.questionIndex]
    const answer = parseInt(this.state.answer, 10)
    question.studentAnswer = answer
    question.start = this.state.question.start
    question.end = new Date().getTime()
    this.setState({
      answer: '',
      questions
    })
  }

  private submitTest = async () => {
    const questions = sortQuestions(this.state.questions)
    const test = this.props.test
    test.questions = questions
    test.end = new Date().getTime()

    await this.props.dispatch(updateTest(test))
    this.props.history.push('/fact-fluency/test-results')
  }
}

const mapStateToProps = ({ factFluency }: any) => ({ test: factFluency.test })

export const TakeTest = connect(mapStateToProps)(DisconnectedTakeTest)