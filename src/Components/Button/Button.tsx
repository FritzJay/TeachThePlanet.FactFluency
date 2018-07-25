import * as React from 'react';
import './Button.css';

export interface IButtonProps {
  children: any;
  color?: string;
  onClick: (event: any) => void;
}

export const Button = (props: IButtonProps) => {
  const style = {
    borderColor: props.color,
    color: props.color,
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