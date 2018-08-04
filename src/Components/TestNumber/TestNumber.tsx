import * as React from 'react';
import { ITestNumber } from '../../lib/Interfaces';
import { themeColors } from '../../lib/Themes';
import { Button, Card, Operator } from '../Components';
import './TestNumber.css';

interface IProps {
  active: boolean;
  color: string;
  number: ITestNumber;
  onSubmit: (testNumber: ITestNumber, operator: string) => void;
  onClick: (selectedNumber: number) => void;
}

interface IState {
  operator?: string;
}

export class TestNumber extends React.Component <IProps, IState>{
  public constructor(props: IProps) {
    super(props);
    this.activateCard = this.activateCard.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
  }

  public render() {
    const className = this.props.active ? 'test-number active' : 'test-number';
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
      <Card onClick={this.activateCard} className={className}>
        <div className="header">
          <p className={`text ${this.props.color}`}>{this.props.number.number}</p>
        </div>
        <div className="operators-container">
            {operators}
        </div>
        <div className="button-container">
          <Button className="button" onClick={this.handleStartClick}>Create Test</Button>
        </div>
      </Card>
    );
  }

  private activateCard() {
    this.props.onClick(this.props.number.number);
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