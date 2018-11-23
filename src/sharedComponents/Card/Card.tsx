import * as React from 'react';
import './Card.css';

interface IProps {
  id?: string
  className?: string;
  children: any;
  onClick?: (params: any) => any;
}

export const Card = ({ id, className, children, onClick }: IProps) => {
  return (
    <div
      id={id ? id : ''}
      className={`card${onClick ? ' hover' : ''}${className ? ' ' + className : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}