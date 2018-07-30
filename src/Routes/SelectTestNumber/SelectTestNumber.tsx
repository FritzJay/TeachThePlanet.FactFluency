import * as React from "react";
import { TestNumber } from '../../Components/Components';
import { loadState, saveState } from "../../lib/Caching";
import { IAvailableTests, ITestNumber, ITestParameters } from "../../lib/Interfaces";
import { IRequest, IRequestComponentProps, jsonFetch, setTokenToStateOrSignOut } from "../../lib/Requests";
import { themeColors } from "../../lib/Themes";
import './NewTest.css';

interface IProps extends IRequestComponentProps {
  onSubmit: (testNumber: ITestNumber) => void;
}

interface IState {
  availableTests: IAvailableTests;
  selectedNumber?: ITestNumber;
  token?: string;
}

export class NewTest extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      availableTests: {
        numbers: []
      },
    }
    this.getAvailableTests = this.getAvailableTests.bind(this);
  }

  public componentDidMount() {
    setTokenToStateOrSignOut(this)
    .then(() => {
      loadState(this, 'availableTests')
      .catch(() => this.getAvailableTests());
    });
  }
  
  public render() {
    let currentColor = 0;
    const testNumbers: any = [];
    for (const testNumber of this.state.availableTests.numbers) {
      const color = themeColors[currentColor % themeColors.length];
      testNumbers.push(
        <TestNumber
          key={currentColor}
          number={testNumber}
          color={color}
          onCardClick={this.props.onSubmit}
        />
      );
      currentColor++;
    }
    return (
      <div className="numbers">
        {testNumbers}
      </div>
    );
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