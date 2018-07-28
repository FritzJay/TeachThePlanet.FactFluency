import * as React from 'react';

interface IProps {
  operator: string;
}

export const Operator = (props: IProps) => {
  switch(props.operator) {
    case '*':
      return <span>×</span>
    case '/':
      return <span>&divide;</span>
    case '-':
      return <span>&#8722;</span>
    default:
      return <span>{props.operator}</span>
  }
}