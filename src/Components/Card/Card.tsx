import * as React from 'react';
import './Card.css';

interface IProps {
  children: any;
  onClick?: (params: any) => any;
}

export const Card = (props: IProps) => {
  const className = (props.onClick) ? "card hover" : "card";
  return (
    <div className={className} onClick={props.onClick}>
      {props.children}
    </div>
  );
}