import * as React from 'react'
import './ClassCard.css'

interface IProps {
  temp?: any
}

interface IState {
  temp?: any;
}

export class ClassCard extends React.Component<IProps, IState> {
  public render() {
    return (
      <div className="class-card" onClick={this.handleClassCardClick}>
        <button className="settings"><i className="material-icons">settings</i></button>
        <h3>Class Name</h3>
        <h4>Class Code:</h4>
      </div>
    );
  }
  private handleClassCardClick() {
    return
  }
}