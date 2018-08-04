import * as React from "react";
import { URLS } from "../../App";
import { Button, Card } from "../../Components/Components";
import { saveState } from "../../lib/Caching";
import { IDisplayQuestion, IQuestion, ITest, ITestParameters } from "../../lib/Interfaces";
import { IRequest, IRequestComponentProps, jsonFetch, setTokenToStateOrSignOut } from "../../lib/Requests";
import { randomizeQuestions, sortQuestions, startQuestion } from '../../lib/Testing';

interface IProps extends IRequestComponentProps {
  testParameters?: ITestParameters;
  onSubmit: (test: ITest) => void;
}

interface IState {
  token?: string;
  answer: string;
  question: IDisplayQuestion;
  questionIndex: number;
  questions: IQuestion[];
  test: ITest;
}

export class TakeTest extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.getNewTest = this.getNewTest.bind(this);
  }

  public componentDidMount() {
    setTokenToStateOrSignOut(this)
    .then(() => {
      if (this.props.testParameters) {
        this.getNewTest(this.props.testParameters);
      } else {
        this.props.history.push(URLS.selectTest);
      }
    });
  }

  public render() {
    if (this.state && this.state.question) {
      const question = this.state.question;
      return (
          <Card className="take-test">
            <div>
              <p>{question.top}</p>
              <p>{question.operator}</p>
              <p>{question.bottom}</p>
              <hr  className="line-break"/>
              <input type="text" onChange={this.handleAnswerChange} value={this.state.answer}/>
          </div>
  
          <div>
              <Button onClick={this.handleSubmitClick}>Submit</Button>
          </div>
        </Card>
      )
    } else {
      return <div/>
    }
    // <p>{question.top} {question.operator} {question.bottom}</p>
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
    const test = this.state.test;
    test.questions = questions;
    test.end = new Date();
    this.props.onSubmit(test);
  }

  private getNewTest(testParameters: ITestParameters) {
    const request: IRequest = {
      body: testParameters,
      method: "POST",
      token: this.state.token,
    };
    jsonFetch(`${process.env.REACT_APP_API_URL}/tests/new`, request)
    .then((test: ITest) => {
      saveState(this, test)
      .then(() => {
        const questions = randomizeQuestions(this.state.test.questions);
        const question = startQuestion(questions[0]);
        this.setState({questions, question});
      });
    });
  }
}