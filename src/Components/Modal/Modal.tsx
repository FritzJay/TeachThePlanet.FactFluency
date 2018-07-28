import * as React from 'react';
import * as tinycolor from 'tinycolor2';
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
  const color = getReadableFontColor(props.color);
  const style = {
      backgroundColor: props.color,
      color,
  }
  return (
    <div className={className} style={style}>
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

const getReadableFontColor = (background: string | undefined): string => {
  const defaultColor = 'rgba(1, 0, 0, .5)';
  if (background) {
    return tinycolor.mostReadable(
      background,
      [defaultColor, '#FFFFFF'],
      { includeFallbackColors: false },
    ).toRgbString();
  } else {
    return defaultColor;
  }
}
