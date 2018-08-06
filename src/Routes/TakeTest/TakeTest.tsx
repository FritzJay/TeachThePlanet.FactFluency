import * as React from "react";
import { Button, Card, Keyboard } from "../../Components/Components";
import { IDisplayQuestion, IQuestion, ITest } from "../../lib/Interfaces";
import { randomizeQuestions, sortQuestions, startQuestion } from '../../lib/Testing/Testing';
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
}

export class TakeTest extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    const questions = randomizeQuestions(this.props.test.questions);
    const question = startQuestion(questions[0]);
    this.state = {
      answer: '',
      keyboard: false,
      question,
      questionIndex: 0,
      questions,
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleKeyboardToggle = this.handleKeyboardToggle.bind(this);
  }

  public componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  public render() {
    if (this.state && this.state.question) {
      const question = this.state.question;
      return (
        <Card className={`take-test ${this.state.keyboard && 'small'}`}>
          <div className="question-problem">
            <p className="number-top">{question.top}</p>
            <p className="operator">{question.operator}</p>
            <p className="number-bottom">{question.bottom}</p>
            <p className="equals">=</p>
            <input type="text" dir="rtl" className="input-answer" value={this.state.answer}/>
          </div>
          <div className="button-container">
              <Button className="submit-button" onClick={this.handleSubmitClick}>Submit</Button>
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

  private handleKeyDown(event: any) {
    switch (event.key) {
      case 'Backspace':
      case 'Delete':
        this.handleDeleteClick();
        return;
      case 'Enter':
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
    this.setState((prevState) => {
      return {answer: prevState.answer + num}
    });
  }

  private handleSubmitClick() {
    this.answerCurrentQuestion();
    const nextQuestionIndex = this.state.questionIndex + 1;
    if (nextQuestionIndex < this.props.test.questions.length) {
      const nextQuestion = startQuestion(this.state.questions[nextQuestionIndex]);
      this.setState({question: nextQuestion});
    } else {
      this.onSubmit();
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

  private onSubmit() {
    const questions = sortQuestions(this.state.questions);
    const test = this.props.test;
    test.questions = questions;
    test.end = new Date();
    this.props.onSubmit(test);
  }
}