import * as React from 'react';
import { combineClassName } from '../../lib/Themes';
import './Card.css';

interface IProps {
  className?: string;
  children: any;
  onClick?: (params: any) => any;
}

export const Card = (props: IProps) => {
  const className = (props.onClick) ? combineClassName("card hover", props.className) : combineClassName("card", props.className);
  return (
    <div className={className} onClick={props.onClick}>
      {props.children}
    </div>
  );
}