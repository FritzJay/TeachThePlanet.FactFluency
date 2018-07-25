import * as React from 'react';
import * as tinycolor from 'tinycolor2';
import './Modal.css';

export interface IModalProps {
  children: any,
  color?: string;
}

export const Modal = (props: IModalProps) => {
  return (
    <div className="modal">
      {props.children}
    </div>
  );
}

export const ModalHeader = (props: IModalProps) => {
  const color = getReadableFontColor(props.color);
  const style = {
      backgroundColor: props.color,
      color,
  }
  return (
    <div className="header" style={style}>
      {props.children}
    </div>
  );
}

export const ModalContent = (props: IModalProps) => {
  return (
    <div className="content">
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