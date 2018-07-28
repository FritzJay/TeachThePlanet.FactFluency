import * as React from 'react';
import { combineClassName } from '../../lib/Themes';
import './Button.css';

export interface IButtonProps {
  className?: string;
  children: any;
  color?: string;
  onClick: (event: any) => void;
}

export const Button = (props: IButtonProps) => {
  const className = combineClassName('pill-button', props.className);
  const color = (props.color) ? props.color : 'rgba(1, 0, 0, 0.5)';
  const style = {
    borderColor: color,
    color,
  };
  return (
    <button
      className={className}
      onClick={props.onClick}
      style={style}
    >
      {props.children}
    </button>
  );
}