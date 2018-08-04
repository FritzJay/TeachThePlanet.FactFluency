import * as React from 'react';
import { ITestNumber } from '../../lib/Interfaces';
import { themeColors } from '../../lib/Themes';
import { Button, Card, Operator } from '../Components';
import './TestNumber.css';

interface IProps {
  color: string;
  number: ITestNumber;
  onSubmit: (testNumber: ITestNumber, operator: string) => void;
}

interface IState {
  active: boolean;
  operator?: string;
}

export class TestNumber extends React.Component <IProps, IState>{
  public constructor(props: IProps) {
    super(props);
    this.state = {
      active: false,
    }
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
  }

  public render() {
    const buttonContainerClassName = this.state.active ? 'button-container active' : 'button-container';
    const operators = this.props.number.operators.map((operator, i) => {
      const color = themeColors[i % themeColors.length];
      return (
        <Operator
          key={i}
          operator={operator}
          color={color}
          onClick={this.handleOperatorClick}
        />
      );
    });
    return (
      <Card className="test-number">
        <div className="header">
          <p className="text" style={{color: this.props.color}}>{this.props.number.number}</p>
        </div>
        <div className="operators-container">
            {operators}
        </div>
        <div className={buttonContainerClassName}>
          <Button className="button" onClick={this.handleStartClick}>Create Test</Button>
        </div>
      </Card>
    );
  }

  private handleOperatorClick(operator: string) {
    this.setState({operator});
  }

  private handleStartClick() {
    if (this.state.operator) {
      this.props.onSubmit(this.props.number, this.state.operator);
    }
  }
}