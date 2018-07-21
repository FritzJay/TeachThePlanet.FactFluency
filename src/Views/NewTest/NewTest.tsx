import * as React from "react";
import { URLS } from "../../App";
import { loadState, saveState } from "../../lib/Caching";
import { IAvailableTests, ITestNumber, ITestParameters } from "../../lib/Interfaces";
import { IRequest, IRequestComponentProps, jsonFetch, setTokenToStateOrSignOut } from "../../lib/Requests";

interface IProps extends IRequestComponentProps {
  saveTestParameters: (testParameters: any) => Promise<void>;
}

interface IState {
  availableTests: IAvailableTests;
  token?: string;
}

export class NewTest extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      availableTests: {
        numbers: []
      }
    }
    this.getAvailableTests = this.getAvailableTests.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
  }

  public componentDidMount() {
    setTokenToStateOrSignOut(this)
    .then(() => {
      loadState(this, 'availableTests')
      .then(() => console.log(this.state))
      .catch(() => this.getAvailableTests());
    });
  }
  
  public render() {
    const availableTests = this.state.availableTests.numbers.map((testNumber: ITestNumber) => {
      const operators = testNumber.operators.map((operator: string) => {
        return (
          <div
            key={`${testNumber.number}${operator}`}
            onClick={this.handleOperatorClick.bind(this, testNumber.number, operator)}
          >
            {testNumber.number + ' ' + operator}
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

  private handleOperatorClick(testNumber: number, operator: string) {
    const testParameters: ITestParameters = {
      number: testNumber,
      operator,
    }
    this.props.saveTestParameters({testParameters})
    .then(this.props.history.push(URLS.takeTest));
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