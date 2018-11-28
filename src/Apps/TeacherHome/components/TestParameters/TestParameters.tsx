import * as React from 'react'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'

import {
  IClass,
  themeColors,
} from 'src/utils'
import { Button, Input, Loading, Modal, ModalContent, ModalHeader, Operator } from 'src/sharedComponents'
import './TestParameters.css'

interface IState {
  error: string
  minute?: number
  numbers?: number[]
  operators?: string[]
  questions?: number
  randomQuestions?: number
  second?: number
}

interface IProps extends RouteComponentProps<{ id: string }> {
  data: {
    loading: boolean
    error: Error
    course: IClass
  }
  mutate: any
}

class TestParameters extends React.Component<IProps, IState> {
  public state: IState = {
    error: '',
  }

  private minute = React.createRef()
  private second = React.createRef()
  private questions = React.createRef()
  private randomQuestions = React.createRef()
  
  public async componentDidMount() {
    const { loading, error, course } = this.props.data
    if (loading || error) {
      return
    }

    const { duration, operators, numbers, questions, randomQuestions } = course.testParameters
    
    const minute = Math.floor(duration / 60.0)
    const second = duration % 60
    
    this.setState({
      minute,
      numbers,
      operators,
      questions,
      randomQuestions,
      second,
    })
  }

  public render() {
    const { error, loading, course } = this.props.data
    
    if (loading) {
      return (
        <Modal
        overlay={true}
        closeTo={`/teacher/class-detail/${this.props.match.params.id}`}
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
    
    if (error || this.state.error !== '') {
      return (
        <Modal
        overlay={true}
        closeTo={`/teacher/class-detail/${this.props.match.params.id}`}
        className="test-parameters-modal"
        >

          <ModalHeader className="parameters-header">
            <h1>Test Parameters</h1>
          </ModalHeader>

          <ModalContent className="parameter-content">
            <h1>{error.message || (this.state && this.state.error)}</h1>
            <h2>Please Try Again Later</h2>
          </ModalContent>
        </Modal>
      )
    }

    const testParameters = course.testParameters
    const { operators, numbers } = this.state

    return (
      <Modal
        overlay={true}
        closeTo={`/teacher/class-detail/${this.props.match.params.id}`}
        className="TestParametersModal"
      >

        <ModalHeader className="parameters-header">
          <h1 className="header">Test Settings</h1>
          <p>Set the parameters of the tests which will be available for selection by the students in this class.</p>
        </ModalHeader>

        <ModalContent className="parameter-content">
          <form className="form" onSubmit={this.handleSubmit}>

            <h3 className="operators-header">Operators</h3>
            <p className="operators-text">Select available operators for students</p>
            <div className="operators">
              {['+', '-', '*', '/'].map((symbol, i) => {
                const color = themeColors[i % themeColors.length]
                
                return (
                  <Operator
                    key={symbol}
                    active={true}
                    selected={operators
                      ? operators.includes(symbol)
                      : this.props.data.course.testParameters.operators.includes(symbol)}
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
                  className={`select-multiples${(numbers
                    ? numbers.includes(num)
                    : this.props.data.course.testParameters.numbers.includes(num))
                      ? ' active' : ''
                  }`}
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
              defaultValue={testParameters.questions}
              createRef={this.questions}
              onChange={this.handleChange}
              type="number"
            />
            
            <h3 className="random-header">Number of Random Questions</h3>
            <p className="random-text">Number of questions from other multiples</p>
            <Input
              className="random"
              name="randomQuestions"
              defaultValue={testParameters.randomQuestions}
              createRef={this.randomQuestions}
              onChange={this.handleChange}
              type="number"
            />

            <h3 className="duration-header">Duration</h3>
            <label className="minutes-label" htmlFor="minute">Minutes</label>
            <Input
              className="minutes"
              name="minute"
              defaultValue={Math.floor(testParameters.duration / 60)}
              createRef={this.minute}
              onChange={this.handleChange}
              type="number"
            />
            <h3 className="separator">:</h3>
            <label className="seconds-label" htmlFor="second">Seconds</label>
            <Input
              className="seconds"
              name="second"
              defaultValue={testParameters.duration % 60}
              createRef={this.second}
              onChange={this.handleChange}
              type="number"
            />

            <Button
              className="save green"
              type="submit"
            >
              Save
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

  private getNumberValue = (name: any): number => {
    return parseInt(this[name].current.value.toString(), 10)
  }

  private handleOperatorClick = (operator: string) => {
    const { operators } = this.state
    const testParameters = this.props.data.course.testParameters

    if (operators ? operators.includes(operator) : testParameters.operators.includes(operator)) {
      this.setState({ operators: operators
        ? operators.filter((o) => o !== operator)
        : testParameters.operators.filter((o) => o !== operator)
      })
    } else {
      this.setState({ operators: operators
        ? operators.concat([operator])
        : testParameters.operators.concat([operator])
      })
    }
  }

  private handleNumberClick = (e: any) => {
    e.preventDefault()

    const num = parseInt(e.target.innerText, 10)
    const { numbers } = this.state
    const testParameters = this.props.data.course.testParameters

    if (numbers ? numbers.includes(num) : testParameters.numbers.includes(num)) {
      this.setState({ numbers: numbers
        ? numbers.filter((n) => n !== num)
        : testParameters.numbers.filter((n) => n !== num)
      })
    } else {
      this.setState({ numbers: numbers
        ? numbers.concat([num])
        : testParameters.numbers.concat([num])
      })
    }
  }

  private handleSubmit = async (e: any) => {
    e.preventDefault()
    const testParameters = this.props.data.course.testParameters
    const { numbers, operators } = this.state
    const duration = (this.getNumberValue('minute') * 60) + this.getNumberValue('second')
    const input = {
      duration,
      numbers,
      operators,
      questions: this.getNumberValue('questions'),
      randomQuestions: this.getNumberValue('randomQuestions'),
    }
    await this.props.mutate({
      variables: { id: testParameters.id, input },
      optimisticResponse: {
        updateTestParameters: {
          __typename: 'TestParameters',
          id: testParameters.id,
          ...input,
        },
      },
    })
    this.props.history.push(`/teacher/class-detail/${this.props.match.params.id}`)
  }
}

const GET_COURSE = gql`
  query course($id: ObjID!) {
    course(id: $id) {
      id
      testParameters {
        id
        duration
        numbers
        operators
        questions
        randomQuestions
      }
    }
  }
`

const UPDATE_TEST_PARAMETERS = gql`
  mutation updateTestParameters($id: ObjID!, $input: UpdateTestParametersInput!) {
    updateTestParameters(id: $id, input: $input) {
      id
      duration
      questions
      randomQuestions
      numbers
      operators
    }
  }
`

export const TestParametersWithData = compose(
  graphql(GET_COURSE, {
    options: ({ match }: any) => ({
      variables: {
        id: match.params.id,
      },
    })
  }),
  graphql(UPDATE_TEST_PARAMETERS, {
    options: ({ match }: any ) => ({
      update: (cache, { data: { updateTestParameters } }: any) => {
        const data: any = cache.readQuery({
          query: GET_COURSE,
          variables: { id: match.params.id }
        })
        cache.writeQuery({
          query: GET_COURSE,
          data: {
            course: {
              ...data.course,
              testParameters: updateTestParameters,
            },
          },
        })
      }
    })
  })
)(TestParameters)