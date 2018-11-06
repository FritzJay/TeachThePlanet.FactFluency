import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Operator } from 'src/Apps/FactFluency/Routes/SelectTest/Components/Components'
import { Button, Input, Modal, ModalContent, ModalHeader } from 'src/Components/Components'
import { fetchTestParameters, updateTestParameters } from 'src/lib/Api/TestParameters';
import { Themes } from 'src/lib/lib';
import './TestParameters.css'

interface IState {
  loading: boolean
  minute: number
  numbers: number[]
  operators: string[]
  questions: number
  randomQuestions: number
  second: number
  testParametersID: string
}

interface IProps extends RouteComponentProps<{}> {
  token: string
  classID: string
}

export class TestParameters extends React.Component<IProps, IState> {
  public state: IState = {
    loading: true,
    minute: 0,
    numbers: [],
    operators: [],
    questions: 0,
    randomQuestions: 0,
    second: 0,
    testParametersID: ''
  }

  public async componentDidMount() {
    const { token, classID } = this.props

    try {
      const { _id, duration, operators, numbers, questions, randomQuestions } = await fetchTestParameters(token, classID)
      
      const minute = Math.floor(duration / 60)
      const second = duration % 60
      
      this.setState({
        loading: false,
        minute,
        numbers,
        operators,
        questions,
        randomQuestions,
        second,
        testParametersID: _id,
      })

    } catch(error) {
      console.log(error)
    }
  }

  public render() {
    const { loading, minute, second, questions, randomQuestions, operators, numbers } = this.state

    if (loading) {
      return (
        <Modal>
          overlay={true}
          className="test-parameters-modal"
        >

          <ModalHeader className="parameters-header">
            <h1>Test Parameters</h1>
          </ModalHeader>

          <ModalContent className="parameter-content">
            <h2>Loading...</h2>
          </ModalContent>
        </Modal>
      )
    }

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
              <div>
                <label>Minute</label>
                <Input
                  name="minute"
                  value={minute}
                  onChange={this.handleChange}
                  type="number"
                  placeholder="Minute"
                />
              </div>

              <p>:</p>

              <div>
                <label>Second</label>
                <Input
                  name="second"
                  value={second}
                  onChange={this.handleChange}
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
                name="questions"
                value={questions}
                onChange={this.handleChange}
                type="number"
              />
            </div>

            <div className="randomQuestions-questions">
              <h3>Number of Random Questions</h3>

              <p>Number of questions from other multiples</p>

              <Input
                name="randomQuestions"
                value={randomQuestions}
                onChange={this.handleChange}
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

            <div className="buttons">
                <Button 
                  className="red"
                  onClick={this.handleCancelClick}
                >
                  Cancel
                </Button>

                <Button
                  className="green"
                  onClick={this.handleSaveClick}
                >
                  Save
                </Button>
            </div>
          </div>

        </ModalContent>
      </Modal>
    )
  }

  private handleChange = (e: any) => {
    const { value, name } = e.target

    const state = {}
    state[name] = value

    this.setState(state)
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

  private handleSaveClick = async () => {
    const { token, history } = this.props
    const { testParametersID, minute, numbers, operators, questions, randomQuestions, second } = this.state

    const duration = (minute * 60) + second

    try {
      await updateTestParameters(token, {
        _id: testParametersID,
        duration,
        numbers,
        operators,
        questions,
        randomQuestions,
      })

      history.push('/classes/detail')
      
    } catch(error) {
      console.log(error)
    }
  }

  private handleCancelClick = () => {
    this.props.history.push('/classes/detail')
  }
}
