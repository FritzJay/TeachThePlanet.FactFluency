import * as React from 'react';
import './Operator.css';

interface IProps {
  active: boolean;
  selected: boolean;
  operator: string;
  color: string;
  onClick: (operator: string) => void;
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
    const className = `operator ${this.props.color} ${this.props.active ? 'active' : 'inactive'} ${this.props.selected ? 'selected' : ''}`;
    return (
      <div className="operator-div">
        <a 
          className={className}
          onClick={this.handleClick}
        >
          {symbol}
        </a>
      </div>
    );
  }

  private handleClick() {
    if (this.props.active) {
      this.props.onClick(this.props.operator);
    }
  }
}