import * as React from 'react';
import './Button.css';

export const Button = (props: any) => {
  return (
    <button
      {...props}
      className={`pill-button ${props.className ? ' ' + props.className : ''}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
