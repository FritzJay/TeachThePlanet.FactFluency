import * as React from 'react';
import './Card.css';

interface IProps {
  className?: string;
  children: any;
  onClick?: (params: any) => any;
}

export const Card = ({ className, children, onClick }: IProps) => {
  return (
    <div
      className={`card${onClick ? ' hover' : ''}${className ? ' ' + className : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}