import * as React from "react";
import { URLS } from "../../App";
import { saveState } from "../../lib/Caching";
import { ITest, ITestParameters } from "../../lib/Interfaces";
import { IRequest, IRequestComponentProps, jsonFetch, setTokenToStateOrSignOut } from "../../lib/Requests";
import { Test } from "./Test";

interface IProps extends IRequestComponentProps {
  onSubmit: (test: ITest) => void;
  testParameters?: ITestParameters;
}

interface IState {
  test: ITest;
  token?: string;
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
        this.props.history.push(URLS.selectTestNumber);
      }
    });
  }

  public render() {
    return (
      <Test
        test={this.state.test}
        onSubmit={this.props.onSubmit}
      />
    );
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
}