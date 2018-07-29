import * as React from 'react';
import { Modal, Operator } from '../../Components/Components';
import { ITestNumber } from '../../lib/Interfaces';
import { themeColors } from '../../lib/Themes';
import './SelectTestOperator.css';

interface IProps {
  onSubmit: (operator: string) => void;
  testNumber: ITestNumber;
}

interface IState {
  testNumber: ITestNumber;
}

export class SelectTestOperator extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      testNumber: props.testNumber || localStorage.getItem('testNumber'),
    }
  }

  public render() {
    const operators = this.state.testNumber.operators.map((operator, i) => {
      const color = themeColors[i % themeColors.length];
      return (
        <Operator
          key={i}
          operator={operator}
          color={color}
          onClick={this.props.onSubmit}
        />
      );
    });
    return (
      <div className="select-test">
        <Modal>
          <div className="header">
            <p className="text">{this.state.testNumber.number}</p>
          </div>
          <div className="number-operators">
            {operators}
          </div>
        </Modal>
      </div>
    );
  }
}
