import * as React from "react"
import { connect } from 'react-redux'
import { RouteComponentProps } from "react-router-dom"
import { themeColors, IClass } from "src/utils"
import { setNewTestParameters } from 'src/actions/factFluency'
import { Loading } from "src/sharedComponents"
import './SelectTest.css'
import { TestNumber } from './TestNumber/TestNumber'

interface IProps extends RouteComponentProps<{}>  {
  classes?: IClass[]
  dispatch: any
  activeClass?: IClass
  availableOperators?: string[]
  availableNumbers?: number[]
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
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  
  public render() {
    const { availableNumbers, availableOperators, classes } = this.props

    if (classes === undefined || availableNumbers === undefined || availableOperators === undefined) {
      return (
        <div className="SelectTest">
          <Loading className="loading" />
        </div>
      )
    }

    return (
      <div className="SelectTest">
        {availableNumbers.map((num, i) => {
          const color = themeColors[i % themeColors.length]
          const active = (num === this.state.selectedNumber)

          return (
            <TestNumber
              active={active}
              color={color}
              key={num}
              num={num}
              operators={availableOperators}
              onClick={this.handleTestNumberClick}
              onSubmit={this.handleSubmit}
            />
          )
        })}
      </div>
    )
  }

  private handleSubmit = (num: number, operator: string) => {
    const { history, dispatch } = this.props

    dispatch(setNewTestParameters({
      num,
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

const mapStateToProps = ({ factFluency }: any) => {
  const { classes, activeClass } = factFluency
  const hasTestParameters = classes && classes[activeClass] && classes[activeClass].testParameters

  return {
    classes,
    activeClass,
    availableNumbers: hasTestParameters
      ? classes[activeClass].testParameters.numbers
      : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    availableOperators: hasTestParameters
      ? classes[activeClass].testParameters.operators
      : ['+', '-', '*', '/'],
  }
}

export const SelectTest = connect(mapStateToProps)(DisconnectedSelectTest)