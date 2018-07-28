import * as React from 'react';

interface IProps {
  operator: string;
  color: string;
}

export const Operator = (props: IProps) => {
  const style={color: props.color};
  switch(props.operator) {
    case '*':
      return <span style={style}>×</span>
    case '/':
      return <span style={style}>&divide;</span>
    case '-':
      return <span style={style}>&#8722;</span>
    default:
      return <span style={style}>{props.operator}</span>
  }
}