import * as React from "react";
import { URLS } from "../../App";
import { loadState, saveState } from "../../lib/Caching";
import { ITest, ITestParameters } from "../../lib/Interfaces";
import { IRequest, IRequestComponentProps, jsonFetch, setTokenToStateOrSignOut } from "../../lib/Requests";

interface IProps extends IRequestComponentProps {
  saveTest: (test: ITest) => Promise<void>;
  testParameters?: ITestParameters;
}

interface IState {
  test?: ITest;
  token?: string;
}

export class TakeTest extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {}
    this.getNewTest = this.getNewTest.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
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
    const message = (this.state.test) ? "Success!" : "Error";
    return (
      <div>
        {message}
        <button onClick={this.handleSubmitClick}>Submit</button>
      </div>
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

  private handleSubmitClick() {
    if (this.state.test) {
      this.props.saveTest(this.state.test)
      .then(this.props.history.push(URLS.testResults));
    } else {
      console.log('There is no test to submit!');
    }
  }
}