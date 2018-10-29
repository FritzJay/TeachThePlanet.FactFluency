import * as React from "react";
import { Button, Card } from "../../../../Components/Components";
import { IDisplayQuestion, IQuestion, ITest } from "../../../../lib/Interfaces";
import { Testing } from '../../../../lib/lib';
import { Keyboard } from './Components/Components';
import './TakeTest.css';

interface IProps {
  test: ITest;
  onSubmit: (test: ITest) => void;
}

interface IState {
  answer: string;
  keyboard: boolean;
  question: IDisplayQuestion;
  questionIndex: number;
  questions: IQuestion[];
  submitTestOnTimeout: any;
}

export class TakeTest extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.props.test.start = new Date();
    Testing.initializeQuestions(this.props.test.questions);
    const questions = Testing.randomizeQuestions(this.props.test.questions);
    const question = Testing.startQuestion(questions[0]);
    this.state = {
      answer: '',
      keyboard: false,
      question,
      questionIndex: 0,
      questions,
      submitTestOnTimeout: undefined,
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleKeyboardToggle = this.handleKeyboardToggle.bind(this);
    this.submitTest = this.submitTest.bind(this);
  }

  public componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    if (this.props.test.duration) {
      const submitTestOnTimeout = setTimeout(this.submitTest, this.props.test.duration * 1000);
      this.setState({submitTestOnTimeout});
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    if (this.state.submitTestOnTimeout) {
      clearTimeout(this.state.submitTestOnTimeout);
    }
  }

  public render() {
    if (this.state && this.state.question) {
      const question = this.state.question;
      const operator = this.getOperatorSymbol(question.operator);
      return (
        <Card className={`take-test ${this.state.keyboard ? 'active-keyboard': ''}`}>
          <div className="question-problem">
            <p className="number-top">{question.top}</p>
            <p className="operator">{operator}</p>
            <p className="number-bottom">{question.bottom}</p>
            <p className="equals">=</p>
            <input type="text" dir="rtl" className="input-answer" value={this.state.answer}/>
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

  private getOperatorSymbol(operator: string) {
    switch (operator) {
      case '*':
        return '×';
      case '/':
        return '÷';
       case '-':
        return '−';
      default:
        return operator;
    }
  }

  private handleKeyDown(event: any) {
    switch (event.key) {
      case 'Backspace':
        event.preventDefault();
        this.handleDeleteClick();
        return;
      case 'Delete':
        this.handleDeleteClick();
        return;
      case 'Enter':
        event.preventDefault();
        this.handleSubmitClick();
        return;
      default:
        break;
    }
    const num = parseInt(event.key, 10);
    if (!isNaN(num)) {
      this.handleNumberClick(num);
    }
  }

  private handleKeyboardToggle() {
    this.setState((prevState: IState) => {
      return {keyboard: !prevState.keyboard}
    });
  }

  private handleDeleteClick() {
    this.setState((prevState: IState) => {
      return {answer: prevState.answer.slice(0, -1)};
    });
  }

  private handleNumberClick(num: number) {
    if (this.state.answer.length < 3) {
      this.setState((prevState) => {
        return {answer: prevState.answer + num}
      });
    }
  }

  private handleSubmitClick() {
    this.answerCurrentQuestion();
    const nextQuestionIndex = this.state.questionIndex + 1;
    if (nextQuestionIndex < this.props.test.questions.length) {
      const nextQuestion = Testing.startQuestion(this.state.questions[nextQuestionIndex]);
      this.setState({
        answer: '',
        question: nextQuestion,
        questionIndex: nextQuestionIndex,
      });
    } else {
      this.submitTest();
    }
  }

  private answerCurrentQuestion() {
    const questions = this.state.questions;
    const question = questions[this.state.questionIndex];
    const answer = parseInt(this.state.answer, 10);
    question.studentAnswer = answer;
    question.start = this.state.question.start;
    question.end = new Date();
    this.setState({
      answer: '',
      questions
    });
  }

  private submitTest() {
    const questions = Testing.sortQuestions(this.state.questions);
    const test = this.props.test;
    test.questions = questions;
    test.end = new Date();
    this.props.onSubmit(test);
  }
}