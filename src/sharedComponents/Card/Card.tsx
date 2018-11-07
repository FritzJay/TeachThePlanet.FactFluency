import * as React from 'react';
import './Card.css';

interface IProps {
  className?: string;
  children: any;
  onClick?: (params: any) => any;
}

export const Card = (props: IProps) => {
  return (
    <div className={`card${props.onClick ? ' hover' : ''}${props.className ? ' ' + props.className : ''}`} onClick={props.onClick}>
      {props.children}
    </div>
  );
}