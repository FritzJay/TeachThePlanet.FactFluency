import * as React from 'react';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import './StartTestConfirmation.css';

interface IProps {
  startTest: () => void;
}

export class StartTestConfirmation extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
    this.handleStartTestClick = this.handleStartTestClick.bind(this);
  }

  public render() {
    return (
      <Card className="start-test-confirmation">
        <h1>We know you got this!</h1>
        <p>You practiced right?</p>
        <div className="buttons">
          <Button onClick={this.handleStartTestClick}>Start</Button>
          <Button onClick={this.handleCancelClick}>Cancel</Button>
        </div>
      </Card>
    );
  }

  private handleStartTestClick() {
    this.setState({hidden: true}, () => {
      this.props.startTest();
    });
  }

  private handleCancelClick() {
    console.log('Cancelled!');
  }
}