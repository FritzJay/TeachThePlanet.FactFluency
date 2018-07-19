import * as React from "react";
import { URLS } from "../../App";
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
      const operators = testNumber.operators.map((operator: string) => {
        return (
          <div
            key={`${testNumber.number}${operator}`}
            onClick={this.createTest.bind(this, testNumber, operator)}
          >
            {operator}
          </div>
        );
      });
      return (
        <div key={testNumber.number}>
          {operators}
        </div>
      )
    });
    return (
      <div>
        <h1>Tests:</h1>
        <div>{availableTests}</div>
      </div>
    );
  }

  private createTest(testNumber: ITestNumber) {
    this.props.history.push(URLS.takeTest);
  }
  
  private getAvailableTests() {
    const request: IRequest = {
      method: "GET",
      token: this.state.token,
    };
    jsonFetch(`${process.env.REACT_APP_API_URL}/tests/available`, request)
    .then((availableTests: IAvailableTests) => {
      saveState(this, availableTests);
    });
  }
}