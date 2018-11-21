import * as React from 'react'

import { getOperatorSymbol } from 'src/utils'
import './Operator.css'

interface IProps {
  active: boolean;
  disabled?: boolean
  selected: boolean;
  operator: string;
  color: string;
  onClick: (operator: string) => void;
}

export class Operator extends React.Component<IProps> {
  public render() {
    const { active, disabled, color, selected, operator } = this.props
    const symbol = getOperatorSymbol(operator)

    return (
      <div className="Operator">
        <a
          className={`operator-inner ${color} ${active ? 'active' : 'inactive'}${selected ? ' selected' : ''}${disabled ? ' disabled' : ''}`}
          onClick={this.handleClick}
        >
          {symbol}
        </a>
      </div>
    )
  }

  private handleClick = () => {
    const { active, disabled, onClick, operator } = this.props
    if (active && !disabled) {
      onClick(operator);
    }
  }
}
