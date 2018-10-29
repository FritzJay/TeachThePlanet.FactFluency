import * as React from 'react';
import './NewClassModal.css';

interface IProps {
  temp?: any
}

interface IState {
  temp?: any;
}

export class NewClassModal extends React.Component<IProps, IState> {
  public render() {
    return (
      <div className="new-class-modal">
        <p className="plus">+</p>
      </div>
    );
  }
}