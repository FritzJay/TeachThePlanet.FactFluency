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
  error: boolean;
  operator?: string;
}

export class TestNumber extends React.Component <IProps, IState>{
  public constructor(props: IProps) {
    super(props);
    this.state = {
      error: false,
    }
    this.activateCard = this.activateCard.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
  }

  public render() {
    const operators = this.props.number.operators.map((operator, i) => {
      const color = themeColors[i % themeColors.length];
      const selected = (this.props.active && this.state.operator === operator);
      return (
        <Operator
          active={this.props.active}
          selected={selected}
          key={i}
          operator={operator}
          color={color}
          onClick={this.handleOperatorClick}
        />
      );
    });
    return (
      <Card onClick={this.activateCard} className={`test-number ${this.props.active && 'active'} ${this.state.error && 'error'}`}>
        <div className="header">
          <p className={`text ${this.props.color}`}>{this.props.number.number}</p>
        </div>
        <div className="operators-container">
            {operators}
        </div>
        <div className="button-container">
          <Button className="button" onClick={this.handleStartClick}>Create Test</Button>
          <p className="error-message">Please select an operator</p>
        </div>
      </Card>
    );
  }

  private activateCard() {
    this.props.onClick(this.props.number.number);
    if (!this.props.active) {
      this.setState({
        error: false,
        operator: undefined,
      });
    }
  }

  private handleOperatorClick(operator: string) {
    this.setState({
      error: false,
      operator,
    });
  }

  private handleStartClick() {
    if (this.state.operator) {
      this.props.onSubmit(this.props.number, this.state.operator);
    } else {
      this.setState({error: true});
    }
  }
}