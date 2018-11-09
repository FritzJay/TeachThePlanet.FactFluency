import * as React from "react"
import { fetchAvailableTests } from "src/lib/Api/Tests";
import { IAvailableTests, ITestNumber } from "src/lib/Interfaces"
import { Themes } from "src/lib/lib"
import { Loading } from "src/sharedComponents";
import './SelectTest.css'
import { TestNumber } from './TestNumber/TestNumber'

interface IProps  {
  token: string
  onSubmit: (testNumber: ITestNumber) => void
  storeAvailableTests: (availableTests: IAvailableTests) => void
}

interface IState {
  availableTests?: IAvailableTests
  error: string
  selectedNumber?: number
}

export class SelectTest extends React.Component<IProps, IState> {
  public state: IState = {
    error: '',
  }
  
  public async componentDidMount() {
    const { token, storeAvailableTests } = this.props

    window.addEventListener('scroll', this.handleScroll)

    try {
      const availableTests = await fetchAvailableTests(token)
      
      storeAvailableTests(availableTests)

      this.setState({
        availableTests,
        error: '',
      })
    } catch (error) {
      this.setState({ error })
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  
  public render() {
    if (this.state.availableTests === undefined) {
      return (
        <div className="SelectTest">
          <Loading className="loading" />
        </div>
      )
    }

    return (
      <div className="SelectTest">
        {this.state.availableTests.numbers.map((testNumber, i) => {
          const color = Themes.themeColors[i % Themes.themeColors.length]
          const active = (testNumber.number === this.state.selectedNumber)

          return (
            <TestNumber
              active={active}
              color={color}
              key={testNumber.number}
              num={testNumber}
              onClick={this.handleTestNumberClick}
              onSubmit={this.props.onSubmit}
            />
          )
        })}
      </div>
    )
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