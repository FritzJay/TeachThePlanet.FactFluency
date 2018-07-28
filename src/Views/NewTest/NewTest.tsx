import * as React from "react";
import { Route } from "react-router-dom";
import { URLS } from "../../App";
import { Number } from '../../Components/Number/Number';
import { SelectTest } from "../../Components/SelectTest/SelectTest";
import { loadState, saveState } from "../../lib/Caching";
import { IAvailableTests, ITestNumber, ITestParameters } from "../../lib/Interfaces";
import { IRequest, IRequestComponentProps, jsonFetch, setTokenToStateOrSignOut } from "../../lib/Requests";
import { themeColors } from "../../lib/Themes";
import './NewTest.css';

interface IProps extends IRequestComponentProps {
  saveTestParameters: (testParameters: any) => Promise<void>;
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
    this.renderSelectTest = this.renderSelectTest.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        <Number
          key={currentColor}
          number={testNumber}
          color={color}
          onCardClick={this.handleCardClick}
          onOperatorClick={this.handleSubmit}
        />
      );
      currentColor++;
    }
    return (
      <div className="numbers">
        <Route
          path={URLS.selectTest}
          render={this.renderSelectTest}
        />
        {testNumbers}
      </div>
    )
  }

  private renderSelectTest() {
    if (!this.state.selectedNumber) {
      this.props.history.replace(URLS.newTest);
      return <div />
    } else {
      return (
        <SelectTest
          onSubmit={this.handleSubmit}
          testNumber={this.state.selectedNumber}
          history={this.props.history}
        />
      );
    }
  }

  private handleCardClick(selectedNumber: ITestNumber) {
    this.setState({selectedNumber}, () => {
      this.props.history.push(URLS.selectTest);
    });
  }

  private handleSubmit(testNumber: number, operator: string) {
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