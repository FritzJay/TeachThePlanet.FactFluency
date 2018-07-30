import * as React from 'react';
import { Modal, Operator } from '../../Components/Components';
import { ITestNumber } from '../../lib/Interfaces';
import { themeColors } from '../../lib/Themes';
import './SelectTestOperator.css';

interface IProps {
  onSubmit: (operator: string) => void;
  testNumber: ITestNumber;
}

export class SelectTestOperator extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const operators = this.props.testNumber.operators.map((operator, i) => {
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
            <p className="text">{this.props.testNumber.number}</p>
          </div>
          <div className="number-operators">
            {operators}
          </div>
        </Modal>
      </div>
    );
  }
}
