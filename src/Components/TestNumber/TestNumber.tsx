import * as React from 'react';
import { ITestNumber } from '../../lib/Interfaces';
import { themeColors } from '../../lib/Themes';
import { Card } from '../Card/Card';
import { Operator } from '../Operator/Operator';
import './TestNumber.css';

interface IProps {
  color: string;
  number: ITestNumber;
  onCardClick: (testNumber: ITestNumber) => void;
}

export class TestNumber extends React.Component <IProps>{
  public constructor(props: IProps) {
    super(props);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  public render() {
    const operators = this.props.number.operators.map((operator, i) => {
      const color = themeColors[i % themeColors.length];
      return (
        <Operator
          key={i}
          operator={operator}
          color={color}
        />
      );
    });
    return (
      <Card className="test-number" onClick={this.handleCardClick}>
        <div className="header">
          <p className="text" style={{color: this.props.color}}>{this.props.number.number}</p>
        </div>
        <div className="operators-container">
            {operators}
        </div>
      </Card>
    );
  }

  private handleCardClick() {
    this.props.onCardClick(this.props.number);
  }
}