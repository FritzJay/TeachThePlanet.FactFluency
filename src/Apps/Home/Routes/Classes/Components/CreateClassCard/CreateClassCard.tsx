import * as React from 'react'
import { Card } from '../../../../../../Components/Components'
import './CreateClassCard.css'

interface IProps {
  onClick: () => void
}

interface IState {
  temp?: any;
}

export class CreateClassCard extends React.Component<IProps, IState> {
  public render() {
    return (
      <Card
        className="create-class-card"
        onClick={this.props.onClick}
      >
        <p className="plus">+</p>
      </Card>
    );
  }
}