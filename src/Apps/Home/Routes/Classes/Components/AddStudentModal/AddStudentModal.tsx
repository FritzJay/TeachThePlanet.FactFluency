import * as React from 'react';
import './AddStudentModal.css';

interface IProps {
  temp?: any
}

interface IState {
  temp?: any;
}

export class AddStudentModal extends React.Component<IProps, IState> {
  public render() {
    return (
      <div className="add-student-modal">
        Add Student Modal
      </div>
    );
  }
}