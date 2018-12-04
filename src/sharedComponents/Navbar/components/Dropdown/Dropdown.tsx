import * as React from 'react';
import './Dropdown.css';

interface IProps {
  active: boolean;
  className?: string;
  children?: any
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