import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import {
  ITestParameters,
  themeColors,
} from 'src/utils'
import { handleUpdateTestParameters } from 'src/handlers/testParameters'
import { Button, Input, Loading, Modal, ModalContent, ModalHeader, Operator } from 'src/sharedComponents'
import './TestParameters.css'

interface IState {
  error: string
  loading: boolean
  minute: number
  numbers: number[]
  operators: string[]
  questions: number
  randomQuestions: number
  second: number
  testParametersID: string
}

interface IProps extends RouteComponentProps<{ id: string }> {
  dispatch: any
  token: string
  testParameters: ITestParameters
}

class DisconnectedTestParameters extends React.Component<IProps, IState> {
  public state: IState = {
    error: '',
    loading: false,
    minute: 0,
    numbers: [],
    operators: [],
    questions: 0,
    randomQuestions: 0,
    second: 0,
    testParametersID: ''
  }

  public async componentDidMount() {
    const { testParameters } = this.props

    if (testParameters === undefined) {
      return
    }

    const { id, duration, operators, numbers, questions, randomQuestions } = testParameters
    
    const minute = Math.floor(duration / 60.0)
    const second = duration % 60
    
    this.setState({
      minute,
      numbers,
      operators,
      questions,
      randomQuestions,
      second,
      testParametersID: id,
    })
  }

  public render() {
    const { testParameters } = this.props
    const { error, loading, minute, second, questions, randomQuestions, operators, numbers } = this.state

    if (error !== '') {
      return (
        <Modal
          overlay={true}
          className="test-parameters-modal"
        >

          <ModalHeader className="parameters-header">
            <h1>Test Parameters</h1>
          </ModalHeader>

          <ModalContent className="parameter-content">
            <h1>{error}</h1>
            <h2>Please Try Again Later</h2>
          </ModalContent>
        </Modal>
      )
    }

    if ((testParameters === undefined || testParameters === null) || loading) {
      return (
        <Modal
          overlay={true}
          className="test-parameters-modal"
        >

          <ModalHeader className="parameters-header">
            <h1>Test Parameters</h1>
          </ModalHeader>

          <ModalContent className="parameter-content">
            <Loading />
          </ModalContent>
        </Modal>
      )
    }

    return (
      <Modal
        overlay={true}
        className="TestParametersModal"
      >

        <ModalHeader className="parameters-header">
          <h1 className="header">Test Settings</h1>
          <p>Set the parameters of the tests which will be available for selection by the students in this class.</p>
        </ModalHeader>

        <ModalContent className="parameter-content">
          <form className="form">

            <h3 className="operators-header">Operators</h3>
            <p className="operators-text">Select available operators for students</p>
            <div className="operators">
              {['+', '-', '*', '/'].map((symbol, i) => {
                const color = themeColors[i % themeColors.length]
                
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
            
            <h3 className="numbers-header">Multiples Available</h3>
            <p className="numbers-text">Select available numbers for students</p>
            <div className="numbers">
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
            
            <h3 className="questions-header">Number of Questions</h3>
            <Input
              className="questions"
              name="questions"
              value={questions}
              onChange={this.handleChange}
              type="number"
            />
            
            <h3 className="random-header">Number of Random Questions</h3>
            <p className="random-text">Number of questions from other multiples</p>
            <Input
              className="random"
              name="randomQuestions"
              value={randomQuestions}
              onChange={this.handleChange}
              type="number"
            />

            <h3 className="duration-header">Duration</h3>
            <label className="minutes-label" htmlFor="minute">Minutes</label>
            <Input
              className="minutes"
              name="minute"
              value={minute}
              onChange={this.handleChange}
              type="number"
            />
            <h3 className="separator">:</h3>
            <label className="seconds-label" htmlFor="second">Seconds</label>
            <Input
              className="seconds"
              name="second"
              value={second}
              onChange={this.handleChange}
              type="number"
            />

            <Button
              className="save green"
              type="submit"
              onClick={this.handleSaveClick}
            >
              Save
            </Button>

            <Button 
              className="cancel red"
              type="button"
              onClick={this.handleCancelClick}
            >
              Cancel
            </Button>

          </form>
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
    e.preventDefault()

    const num = parseInt(e.target.innerText, 10)
    const { numbers } = this.state

    if (numbers.includes(num)) {
      this.setState({ numbers: numbers.filter((n) => n !== num) })
    } else {
      this.setState({ numbers: numbers.concat([num]) })
    }
  }

  private handleSaveClick = async (e: any) => {
    e.preventDefault()

    const { dispatch, token, history, match } = this.props
    const { testParametersID, minute, numbers, operators, questions, randomQuestions, second } = this.state

    const duration = (parseInt(minute.toString(), 10) * 60) + parseInt(second.toString(), 10)
    const updates = {
      id: testParametersID,
      duration,
      numbers,
      operators,
      questions: parseInt(questions.toString(), 10),
      randomQuestions: parseInt(randomQuestions.toString(), 10),
    }

    dispatch(handleUpdateTestParameters(token, match.params.id, updates))
    history.goBack()
  }
  
  private handleCancelClick = () => this.props.history.goBack()
}

const mapStateToProps = ({ user, teacherHome }: any, { match }: any) => ({
  token: user.token,
  testParameters: teacherHome.classes
    ? teacherHome.classes[match.params.id].testParameters
    : undefined
})

export const TestParameters = connect(mapStateToProps)(DisconnectedTestParameters)