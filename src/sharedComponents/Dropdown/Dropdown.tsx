import * as React from 'react';
import './Dropdown.css';

interface IProps {
  active: boolean;
  className?: string;
  children?: JSX.Element | JSX.Element[]
}

export const Dropdown = ({ active, className, children }: IProps) => {
  if (active) {
    return (
      <div className={`Dropdown${className ? ` ${className}` : ''}`}>
        {children}
      </div>
    )
  } else {
    return null
  }
}