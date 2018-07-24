import * as React from 'react';
import { IDisplayQuestion, IQuestion, ITest } from '../../lib/Interfaces';
import { randomizeQuestions, sortQuestions, startQuestion } from '../../lib/Testing';

interface IProps {
  history?: any;
  test: ITest;
  submitTest: (test: any) => void;
}

interface IState {
  answer: string;
  question: IDisplayQuestion;
  questionIndex: number;
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
        operator: '',
        top: '',
      },
      questionIndex: 0,
      questions: [],
      test: props.test,
    }
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.answerCurrentQuestion = this.answerCurrentQuestion.bind(this);
  }

  public componentDidMount() {
    const questions = randomizeQuestions(this.state.test.questions);
    const question = startQuestion(questions[0]);
    this.setState({questions, question});
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
    const nextQuestionIndex = this.state.questionIndex + 1;
    if (nextQuestionIndex < this.state.test.questions.length) {
      const nextQuestion = startQuestion(this.state.questions[nextQuestionIndex]);
      this.setState({question: nextQuestion});
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
    const questions = sortQuestions(this.state.questions);
    const test = this.state.test;
    test.questions = questions;
    test.end = new Date();
    this.props.submitTest({test});
  }
}