import * as React from 'react'
import { ApolloClient } from 'apollo-boost'
import { Mutation, compose, graphql, withApollo } from 'react-apollo'
import { RouteComponentProps, Redirect } from 'react-router-dom'

import { IQuestion, getOperatorSymbol, ITest } from 'src/utils'
import { Button, Card, Loading } from 'src/sharedComponents'
import { CREATE_TEST } from '../SelectTest/SelectTest'
import './TestResults.css'
import gql from 'graphql-tag';

interface IQuickestCardProps {
  question?: IQuestion
  shareWidth: boolean
}

const QuickestCard = ({ question, shareWidth }: IQuickestCardProps) => {
  if (question && question.start && question.end) {
    const durationInSeconds = (new Date(question.end).getTime() - new Date(question.start).getTime()) / 1000
    
    return (
      <Card className={`QuickestCard${shareWidth ? ' share-width' : ''}`}>
        <div className="header">
          <h3>You Rocked This Problem!</h3>
        </div>
        <div className="card-main-content">
          <h3>{question.question} = {question.correctAnswer}</h3>
          <p className="breakdown-text">It only took you {durationInSeconds} second.</p>
        </div>
      </Card>
    )
  } else {
    return null
  }
}


interface IIncorrectCardProps {
  question?: IQuestion
  shareWidth: boolean
}

const IncorrectCard = ({ question, shareWidth }: IIncorrectCardProps) => {
  if (question) {
    const youAnsweredMessage = question.studentAnswer ? `You answered ${question.studentAnswer}` : 'You didn\'t answer this question'

    return (
      <Card className={`IncorrectCard${shareWidth ? ' share-width' : ''}`}>
        <div className="header">
          <h3>This Gave You Some Trouble.</h3>
        </div>
        <div className="card-main-content">
            <h3>{question.question} = {question.correctAnswer}</h3>
            <h3>{youAnsweredMessage}</h3>
            <p className="breakdown-text">Hint: It might be a good idea to practice this one.</p>
        </div>
      </Card>
    )
  } else {
    return null
  }
}

interface IProps extends RouteComponentProps<{}> {
  data: {
    loading: boolean
    error: Error
    test: ITest
    noTest: boolean
  }
  client: ApolloClient<any>
}

const TestResults = ({ history, data, client }: IProps) => {
  if (data.loading) {
    return (
      <div className="TestResults">
        <Loading className="loading" />
      </div>
    )
  }
  if (data.error) {
    return (
      <div className="TestResults">
        <h3 className="error">{data.error.message}</h3>
      </div>
    )
  }
  if (data.noTest || data.test.testResults === undefined) {
    return <Redirect to="/fact-fluency" />
  }
  
  const { student, course, operator, number: num, testResults } = data.test
  const { total, needed, correct, incorrect, quickest } = testResults
  
  return (
    <Mutation
      mutation={CREATE_TEST}
      onCompleted={async ({ createTest }) => {
        await client.writeData({ data: { testId: createTest.id } })
        history.push('/fact-fluency/start-test')
      }}
    >
      {(createTest, { loading, error }: any ) => {
        if (loading) {
          return (
            <div className="TestResults">
              <Loading className="loading" />
            </div>
          )
        }

        if (error) {
          return (
            <div className="TestResults">
              <h3 className="error">{error}</h3>
            </div>
          )
        }

        return (
          <div className="TestResults">
            <h1 className="header">{`You ${correct >= needed ? 'passed' : 'did not pass'} your ${getOperatorSymbol(operator)} ${num}s`}</h1>

            <h2 className="subheader">
              You got <span className={correct >= needed ? 'pass' : 'fail'}>{correct}</span> out of <span className="pass">{total}</span> correct!
            </h2>

            <p className="detail">Remember you need {needed}/{total} to pass.</p>

            <QuickestCard question={quickest} shareWidth={incorrect !== undefined && incorrect !== null} />

            <IncorrectCard question={incorrect} shareWidth={quickest !== undefined && quickest !== null} />

            <hr />

            <Button className="blue retry" onClick={async () => await createTest({
              variables: {
                input: {
                  number: num,
                  operator,
                  studentId: student.id,
                  courseId: course.id,
                }
              }
            })}>
              <span className="btn-text">Retry</span>
              <span className="btn-icon">
                <i className="material-icons">replay</i>
              </span>
            </Button>

            <Button className="blue home" onClick={async () => {
              await client.writeData({ data: { testId: null }})
              history.push('/fact-fluency')
            }}>
              <span className="btn-text">Home</span>
              <span className="btn-icon">
                <i className="material-icons">home</i>
              </span>
            </Button>
          </div>
        )
      }}
    </Mutation>
  )
}

const GET_TEST_ID = gql`
  {
    testId @client
  }
`

const GET_TEST = gql`
  query test($id: ObjID!) {
    test(id: $id) {
      id
      number
      operator
      student {
        id
      }
      course {
        id
      }
      testResults {
        id
        total
        needed
        correct
        incorrect {
          start
          end
          question
          correctAnswer
        }
        quickest {
          start
          end
          question
          correctAnswer
        }
      }
    }
  }
`

export const TestResultsWithData = compose(
  graphql(
    GET_TEST_ID,
    {
      props: (props: any) => {
        if (props.data.testId === null || props.data.testId === undefined) {
          return {
            data: {
              ...props.data,
              noTest: true,
            }
          }
        }
        return {
          data: {
            ...props.data,
            noTest: false,
          }
        }
      }
    }
  ),
  graphql(
    GET_TEST,
    {
      options: ({ data }: any) => ({
        variables: { id: data.testId }
      }),
      skip: ({ data: { noTest } }) => noTest === true,
    }
  )
)(withApollo(TestResults))