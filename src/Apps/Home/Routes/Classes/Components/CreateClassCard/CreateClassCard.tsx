import * as React from 'react'
import './CreateClassCard.css'
import Icon from './school-icon.svg'

interface IProps {
  temp?: any
}

interface IState {
  temp?: any;
}

export class CreateClassCard extends React.Component<IProps, IState> {
  public render() {
    return (
      <div className="create-class-card">
        <img src={Icon} />
        <p className="plus">+</p>
      </div>
    );
  }
}