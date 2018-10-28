import * as React from 'react';
import './Button.css';

export interface IButtonProps {
  autoFocus?: boolean;
  className?: string;
  children: any;
  onClick?: (event: any) => void;
}

export const Button = (props: IButtonProps) => {
  return (
    <button
      autoFocus={props.autoFocus}
      className={`pill-button ${props.className ? ' ' + props.className : ''}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
