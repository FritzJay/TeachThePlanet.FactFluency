import * as React from 'react';

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
    const style={color: this.props.color};
    return (
      <a onClick={this.handleClick} style={style}>{symbol}</a>
    );
  }

  private handleClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.operator);
    }
  }
}
