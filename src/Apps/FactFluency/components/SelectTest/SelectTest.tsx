/* tslint:disable:jsx-no-lambda */

import * as React from "react"
import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag"
import { connect } from 'react-redux'
import { RouteComponentProps } from "react-router-dom"

import { TestNumber } from './TestNumber/TestNumber'
import { themeColors } from "src/utils"
import { receiveTest, removeTest } from 'src/actions/factFluency'
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

export const CREATE_TEST = gql`
  mutation createTest($input: CreateTestInput!) {
    createTest(input: $input) {
      id
      duration
      number
      operator
      randomQuestions
      start
      end
      student {
        id
      }
      course {
        id
      }
      questions {
        id
        question
        studentAnswer
        start
        end
      }
    }
  }
`

interface IProps extends RouteComponentProps<{}> {
  courseId: string
  studentId: string
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
        {({ error: queryError, loading: queryLoading, data: { course } }: any) => {

          if (queryLoading) {
            return (
              <div className="SelectTest">
                <Loading className="loading" />
              </div>
            )
          }

          if (queryError) {
            return (
              <div className="SelectTest">
                <h3 className="error">Error! {queryError.message}</h3>
              </div>
            )
          }

          return (
            <Mutation
              mutation={CREATE_TEST}
              onCompleted={async ({ createTest }) => {
                await this.props.dispatch(removeTest())
                await this.props.dispatch(receiveTest(createTest))
                this.props.history.push('/fact-fluency/start-test')
              }}
            >
              {(createTest, { loading: mutationLoading, error: mutationError }: any ) => {
                if (mutationLoading) {
                  return (
                    <div className="SelectTest">
                      <Loading className="loading" />
                    </div>
                  ) 
                }
                
                if (mutationError) {
                  return (
                    <div className="SelectTest">
                      <h3 className="error">Error! {mutationError.message}</h3>
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
                          onSubmit={(operator: string) => {
                            const { courseId, studentId } = this.props
                            createTest({
                              variables: {
                                input: {
                                  number: num,
                                  operator,
                                  studentId,
                                  courseId,
                            }}})
                          }}
                        />
                      )
                    })}
                  </div>
                )
              }}
            </Mutation>
        )}}
      </Query>
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

const mapStateToProps = ({ factFluency }: any) =>  ({
  courseId: factFluency.activeClass,
  studentId: factFluency.id,
})

export const SelectTest = connect(mapStateToProps)(DisconnectedSelectTest)