import * as React from 'react';
import { Button, Card } from '../../Components/Components';
import './StartTest.css';

interface IProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export class StartTest extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
    this.handleStartTestClick = this.handleStartTestClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  public render() {
    return (
      <Card className="start-test">
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
      this.props.onSubmit();
    });
  }

  private handleCancelClick() {
    this.props.onCancel();
  }
}