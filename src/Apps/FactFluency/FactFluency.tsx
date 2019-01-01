import * as React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Route, RouteComponentProps, Redirect } from 'react-router-dom'

import { Navbar, Loading, StudentCardQueryFragment } from 'src/sharedComponents'
import {
  SelectTest,
  SelectTestQueryFragment,
  SelectTestCacheFragment,
  TakeTestCacheFragment,
  TakeTestQueryFragment,
} from './components'
import './FactFluency.css'

export const QUERY = gql`
  query studentByToken($testCondition: TestCondition) {
    studentByToken {
      nodeId
      id
      ...SelectTestQueryFragment
      ...StudentCardQueryFragment
      testsByStudentIdList(condition: $testCondition) {
        nodeId
        id
        ...TakeTestQueryFragment 
      }
    }
  }
  ${SelectTestQueryFragment}
  ${StudentCardQueryFragment}
  ${TakeTestQueryFragment}
`

export const CACHE = gql`
  {
    ${SelectTestCacheFragment}
    ${TakeTestCacheFragment}
  }
`

export const FactFluency = ({ match }: RouteComponentProps) => {
  return (
    <Query query={CACHE}>
      {({ data: { activeCourseId, testId } }) => (
        <Query
          query={QUERY}
          partialRefetch={true}
        >
          {({ data: { studentByToken: student }, loading }) => {
            if (loading) {
              return (
                <div>
                  <Route component={Navbar} />

                  <div className="FactFluency">
                    <Loading className="loading" />
                  </div>
                </div>
              )
            }

            return (
              <div>
                <Route component={Navbar} />
                
                <div className="FactFluency">

                  <Route
                    exact={true}
                    path={match.path}
                    render={() => <Redirect to={`${match.url}/select-test`} />}
                  />

                  <Route
                    path={`${match.path}/select-test`}
                    render={(props) => (
                      <SelectTest
                        {...props}
                        activeCourseId={activeCourseId}
                        studentId={student.id}
                        courses={student.courses}
                        testId={testId}
                        student={student}
                      />
                    )}
                  />
                </div>
              </div>
            )
          }}
        </Query>
      )}
    </Query>
  )
}