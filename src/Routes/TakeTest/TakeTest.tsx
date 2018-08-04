import * as React from "react";
import { Button, Card } from "../../Components/Components";
import { IDisplayQuestion, IQuestion, ITest } from "../../lib/Interfaces";
import { randomizeQuestions, sortQuestions, startQuestion } from '../../lib/Testing/Testing';
import './TakeTest.css';

interface IProps {
  test: ITest;
  onSubmit: (test: ITest) => void;
}

interface IState {
  answer: string;
  question: IDisplayQuestion;
  questionIndex: number;
  questions: IQuestion[];
}

export class TakeTest extends React.Component<IProps, IState> {
  public componentDidMount() {
    const questions = randomizeQuestions(this.props.test.questions);
    const question = startQuestion(questions[0]);
    this.setState({question, questions});
  }

  public render() {
    if (this.state && this.state.question) {
      const question = this.state.question;
      return (
          <Card className="take-test">
            <div>
              <div className="question-problem">
                <p className="number-top">{question.top}</p>
                <p className="operator">{question.operator}</p>
                <p className="number-bottom">{question.bottom}</p>
              </div>
              <div className="line-break"/>
                <input type="text" dir="rtl" className="input-answer" onChange={this.handleAnswerChange} value={this.state.answer}/>
          </div>
  
          <div className="btn-row">
              <Button onClick={this.handleSubmitClick}>Submit</Button>
          </div>
        </Card>
      )
    } else {
      return <div/>
    }
  }

  private handleAnswerChange(event: any) {
    this.setState({answer: event.target.value});
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