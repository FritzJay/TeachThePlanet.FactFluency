import * as React from 'react'
import { themeColors } from 'src/lib'
import { ITestNumber } from 'src/lib/Interfaces'
import { Button, Card, Operator } from 'src/sharedComponents'
import './TestNumber.css'

interface IProps {
  active: boolean
  color: string
  num: ITestNumber
  onSubmit: (testNumber: ITestNumber, operator: string) => void
  onClick: (selectedNumber: number) => void
}

interface IState {
  error: boolean
  operator?: string
}

export class TestNumber extends React.Component <IProps, IState> {
  public state: IState = {
    error: false
  }

  public render() {
    const { active, color, num } = this.props

    return (
      <Card onClick={this.activateCard} className={`TestNumber ${active && 'active'} ${this.state.error && 'error'}`}>
        <div className="header">
          <p className={`text ${color}`}>{num.number}</p>
        </div>

        <div className="operators-container">
          {num.operators.map((operator, i) => {
            const themeColor = themeColors[i % themeColors.length]
            const selected = (active && this.state.operator === operator)
            return (
              <Operator
                key={i}
                active={active}
                selected={selected}
                operator={operator}
                color={themeColor}
                onClick={this.handleOperatorClick}
              />
            )
          })}
        </div>

        <div className="button-container">
          <Button
            className="green"
            onClick={this.handleStartClick}
          >
            Create Test
          </Button>

          <p className="error-message">Please select an operator</p>
        </div>
      </Card>
    )
  }

  private activateCard = () => {
    const { active, num, onClick } = this.props

    onClick(num.number)

    if (!active) {
      this.setState({
        error: false,
        operator: undefined,
      })
    }
  }

  private handleOperatorClick = (operator: string) => {
    this.setState({
      error: false,
      operator,
    })
  }

  private handleStartClick = () => {
    const { onSubmit, num } = this.props
    const operator = this.state.operator

    if (operator) {
      onSubmit(num, operator)
    } else {
      this.setState({ error: true })
    }
  }
}