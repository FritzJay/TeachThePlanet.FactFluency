import * as React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Route, RouteComponentProps, Redirect } from 'react-router-dom'

import { Navbar, Loading, StudentCardQueryFragment } from 'src/sharedComponents'
import {
  CourseInvitations,
  SelectTest,
  SelectTestQueryFragment,
  SelectTestCacheFragment,
  StartTest,
  TakeTest,
  TakeTestQueryFragment,
  TakeTestCacheFragment,
  TestResults,
  TestResultsQueryFragment,
  CourseRequests,
} from './components'
import './FactFluency.css'

export const QUERY = gql`
  query student($testId: ObjID, $courseId: ObjID) {
    student {
      id
      courses {
        id
        ...SelectTestQueryFragment
      }
      test(testId: $testId) {
        id
        ...TakeTestQueryFragment
        ...TestResultsQueryFragment
      }
      ...StudentCardQueryFragment
    }
  }
  ${SelectTestQueryFragment}
  ${TakeTestQueryFragment}
  ${TestResultsQueryFragment}
  ${StudentCardQueryFragment}
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
          variables={{
            testId,
            courseId: activeCourseId || null,
          }}
          partialRefetch={true}
        >
          {({ data: { student }, loading }) => {
            if (loading) {
              return (
                <div>
                  <Route component={Navbar} />

                  />
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

                  <Route
                    path={`${match.path}/start-test`}
                    render={() => (
                      <StartTest testId={student.test.id} />
                    )}
                  />

                  <Route
                    path={`${match.path}/take-test`}
                    render={() => (
                      <TakeTest test={student.test} />
                    )}
                  />

                  <Route
                    path={`${match.path}/test-results`}
                    render={(props) => <TestResults {...props} test={student.test} />}
                  />
                  
                  <Route
                    path={`${match.path}/select-test/course-invitations`}
                    component={CourseInvitations}
                  />
                  
                  <Route
                    path={`${match.path}/select-test/course-requests`}
                    component={CourseRequests}
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