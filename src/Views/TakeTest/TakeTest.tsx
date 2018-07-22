import * as React from "react";
import { URLS } from "../../App";
import { loadState, saveState } from "../../lib/Caching";
import { ITest, ITestParameters } from "../../lib/Interfaces";
import { IRequest, IRequestComponentProps, jsonFetch, setTokenToStateOrSignOut } from "../../lib/Requests";
import { StartTestConfirmation } from "./StartTestConfirmation";
import { Test } from "./Test";

interface IProps extends IRequestComponentProps {
  saveTest: (test: ITest) => Promise<void>;
  testParameters?: ITestParameters;
}

interface IState {
  test?: ITest;
  token?: string;
  started: boolean;
}

export class TakeTest extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      started: false,
    }
    this.getNewTest = this.getNewTest.bind(this);
    this.startTest = this.startTest.bind(this);
    this.submitTest = this.submitTest.bind(this);
  }

  public componentDidMount() {
    setTokenToStateOrSignOut(this)
    .then(() => {
      loadState(this, 'test')
      .catch(() => {
        if (this.props.testParameters) {
          this.getNewTest(this.props.testParameters);
        } else {
          this.props.history.push(URLS.newTest);
        }
      });
    })
  }

  public render() {
    if (this.state.test && this.state.started) {
      return (
        <Test
          test={this.state.test}
          submitTest={this.submitTest}
        />
      );
    } else {
      return <StartTestConfirmation startTest={this.startTest} />
    }
  }

  private getNewTest(testParameters: ITestParameters) {
    const request: IRequest = {
      body: testParameters,
      method: "POST",
      token: this.state.token,
    };
    jsonFetch(`${process.env.REACT_APP_API_URL}/tests/new`, request)
    .then((test: ITest) => {
      saveState(this, test);
    });
  }

  private startTest() {
    const test = this.state.test;
    if (test) {
      test.start = new Date();
      this.setState({
        started: true,
        test,
      });
    } else {
      throw new Error('A test was started when this.state.test is undefined!');
    }
  }

  private submitTest(test: ITest) {
    this.props.saveTest(test)
    .then(this.props.history.push(URLS.testResults));
  }
}