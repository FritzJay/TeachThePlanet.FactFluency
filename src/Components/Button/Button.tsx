import * as React from 'react';
import './Button.css';

export interface IButtonProps {
  children: any;
  color?: string;
  onClick: (event: any) => void;
}

export const Button = (props: IButtonProps) => {
  const color = (props.color) ? props.color : 'rgba(1, 0, 0, 0.5)';
  const style = {
    borderColor: color,
    color,
  };
  return (
    <button
      className="button"
      onClick={props.onClick}
      style={style}
    >
      {props.children}
    </button>
  );
}