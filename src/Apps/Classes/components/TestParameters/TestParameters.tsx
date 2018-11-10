import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import {
  ITestParameters,
  themeColors,
} from 'src/lib'
import { removeTestParameters } from 'src/redux/actions/classes'
import { handleReceiveTestParameters, handleUpdateTestParameters } from 'src/redux/handlers/classes'
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

interface IProps extends RouteComponentProps<{}> {
  dispatch: any
  token: string
  selectedClass: string
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
    const { dispatch, token, selectedClass } = this.props

    try {
      dispatch(handleReceiveTestParameters(token, selectedClass, (testParameters) => {
        const { _id, duration, operators, numbers, questions, randomQuestions } = testParameters
        
        const minute = Math.floor(duration / 60.0)
        const second = duration % 60
        
        this.setState({
          minute,
          numbers,
          operators,
          questions,
          randomQuestions,
          second,
          testParametersID: _id,
        })
      }))

    } catch(error) {
      console.warn(error)
    }
  }

  public componentWillUnmount() {
    this.props.dispatch(removeTestParameters())
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
            <p className="operators-text">Select as many as you wish</p>
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
            <p className="numbers-text">Select as many as you wish</p>
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

    const { dispatch, token, history } = this.props
    const { testParametersID, minute, numbers, operators, questions, randomQuestions, second } = this.state

    const duration = (parseInt(minute.toString(), 10) * 60) + parseInt(second.toString(), 10)
    const updates = {
      _id: testParametersID,
      duration,
      numbers,
      operators,
      questions,
      randomQuestions,
    }

    this.setState({ loading: true }, () => {
      try {
        dispatch(handleUpdateTestParameters(token, updates, (tp) => {
          history.push('/classes/detail')
        }))
  
      } catch(error) {
        console.warn(error)
        this.setState({
          error: error.toString(),
          loading: false,
        })
      }
    })
  }
  
  private handleCancelClick = () => this.props.history.push('/classes/detail')
}

const mapStateToProps = ({ user, classes }: any) => ({
  token: user.token,
  selectedClass: classes.selectedClass,
  testParameters: classes.testParameters,
})

export const TestParameters = connect(mapStateToProps)(DisconnectedTestParameters)