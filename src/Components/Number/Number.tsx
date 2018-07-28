import * as React from 'react';
import { ITestNumber } from '../../lib/Interfaces';
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
      return <Operator key={i} operator={operator} />
    });
    return (
      <div className="number" onClick={this.expand}>
        <h1 className="number-header">{this.props.number.number}</h1>
        <div className="number-operators">
            {operators}
        </div>
      </div>
    );
  }

  private expand() {
    return false;
  }
}