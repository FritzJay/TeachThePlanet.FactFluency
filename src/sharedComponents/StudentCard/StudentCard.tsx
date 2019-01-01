import * as React from 'react'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'

import { GET_COURSE } from 'src/Apps/TeacherHome/components'
import { IStudentUser } from 'src/utils'
import { StudentNumberQueryFragment } from './StudentNumber/StudentNumber'
import { OperatorRowQueryFragment, OperatorRow } from './OperatorRow/OperatorRow'
import { Card, ConfirmButton } from '..'
/*import { NewTestsIndicator } from './NewTestsIndicator/NewTestsIndicator'*/
import { NewTestsIndicatorQueryFragment } from './NewTestsIndicator/NewTestsIndicator'
import './StudentCard.css'

export const StudentCardQueryFragment = gql`
  fragment StudentCardQueryFragment on Student {
    nodeId
    id
    name
    testsByStudentIdList(condition: $testCondition) {
      nodeId
      id
      ...StudentNumberQueryFragment
      ...OperatorRowQueryFragment
      ...NewTestsIndicatorQueryFragment
    }
    userByUserId {
      nodeId
      id
      email
      username
    }
  }
  ${StudentNumberQueryFragment}
  ${OperatorRowQueryFragment}
  ${NewTestsIndicatorQueryFragment}
`

const REMOVE_STUDENT_FROM_COURSE = gql`
  mutation removeStudentFromCourse($studentId: ObjID!, $courseId: ObjID!) {
    removeStudentFromCourse(studentId: $studentId, courseId: $courseId)
  }
`

interface IStudentCardProps {
  courseId: string
  student: any // TODO replace with IStudentUser
  showDeleteButton?: boolean
}

export const StudentCard = ({ courseId, showDeleteButton, student: { id, name, tests, userByUserId } }: IStudentCardProps) => {
  const operators = [
    {
      operator: 'addition',
      symbol: '+',
      color: 'red',
      tests: tests
        ? tests.filter((test: any) => test.operator === '+')
        : [],
    },
    {
      operator: 'subtraction',
      symbol: '-',
      color: 'blue',
      tests: tests
        ? tests.filter((test: any) => test.operator === '-')
        : [],
    },
    {
      operator: 'multiplication',
      symbol: '*',
      color: 'green',
      tests: tests
        ? tests.filter((test: any) => test.operator === '*')
        : [],
    },
    {
      operator: 'division',
      symbol: '/',
      color: 'yellow',
      tests: tests
        ? tests.filter((test: any) => test.operator === '/')
        : [],
    },
  ]
  return (
    <Mutation
      mutation={REMOVE_STUDENT_FROM_COURSE}
      optimisticResponse={{ removeStudentFromCourse: true }}
      update={cache => {
        const { course }: any = cache.readQuery({
          query: GET_COURSE,
          variables: { id: courseId },
        })
        cache.writeQuery({
          query: GET_COURSE,
          data: {
            course: {
              ...course,
              students: course && course.students
                ? course.students.filter((student: IStudentUser) => student.id !== id)
                : []
            }
          }
        })
      }}
    >
      {removeStudentFromCourse => (
        <Card className="StudentCard" id={id}>
          <h3 className="name">
            {name}
            {userByUserId.email !== name
              ? ` - ${userByUserId.email}`
              : ''
            }
          </h3>

          {/*<NewTestsIndicator tests={tests} />*/}

          {showDeleteButton
            ? (
              <ConfirmButton
                className="delete"
                confirmClassName="confirm"
                onClick={() => removeStudentFromCourse({
                  variables: { studentId: id, courseId }
                })}
              >
                <span className="confirmation">Remove student from this class?</span>
                <i className="material-icons">delete</i>
              </ConfirmButton>
            ) : null
          }

          {operators.map((op) => <OperatorRow key={op.operator} {...op} />)}
        </Card>
      )}
    </Mutation>
  )
}
