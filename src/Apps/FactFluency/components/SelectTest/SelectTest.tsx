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

  return {
    classes,
    activeClass,
    availableNumbers: classes && classes[activeClass] && classes[activeClass].testParameters
      ? classes[activeClass].testParameters.numbers
      : undefined,
    availableOperators: classes && classes[activeClass] && classes[activeClass].testParameters
      ? classes[activeClass].testParameters.operators
      : undefined,
  }
}

export const SelectTest = connect(mapStateToProps)(DisconnectedSelectTest)