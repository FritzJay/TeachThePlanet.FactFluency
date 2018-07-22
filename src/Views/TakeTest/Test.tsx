import * as React from 'react';
import { IQuestion, ITest } from '../../lib/Interfaces';

interface IDisplayQuestion {
  bottom: string;
  index: number;
  operator: string;
  start?: Date;
  top: string;
}

interface IProps {
  history?: any;
  test: ITest;
  submitTest: (test: any) => void;
}

interface IState {
  answer: string;
  question: IDisplayQuestion;
  questions: IQuestion[];
  test: ITest;
}

export class Test extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      answer: '',
      question: {
        bottom: '',
        index: 0,
        operator: '',
        top: '',
      },
      questions: [],
      test: props.test,
    }
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.answerCurrentQuestion = this.answerCurrentQuestion.bind(this);
    this.displayQuestion = this.displayQuestion.bind(this);
  }

  public componentDidMount() {
    const questions = this.randomizeQuestions(this.state.test.questions);
    this.setState({questions}, () => {
      this.displayQuestion(0);
    });
  }

  public render() {
    const question = this.state.question;
    return (
      <div>
        <p>{question.top} {question.operator} {question.bottom}</p>
        <input value={this.state.answer} onChange={this.handleAnswerChange} />
        <button onClick={this.handleSubmitClick}>Submit</button>
      </div>
    )
  }

  private handleAnswerChange(event: any) {
    this.setState({answer: event.target.value});
  }

  private handleSubmitClick() {
    this.answerCurrentQuestion();
    const nextQuestionIndex = this.state.question.index + 1;
    if (nextQuestionIndex < this.state.test.questions.length) {
      this.displayQuestion(nextQuestionIndex);
    } else {
      this.submitTest();
    }
  }

  private randomizeQuestions(questions: IQuestion[]): IQuestion[] {
    return JSON.parse(JSON.stringify(questions))    // Deep Copy
    .sort(() => 0.5 - Math.random())                // Randomize
    .map((question: any, i: number) => {
      question.index = 1;
      return question;
    });
  }

  private displayQuestion(index: number) {
    const nextQuestion = this.state.test.questions[index];
    const flippedQuestion = this.randomlyFlipQuestion(nextQuestion, index);
    flippedQuestion.start = new Date();
    this.setState({question: flippedQuestion});
  }

  private randomlyFlipQuestion(question: IQuestion, index: number): IDisplayQuestion {
    let bottom;
    let top;
    const [firstNum, operator, secondNum] = question.question.split(' ');
    if (operator !== '/' && operator !== '-' && Math.random() > 0.5) {
      bottom = firstNum;
      top = secondNum;
    } else {
      bottom = secondNum;
      top = firstNum;
    }
    return {
      bottom,
      index,
      operator,
      top,
    }
  }

  private answerCurrentQuestion() {
    const questions = this.state.questions;
    const question = questions[this.state.question.index];
    const answer = parseInt(this.state.answer, 10);
    question.studentAnswer = answer;
    question.start = this.state.question.start;
    question.end = new Date();
    this.setState({
      answer: '',
      questions,
    });
  }

  private submitTest() {
    const questions = this.state.questions.sort((q1: any, q2: any) => q1.index - q2.index);
    const test = this.state.test;
    test.questions = questions;
    test.end = new Date();
    this.props.submitTest({test});
  }
}