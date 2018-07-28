import * as React from "react";
import { URLS } from "../../App";
import { loadState, saveState } from "../../lib/Caching";
import { IAvailableTests, ITestParameters } from "../../lib/Interfaces";
import { IRequest, IRequestComponentProps, jsonFetch, setTokenToStateOrSignOut } from "../../lib/Requests";
import './NewTest.css';
import { Number } from './Number/Number';

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
      .catch(() => this.getAvailableTests());
    });
  }
  
  public render() {
    const colors = ["#F7C940", "#FF0000", "#3A93E1", "A8C75A"];
    const currentColor = 0;
    const testNumbers: any = [];
    for (const testNumber of this.state.availableTests.numbers) {
      const color = colors[currentColor % colors.length];
      testNumbers.push(
        <Number number={testNumber} color={color} />
      );
    }
    return (
      <div className="numbers">
        {testNumbers}
      </div>
    )
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