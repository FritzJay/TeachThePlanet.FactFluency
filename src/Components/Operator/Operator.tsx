import * as React from 'react';
import './Operator.css';

interface IProps {
  operator: string;
  color: string;
  onClick?: (operator: string) => void;
}

export class Operator extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  public render() {
    let symbol;
    switch(this.props.operator) {
      case '*':
        symbol = '×';
        break;
      case '/':
        symbol = '÷';
        break;
       case '-':
        symbol = '−';
        break;
      default:
        symbol = this.props.operator;
        break;
    }
    return (
      <div className="operator-div">
        <a className="operator" onClick={this.handleClick}>{symbol}</a>
      </div>
    );
  }

  private handleClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.operator);
    }
  }
}
