import * as React from 'react';
import { ITestNumber } from '../../lib/Interfaces';
import { themeColors } from '../../lib/Themes';
import { Card } from '../Card/Card';
import { Operator } from '../Operator/Operator';
import './Number.css';

interface IProps {
  color: string;
  number: ITestNumber;
}

interface IState {
  expanded: boolean;
}

export class Number extends React.Component <IProps, IState>{
  public constructor(props: IProps) {
    super(props);
    this.state = {
      expanded: false,
    }
    this.expand = this.expand.bind(this);
  }

  public render() {
    const operators = this.props.number.operators.map((operator, i) => {
      const color = themeColors[i % themeColors.length];
      return <Operator key={i} operator={operator} color={color} />
    });
    return (
      <Card onClick={this.expand}>
        <div className="header">
          <p className="text" style={{color: this.props.color}}>{this.props.number.number}</p>
        </div>
        <div className="number-operators">
            {operators}
        </div>
      </Card>
    );
  }

  private expand() {
    return false;
  }
}