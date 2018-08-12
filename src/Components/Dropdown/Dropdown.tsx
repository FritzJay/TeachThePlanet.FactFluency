import * as React from 'react';
import './Dropdown.css';

interface IProps {
  active: boolean;
  className?: string;
  children: JSX.Element[];
}

export const Dropdown = (props: IProps) => {
  return (
    <div className={`dropdown${props.active ? ' active' : ''}${props.className ? ' ' + props.className : ''}`}>
      {props.children}
    </div>
  );
}