import * as React from "react";
import { loadState, saveState } from "../../lib/Caching";
import { IAvailableTests, ITestNumber } from "../../lib/Interfaces";
import { IRequest, IRequestComponentProps, jsonFetch, setTokenToStateOrSignOut } from "../../lib/Requests";

interface IState {
  availableTests: IAvailableTests;
  token?: string;
}

export class NewTest extends React.Component<IRequestComponentProps, IState> {
  public constructor(props: IRequestComponentProps) {
    super(props);
    this.state = {
      availableTests: {
        numbers: []
      }
    }
    this.getAvailableTests = this.getAvailableTests.bind(this);
  }

  public componentDidMount() {
    setTokenToStateOrSignOut(this);
    loadState(this, 'availableTests')
    .catch(() => this.getAvailableTests());
  }
  
  public render() {
    const availableTests = this.state.availableTests.numbers.map((testNumber: ITestNumber) => {
      const operators: string = testNumber.operators.join(', ');
      return (
        <p key={testNumber.number}>{testNumber.number}: {operators}</p>
      )
    });
    return (
      <div>
        <h1>Tests:</h1>
        <div>{availableTests}</div>
      </div>
    );
  }
  
  private getAvailableTests() {
    const request: IRequest = {
      method: "GET",
      token: this.props.token,
    };
    jsonFetch(`${process.env.REACT_APP_API_URL}/tests/available`, request)
    .then((availableTests: IAvailableTests) => {
      saveState(this, availableTests);
    });
  }
}