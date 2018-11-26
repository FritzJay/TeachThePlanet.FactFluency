/* tslint:disable:jsx-no-lambda */

import * as React from "react"
import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag"

import { TestNumber } from './TestNumber/TestNumber'
import { themeColors } from "src/utils"
import { Loading } from "src/sharedComponents"
import './SelectTest.css'

const GET_STUDENT = gql`
  query student {
    student {
      id
      name
      user {
        id
        email
      }
      courses {
        id
        name
        code
        teacher {
          name
        }
        testParameters {
          id
          operators
          numbers
        }
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

interface IState {
  selectedNumber?: number
}

export class SelectTest extends React.Component<any, IState> {
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
        query={GET_STUDENT}
        pollInterval={5 * 1000 * 60}
      >
        {({ client, error: queryError, loading: queryLoading, data: { student } }: any) => {

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
                client.writeData({ data: {
                  test: createTest.id
                } })
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

                const activeCourse = student.courses.length > 0 && student.courses[0]
                client.writeData({ data: { activeCourse } })
  
                const numbers = activeCourse
                  ? activeCourse.testParameters.numbers
                  : new Array(13).fill(0).map((n, i) => i)
  
                const operators = activeCourse
                  ? activeCourse.testParameters.operators
                  : ['+', '-', '*', '/']

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
                            createTest({
                              variables: {
                                input: {
                                  number: num,
                                  operator,
                                  studentId: student.id,
                                  courseId: activeCourse.id,
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