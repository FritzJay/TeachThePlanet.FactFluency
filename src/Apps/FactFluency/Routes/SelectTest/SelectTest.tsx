import * as React from "react";
import { IAvailableTests, ITestNumber } from "../../../../lib/Interfaces";
import { Themes } from "../../../../lib/lib";
import { TestNumber } from '../../Components/Components';
import './SelectTest.css';

interface IProps  {
  onSubmit: (testNumber: ITestNumber) => void;
  availableTests: IAvailableTests;
}

interface IState {
  selectedNumber?: number;
}

export class SelectTest extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    console.log(props);
    this.state = {
      selectedNumber: undefined,
    }
    this.handleTestNumberClick = this.handleTestNumberClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  public componentWillMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  public render() {
    const testNumbers: any = [];
    for (const testNumber of this.props.availableTests.numbers) {
      const colorIndex = testNumbers.length;
      const color = Themes.themeColors[colorIndex % Themes.themeColors.length];
      const active = (testNumber.number === this.state.selectedNumber);
      testNumbers.push(
        <TestNumber
          active={active}
          color={color}
          key={colorIndex}
          number={testNumber}
          onClick={this.handleTestNumberClick}
          onSubmit={this.props.onSubmit}
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
  
  private handleScroll() {
    if (this.state.selectedNumber !== undefined) {
      this.setState({selectedNumber: undefined});
    }
  }
}