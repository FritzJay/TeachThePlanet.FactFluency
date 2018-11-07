import * as React from 'react';
import { Button, Card } from 'src/Components';
import './StartTest.css';

interface IProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const encouragingTexts = ['We know you got this!', 'Keep calm and rock this test!', 'You can do it!'];

export class StartTest extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
    this.handleStartTestClick = this.handleStartTestClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  public render() {
    const headerText = encouragingTexts[Math.floor(Math.random() * encouragingTexts.length)];
    return (
      <Card className="start-test">
        <div className="header">
          <h1>{headerText}</h1>
        </div>
        <div className="buttons">
          <Button className="green" autoFocus={true} onClick={this.handleStartTestClick}>Start Test</Button>
          <Button className="cancel-button" onClick={this.handleCancelClick}>Cancel</Button>
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