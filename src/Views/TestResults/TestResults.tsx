import * as React from 'react';
import { URLS } from '../../App';
import { saveState } from '../../lib/Caching';
import { ITest, ITestResults } from '../../lib/Interfaces';
import { IRequest, jsonFetch, setTokenToStateOrSignOut } from '../../lib/Requests';

interface IProps {
  history: any;
  token?: string;
}

interface IState {
  testResults: ITestResults
}

export class TestResults extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.submitTest = this.submitTest.bind(this);
  }

  public componentDidMount() {
    setTokenToStateOrSignOut(this);
  }

  private submitTest(test: ITest) {
    const request: IRequest = {
      body: test,
      method: "POST",
      token: this.props.token,
    };
    jsonFetch(`${process.env.REACT_APP_API_URL}/tests/grade`, request)
    .then((testResults: ITestResults) => {
      saveState(this, testResults);
      this.props.history.push(URLS.testResults);
    });
  }
}