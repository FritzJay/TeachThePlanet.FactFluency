import * as React from 'react';
import { combineClassName } from '../../lib/Themes';
import './Button.css';

export interface IButtonProps {
  className?: string;
  children: any;
  onClick: (event: any) => void;
}

export const Button = (props: IButtonProps) => {
  const className = combineClassName('pill-button', props.className);
  return (
    <button
      className={className}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}