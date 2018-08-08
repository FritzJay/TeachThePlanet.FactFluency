import * as React from 'react';
import { Card } from '../../Components/Card/Card';
import { ITestResults } from '../../lib/Interfaces';
import './TestResults.css';

interface IProps {
  testResults: ITestResults;
}

export class TestResults extends React.Component<IProps> {
  public render() {
    let quickestCard;
    if (this.props.testResults.quickest && this.props.testResults.quickest.start && this.props.testResults.quickest.end) {
      const quickestDurationInSeconds = (new Date(this.props.testResults.quickest.end).getTime() - new Date(this.props.testResults.quickest.start).getTime()) / 1000;
      quickestCard = (
        <Card className="quickest-card">
          <div className="header">
            <h2>You Rocked This Problem!</h2>
          </div>
          <h3>{this.props.testResults.quickest.question}</h3>
          <p>It only took you {quickestDurationInSeconds} second.</p>
        </Card>
      );
    }
    let incorrectCard;
    if (this.props.testResults.incorrect) {
      incorrectCard = (
        <Card className="incorrect-card">
          <div className="header">
            <h2>This Gave You Some Trouble</h2>
          </div>
          <h3>{this.props.testResults.incorrect.question}</h3>
          <p>Hint: It might be a good idea to practice this one.</p>
        </Card>
      );
    }
    return (
      <div className="test-results">
        <h1>You got {this.props.testResults.correct} out of {this.props.testResults.total} correct!</h1>
        <p>Remember you need {this.props.testResults.needed}/{this.props.testResults.total} to pass.</p>
        {quickestCard}
        {incorrectCard}  
      </div>
    );
  }
}