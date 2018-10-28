import * as React from 'react';
import './ClassCard.css';

interface IProps {
  temp?: any
}

interface IState {
  temp?: any;
}

export class ClassCard extends React.Component<IProps, IState> {
  public render() {
    return (
      <div className="class-card">
        Class Card
      </div>
    );
  }
}