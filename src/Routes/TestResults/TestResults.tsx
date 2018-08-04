import * as React from 'react';
import { ITest, ITestResults } from '../../lib/Interfaces';
import { IRequest, IRequestComponentProps, jsonFetch } from '../../lib/Requests';

interface IProps extends IRequestComponentProps {
  test: ITest;
}

interface IState {
  testResults?: ITestResults;
  token?: string;
  error?: string;
}

export class TestResults extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {};
    this.saveTest = this.saveTest.bind(this);
  }

  public render() {
    const message = (this.state.testResults) ? 'Success!' : this.state.error;
    return <div>{message}</div>;
  }

  private saveTest(test: ITest) {
    console.log(test);
    const request: IRequest = {
      body: test,
      method: "POST",
      token: this.state.token,
    };
    jsonFetch(`${process.env.REACT_APP_API_URL}/tests/grade`, request)
    .then((testResults: ITestResults) => {
      // saveState(this, testResults);
      localStorage.removeItem('test');
    })
    .catch((error) => {
      this.setState({error});
    })
  }
}