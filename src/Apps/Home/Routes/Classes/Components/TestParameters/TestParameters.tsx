import * as React from 'react'
import { Operator } from 'src/Apps/FactFluency/Routes/SelectTest/Components/Components'
import { Input, Modal, ModalContent, ModalHeader } from 'src/Components/Components'
import { Themes } from 'src/lib/lib';
import './TestParameters.css'

interface IProps {
  test?: string
}

interface IState {
  minute?: number
  operators: string[]
  numbers: number[]
  second?: number
  questions: number
  random: number
}

export class TestParameters extends React.Component<IProps, IState> {
  public state = {
    minute: undefined,
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    operators: ['+', '-', '*', '/'],
    questions: 20,
    random: 0,
    second: undefined,
  }

  public render() {
    const { minute, second, questions, random, operators, numbers } = this.state

    return (
      <Modal
        overlay={true}
        className="test-parameters-modal"
      >

        <ModalHeader className="parameters-header">
          <h1>Test Parameters</h1>
        </ModalHeader>

        <ModalContent className="parameter-content">

          <div className="time-parameter">
            <h3 className="duration-subheader">Duration</h3>

            <div className="time-input">
              <div className="minute">
                <Input
                  value={minute}
                  type="number"
                  placeholder="Minute"
                />
              </div>

              <p>:</p>

              <div className="second">
                <Input
                  value={second}
                  type="number"
                  placeholder="Second"
                />
              </div>
            </div>
          </div>

          <div className="questions-parameters">
            <div className="number-of-questions">
              <h3>Number of Questions</h3>

              <Input
                value={questions}
                type="number"
              />
            </div>

            <div className="random-questions">
              <h3>Number of Random Questions</h3>

              <p>Number of questions from other multiples</p>

              <Input
                value={random}
                type="number"
              />
            </div>
          </div>

          <div className="number-parameters">
            <div className="operators">
              <h3>Operators</h3>
              <div className="operators-container">
                {['+', '-', '*', '/'].map((symbol, i) => {
                  const color = Themes.themeColors[i % Themes.themeColors.length];
                  
                  return (
                    <Operator
                      key={symbol}
                      active={true}
                      selected={operators.includes(symbol)}
                      operator={symbol}
                      color={color}
                      onClick={this.handleOperatorClick}
                    />
                  )
                })}
              </div>
            </div>

            <div className="multiples">
              <h3>Multiples Available</h3>

              <div className="numbers-container">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
                  return (
                    <button
                      key={num}
                      className={`select-multiples${numbers.includes(num) ? ' active' : ''}`}
                      onClick={this.handleNumberClick}
                    >
                      {num}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

        </ModalContent>
      </Modal>
    )
  }

  private handleOperatorClick = (operator: string) => {
    const { operators } = this.state

    if (operators.includes(operator)) {
      this.setState({ operators: operators.filter((o) => o !== operator) })
    } else {
      this.setState({ operators: operators.concat([operator]) })
    }
  }

  private handleNumberClick = (e: any) => {
    const num = parseInt(e.target.innerText, 10)
    const { numbers } = this.state

    if (numbers.includes(num)) {
      this.setState({ numbers: numbers.filter((n) => n !== num) })
    } else {
      this.setState({ numbers: numbers.concat([num]) })
    }
  }
}
