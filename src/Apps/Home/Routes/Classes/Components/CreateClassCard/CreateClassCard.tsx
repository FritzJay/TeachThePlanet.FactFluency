import * as React from 'react'
import { Input } from '../../../../../../Components/Components'
import './CreateClassCard.css'

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
        <p className="plus">+</p>
        <Input value="test" className="test" />
      </div>
    );
  }
}