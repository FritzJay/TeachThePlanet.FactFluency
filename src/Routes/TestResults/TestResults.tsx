import * as React from 'react';
import { Button, Card } from '../../Components/Components';
import { IQuestion, ITestResults } from '../../lib/Interfaces';
import './TestResults.css';

interface IProps {
  testResults: ITestResults;
}

export class TestResults extends React.Component<IProps> {
  public render() {
    const correctClassName = (this.props.testResults.correct >= this.props.testResults.needed) ? 'pass' : 'fail';
    return (
      <div className="test-results">
        <h1>You got <span className={correctClassName}>{this.props.testResults.correct}</span> out of <span className="pass">{this.props.testResults.total}</span> correct!</h1>
        <p>Remember you need {this.props.testResults.needed}/{this.props.testResults.total} to pass.</p>
        <div className="cards-container">
          {this.quickestCard(this.props.testResults.quickest)}
          {this.incorrectCard(this.props.testResults.incorrect)}
        </div>
        <div className="buttons-container">
          <Button onClick={this.test}>Retry</Button>
          <Button onClick={this.test}>Home</Button>
        </div>
      </div>
    );
  }

  private test(event: any) {
    console.log(event.target.innerText);
  }

  private quickestCard(quickest?: IQuestion): JSX.Element | undefined {
    if (quickest && quickest.start && quickest.end) {
      const quickestDurationInSeconds = (new Date(quickest.end).getTime() - new Date(quickest.start).getTime()) / 1000;
      return (
        <Card className="quickest-card">
          <div className="header">
            <h2>You Rocked This Problem!</h2>
          </div>
          <h3>{this.props.testResults.quickest.question}</h3>
          <p>It only took you {quickestDurationInSeconds} second.</p>
        </Card>
      );
    } else {
      return undefined;
    }
  }

  private incorrectCard(incorrect?: IQuestion): JSX.Element | undefined {
    if (incorrect) {
      return (
        <Card className="incorrect-card">
          <div className="header">
            <h2>This Gave You Some Trouble</h2>
          </div>
          <h3>{this.props.testResults.incorrect.question}</h3>
          <p>Hint: It might be a good idea to practice this one.</p>
        </Card>
      );
    } else {
      return undefined;
    }
  }
}