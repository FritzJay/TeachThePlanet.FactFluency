import * as React from 'react';
import './EditClassModal.css';

interface IProps {
  temp?: any
}

interface IState {
  temp?: any;
}

export class EditClassModal extends React.Component<IProps, IState> {
  public render() {
    return (
      <div className="edit-class-modal">
        Edit Class Modal
      </div>
    );
  }
}