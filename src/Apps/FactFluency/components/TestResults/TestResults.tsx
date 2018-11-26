import * as React from 'react'
import { Mutation, Query } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { IQuestion, getOperatorSymbol, ITest } from 'src/utils'
import { Button, Card, Loading } from 'src/sharedComponents'
import { CREATE_TEST } from '../SelectTest/SelectTest'
import './TestResults.css'
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-boost';

interface IQuickestCardProps {
  question?: IQuestion
}

const QuickestCard = ({ question }: IQuickestCardProps) => {
  if (question && question.start && question.end) {
    const durationInSeconds = (new Date(question.end).getTime() - new Date(question.start).getTime()) / 1000
    
    return (
      <Card className="QuickestCard">
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
}

const IncorrectCard = ({ question }: IIncorrectCardProps) => {
  if (question) {
    const youAnsweredMessage = question.studentAnswer ? `You answered ${question.studentAnswer}` : 'You didn\'t answer this question'

    return (
      <Card className="IncorrectCard">
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



const GET_TEST_ID = gql`
  {
    test @client
  }
`

const GET_TEST = gql`
  query Test($id: ObjID!) {
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

export const TestResultsContainer = (props: any) => (
  <Query query={GET_TEST_ID}>
    {({ data: { test: id }, loading: firstLoading, error: firstError }) => (
      <Query query={GET_TEST} variables={{ id }}>
        {({ data: { test }, client, loading: secondLoading, error: secondError }) => {
          if (firstLoading || secondLoading) {
            return (
              <div className="TestResults">
                <Loading className="loading" />
              </div>
            )
          }
          if (firstError || secondError) {
            return (
              <div className="TestResults">
                <h3 className="error">{firstError ? firstError.message : secondError ? secondError.message : ''}</h3>
              </div>
            )
          }
          return <TestResults
            {...props}
            client={client}
            test={test}
          />
        }}
      </Query>
    )}
  </Query>
)

interface IProps extends RouteComponentProps<{}> {
  test: ITest
  client: ApolloClient<any>
}

const TestResults = ({ history, test, client }: IProps) => {
  const { student, course, operator, number: num, testResults } = test

  if (testResults === undefined) {
    history.goBack()
    return null
  }
  
  const { total, needed, correct, incorrect, quickest } = testResults

  return (
    <Mutation
      mutation={CREATE_TEST}
      onCompleted={async ({ createTest }) => {
        await client.writeData({ data: {
          test: createTest.id,
          testResults: null,
        } })
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

            <QuickestCard question={quickest} />

            <IncorrectCard question={incorrect} />

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
              await client.writeData({ data: {
                test: null,
                testResults: null,
              }})
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
