import * as React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { connect } from 'react-redux'
import { RouteComponentProps } from "react-router-dom"

import { TestNumber } from './TestNumber/TestNumber'
import { themeColors } from "src/utils"
import { setNewTestParameters } from 'src/actions/factFluency'
import { Loading } from "src/sharedComponents"
import './SelectTest.css'

const GET_TEST_PARAMETERS = gql`
  query course($courseId: ObjID!) {
    course(id: $courseId) {
      testParameters {
        operators
        numbers
      }
    }
  }
`

interface IProps extends RouteComponentProps<{}> {
  courseId: string
  dispatch: any
}

interface IState {
  selectedNumber?: number
}

class DisconnectedSelectTest extends React.Component<IProps, IState> {
  public state: IState = {}
  
  public async componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  
  public render() {
    return (
      <Query
        query={GET_TEST_PARAMETERS}
        variables={{ courseId: this.props.courseId }}
        pollInterval={5 * 1000 * 60}
      >
        {({ loading, error, data: { course } }: any) => {
          if (loading) {
            return (
              <div className="SelectTest">
                <Loading className="loading" />
              </div>
            ) 
          }
          
          if (error) {
            return (
              <div className="SelectTest">
                <h3 className="error">Error! {error.message}</h3>
              </div>
            )
          }

          const { numbers, operators } = course.testParameters
          
          return (
            <div className="SelectTest">
              {numbers.map((num: number, i: number) => {
                const color = themeColors[i % themeColors.length]
                const active = (num === this.state.selectedNumber)
                
                return (
                  <TestNumber
                  active={active}
                  color={color}
                  key={num}
                  num={num}
                    operators={operators}
                    onClick={this.handleTestNumberClick}
                    onSubmit={this.handleSubmit}
                  />
                )
              })}
            </div>
          )
        }}
      </Query>
    )
  }

  private handleSubmit = (num: number, operator: string) => {
    const { courseId, history, dispatch } = this.props

    dispatch(setNewTestParameters({
      courseId,
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

const mapStateToProps = ({ factFluency }: any) =>  ({
  courseId: factFluency.activeClass
})

export const SelectTest = connect(mapStateToProps)(DisconnectedSelectTest)