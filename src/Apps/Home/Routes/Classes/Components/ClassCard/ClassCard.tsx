import * as React from 'react'
import { Card } from '../../../../../../Components/Card/Card'
import './ClassCard.css'
import SchoolIcon from './school-icon.svg'

interface IProps {
  name: string
  classCode: string
}

interface IState {
  temp?: any;
}

export class ClassCard extends React.Component<IProps, IState> {
  public render() {
    const { name, classCode } = this.props

    return (
      <Card
        className="class-card"
        onClick={this.handleClassCardClick}
      >

        <button className="settings"><i className="material-icons">settings</i></button>

        <img src={SchoolIcon} className="school-icon" alt="school icon" />

        <h3>{name}</h3>
        <h4>Class Code: {classCode}</h4>
      </Card>
    );
  }
  private handleClassCardClick() {
    return
  }
}