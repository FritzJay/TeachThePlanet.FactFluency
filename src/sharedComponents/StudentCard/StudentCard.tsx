import * as React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { GET_COURSE } from 'src/Apps/TeacherHome/components'
import { ITest, getOperatorSymbol, IStudentUser } from 'src/utils'
import { Card, ConfirmButton } from '..'
import { NewTestsIndicator } from './NewTestsIndicator/NewTestsIndicator'
import './StudentCard.css'

interface IStudentNumberProps {
  num: number
  tests: ITest[]
}

const StudentNumber = ({ num, tests }: IStudentNumberProps) => {
  const passing = tests.filter((test) => test.testResults && test.testResults.correct >= test.testResults.needed).length
  let className
  if (tests.length === 0) {
    className = ' not-taken'
  } else if (passing === 0) {
    className = ' in-progress'
  } else if (passing === 1) {
    className = ' passed-once'
  } else if (passing === 2) {
    className = ' passed-twice'
  } else if (passing === 3) {
    className = ' passed'
  }

  return (
    <button 
      key={num}
      className={`number${className}`}
    >
      {num}
    </button>
  )
}


interface IOperatorRowProps {
  operator: string
  symbol: string
  color: string
  tests: ITest[]
}

const OperatorRow = ({ operator, symbol, color, tests }: IOperatorRowProps) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  return (
    <div className={`OperatorRow ${operator}`}>
      <button className={`operator ${color}`}>{getOperatorSymbol(symbol)}</button>
      {numbers.map((num) => (
        <StudentNumber
          key={num}
          num={num}
          tests={tests.filter((test) => test.number === num)}
      />))}
    </div>
  )
}

const REMOVE_STUDENT_FROM_COURSE = gql`
  mutation removeStudentFromCourse($studentId: ObjID!, $courseId: ObjID!) {
    removeStudentFromCourse(studentId: $studentId, courseId: $courseId)
  }
`

interface IStudentCardProps {
  courseId: string
  student: IStudentUser
}

export const StudentCard = ({ courseId, student: { id, name, tests, user } }: IStudentCardProps) => {
  const operators = [
    {
      operator: 'addition',
      symbol: '+',
      color: 'red',
      tests: tests
        ? tests.filter((test) => test.operator === '+')
        : [],
    },
    {
      operator: 'subtraction',
      symbol: '-',
      color: 'blue',
      tests: tests
        ? tests.filter((test) => test.operator === '-')
        : [],
    },
    {
      operator: 'multiplication',
      symbol: '*',
      color: 'green',
      tests: tests
        ? tests.filter((test) => test.operator === '*')
        : [],
    },
    {
      operator: 'division',
      symbol: '/',
      color: 'yellow',
      tests: tests
        ? tests.filter((test) => test.operator === '/')
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
            {user.email !== name
              ? ` - ${user.email}`
              : ''
            }
          </h3>

          <NewTestsIndicator tests={tests} />

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

          {operators.map((op) => <OperatorRow key={op.operator} {...op} />)}
        </Card>
      )}
    </Mutation>
  )
}
