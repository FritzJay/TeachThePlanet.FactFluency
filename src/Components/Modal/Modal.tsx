import * as React from 'react';
import './Modal.css';

export interface IModalProps {
  className?: string;
  children: any;
  color?: string;
}

export const Modal = (props: IModalProps) => {
  return (
    <div className={`modal${props.className ? ' ' + props.className : ''}`}>
      {props.children}
    </div>
  );
}

export const ModalHeader = (props: IModalProps) => {
  return (
    <div className={`header${props.className ? ' ' + props.className : ''}`}>
      {props.children}
    </div>
  );
}

export const ModalContent = (props: IModalProps) => {
  return (
    <div className={`content ${props.className ? ' ' + props.className : ''}`}>
      {props.children}
    </div>
  );
}
