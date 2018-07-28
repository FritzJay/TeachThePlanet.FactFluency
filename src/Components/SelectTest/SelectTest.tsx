import * as React from 'react';
import { ITestNumber } from '../../lib/Interfaces';
import { themeColors } from '../../lib/Themes';
import { Modal } from '../Modal/Modal';
import { Operator } from '../Operator/Operator';
import './SelectTest.css';

interface IProps {
  history?: any;
  onSubmit: (testNumber: number, operator: string) => void;
  testNumber: ITestNumber;
}

export class SelectTest extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  public render() {
    const operators = this.props.testNumber.operators.map((operator, i) => {
      const color = themeColors[i % themeColors.length];
      return (
        <Operator
          key={i}
          operator={operator}
          color={color}
          onClick={this.handleClick}
        />
      );
    });
    return (
      <div className="select-test">
        <Modal>
          <div className="header">
            <p className="text">{this.props.testNumber.number}</p>
          </div>
          <div className="number-operators">
            {operators}
          </div>
        </Modal>
      </div>
    );
  }

  private handleClick(operator: string) {
    if (this.props.onSubmit && this.props.testNumber) {
      this.props.onSubmit(this.props.testNumber.number, operator)
    }
  }
}
