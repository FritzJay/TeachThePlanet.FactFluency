import * as React from 'react';
import { ITestResults } from '../../lib/Interfaces';

interface IProps {
  testResults: ITestResults;
}

export class TestResults extends React.Component<IProps> {
  public render() {
    return <div>{this.props.testResults.toString()}</div>;
  }
}