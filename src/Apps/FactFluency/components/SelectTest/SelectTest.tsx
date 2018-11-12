import * as React from "react"
import { connect } from 'react-redux'
import { RouteComponentProps } from "react-router-dom"
import { themeColors } from "src/utils"
import { setNewTestParameters } from 'src/actions/factFluency'
import { handleReceiveAvailableTests } from "src/handlers/factFluency"
import { Loading } from "src/sharedComponents"
import './SelectTest.css'
import { TestNumber } from './TestNumber/TestNumber'

interface IAvailableTests {
  numbers: ITestNumber[]
}

interface ITestNumber {
  number: number
  operators: string[]
}

interface IProps extends RouteComponentProps<{}>  {
  availableTests?: IAvailableTests
  dispatch: any
  token: string
}

interface IState {
  error: string
  selectedNumber?: number
}

class DisconnectedSelectTest extends React.Component<IProps, IState> {
  public state: IState = {
    error: '',
  }
  
  public async componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)

    try {
      this.props.dispatch(handleReceiveAvailableTests(this.props.token))
      this.setState({ error: '' })
    } catch (error) {
      this.setState({ error })
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  
  public render() {
    const { availableTests } = this.props

    if (availableTests === undefined || availableTests === null) {
      return (
        <div className="SelectTest">
          <Loading className="loading" />
        </div>
      )
    }

    return (
      <div className="SelectTest">
        {availableTests.numbers.map((testNumber, i) => {
          const color = themeColors[i % themeColors.length]
          const active = (testNumber.number === this.state.selectedNumber)

          return (
            <TestNumber
              active={active}
              color={color}
              key={testNumber.number}
              num={testNumber}
              onClick={this.handleTestNumberClick}
              onSubmit={this.handleSubmit}
            />
          )
        })}
      </div>
    )
  }

  private handleSubmit = (testNumber: ITestNumber, operator: string) => {
    const { history, dispatch } = this.props

    dispatch(setNewTestParameters({
      testNumber,
      operator,
    }))

    history.push('/fact-fluency/start-test')
  }

  private handleTestNumberClick = (selectedNumber: number) => {
    this.setState({ selectedNumber })
  }
  
  private handleScroll = () => {
    if (this.state.selectedNumber !== undefined) {
      this.setState({ selectedNumber: undefined })
    }
  }
}

const mapStateToProps = ({ factFluency, user }: any) => ({
  availableTests: factFluency.availableTests,
  token: user.token
})

export const SelectTest = connect(mapStateToProps)(DisconnectedSelectTest)