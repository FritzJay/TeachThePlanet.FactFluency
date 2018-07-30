import * as React from 'react';
import { ITestNumber } from '../../lib/Interfaces';
import { themeColors } from '../../lib/Themes';
import { Card } from '../Card/Card';
import { Operator } from '../Operator/Operator';
import './TestNumber.css';

interface IProps {
  color: string;
  number: ITestNumber;
  onSubmit: (testNumber: ITestNumber, operator: string) => void;
}

export class TestNumber extends React.Component <IProps>{
  public constructor(props: IProps) {
    super(props);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
  }

  public render() {
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
      <Card>
        <div className="header">
          <p className="text" style={{color: this.props.color}}>{this.props.number.number}</p>
        </div>
        <div className="number-operators">
            {operators}
        </div>
      </Card>
    );
  }

  private handleOperatorClick(operator: string) {
    this.props.onSubmit(this.props.number, operator);
  }
}