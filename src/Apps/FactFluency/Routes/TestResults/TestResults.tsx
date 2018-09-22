import * as React from 'react';
import { Button, Card } from '../../../../Components/Components';
import { IQuestion, ITestResults } from '../../../../lib/Interfaces';
import { padString } from '../../../../lib/Utility/Utility';
import './TestResults.css';

interface IProps {
  onRetry: () => void;
  onSubmit: (testResults: ITestResults) => void;
  testResults: ITestResults;
}

export class TestResults extends React.Component<IProps> {
  public render() {
    const correctClassName = (this.props.testResults.correct >= this.props.testResults.needed) ? 'pass' : 'fail';
    const amountCorrect = padString(this.props.testResults.correct, 2, '\xa0');
    const total = padString(this.props.testResults.total, 2, '\xa0');
    return (
      <div className="test-results">
        <h1 className="amount-correct-text">You got <span className={correctClassName}>{amountCorrect}</span> out of <span className="pass">{total}</span> correct!</h1>
        <p>Remember you need {this.props.testResults.needed}/{this.props.testResults.total} to pass.</p>
        <div className="cards-container">
          {this.quickestCard(this.props.testResults.quickest)}
          {this.incorrectCard(this.props.testResults.incorrect)}
        </div>
        <div className="buttons-container">
          <Button className="blue" onClick={this.props.onRetry}>
            <span className="btn-text">Retry</span>
            <span className="btn-icon">
              <i className="material-icons">replay</i>
            </span>
          </Button>
          <Button className="blue" onClick={this.props.onSubmit}>
            <span className="btn-text">Home</span>
            <span className="btn-icon">
              <i className="material-icons">home</i>
            </span></Button>
        </div>
      </div>
    );
  }

  private quickestCard(quickest?: IQuestion): JSX.Element | undefined {
    if (quickest && quickest.start && quickest.end) {
      const quickestDurationInSeconds = (new Date(quickest.end).getTime() - new Date(quickest.start).getTime()) / 1000;
      return (
        <Card className="quickest-card">
          <div className="header">
            <p>You Rocked This Problem!</p>
          </div>
          <div className="card-main-content">
            <h3>{this.props.testResults.quickest.question} = {this.props.testResults.quickest.correctAnswer}</h3>
            <p className="breakdown-text">It only took you {quickestDurationInSeconds} second.</p>
          </div>
        </Card>
      );
    } else {
      return undefined;
    }
  }

  private incorrectCard(incorrect?: IQuestion): JSX.Element | undefined {
    if (incorrect) {
      const youAnsweredMessage = incorrect.studentAnswer ? `You answered ${this.props.testResults.incorrect.studentAnswer}` : 'You didn\'t answer this question';
      return (
        <Card className="incorrect-card">
          <div className="header">
            <p>This Gave You Some Trouble.</p>
          </div>
          <div className="card-main-content">
              <h3>{this.props.testResults.incorrect.question} = {this.props.testResults.incorrect.correctAnswer}</h3>
              <h3>{youAnsweredMessage}</h3>
              <p className="breakdown-text">Hint: It might be a good idea to practice this one.</p>
          </div>
        </Card>
      );
    } else {
      return undefined;
    }
  }
}