import * as React from "react";
import { TestNumber } from '../../Components/Components';
import { loadState, saveState } from "../../lib/Caching";
import { IAvailableTests, ITestNumber } from "../../lib/Interfaces";
import { IRequest, IRequestComponentProps, jsonFetch, setTokenToStateOrSignOut } from "../../lib/Requests";
import { themeColors } from "../../lib/Themes";
import './SelectTest.css';

interface IProps extends IRequestComponentProps {
  onSubmit: (testNumber: ITestNumber) => void;
}

interface IState {
  availableTests: IAvailableTests;
  selectedNumber?: number;
  token?: string;
}

export class SelectTest extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      availableTests: {
        numbers: []
      },
    }
    this.getAvailableTests = this.getAvailableTests.bind(this);
    this.handleTestNumberClick = this.handleTestNumberClick.bind(this);
  }

  public componentDidMount() {
    setTokenToStateOrSignOut(this)
    .then(() => {
      loadState(this, 'availableTests')
      .catch(() => this.getAvailableTests());
    });
  }
  
  public render() {
    const testNumbers: any = [];
    for (const testNumber of this.state.availableTests.numbers) {
      const colorIndex = testNumbers.length;
      const color = themeColors[colorIndex % themeColors.length];
      const active = (testNumber.number === this.state.selectedNumber);
      testNumbers.push(
        <TestNumber
          active={active}
          key={colorIndex}
          number={testNumber}
          color={color}
          onSubmit={this.props.onSubmit}
          onClick={this.handleTestNumberClick}
        />
      );
    }
    return (
      <div className="select-test-numbers">
        {testNumbers}
      </div>
    );
  }

  private handleTestNumberClick(selectedNumber: number) {
    this.setState({selectedNumber});
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