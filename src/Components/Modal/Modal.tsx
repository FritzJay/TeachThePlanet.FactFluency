import * as React from 'react';
import { combineClassName } from '../../lib/Themes';
import './Modal.css';

export interface IModalProps {
  className?: string;
  children: any;
  color?: string;
}

export const Modal = (props: IModalProps) => {
  const className = combineClassName('modal', props.className);
  return (
    <div className={className}>
      {props.children}
    </div>
  );
}

export const ModalHeader = (props: IModalProps) => {
  const className = combineClassName('header', props.className);
  return (
    <div className={className}>
      {props.children}
    </div>
  );
}

export const ModalContent = (props: IModalProps) => {
  const className = combineClassName('content', props.className);
  return (
    <div className={className}>
      {props.children}
    </div>
  );
}
