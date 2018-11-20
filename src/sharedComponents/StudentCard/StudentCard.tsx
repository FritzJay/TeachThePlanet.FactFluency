import * as React from 'react'
import { connect } from 'react-redux'

import { ITest, getOperatorSymbol, IStudentUser } from 'src/utils'
import { Card, ConfirmButton } from '..'
import { handleRemoveStudentFromCourse } from 'src/handlers/students'
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


interface IStudentCardProps {
  dispatch: any
  token: string
  courseId: string
  student: IStudentUser
}

class StudentCard extends React.Component<IStudentCardProps> {
  public render() {
    const { name, tests, user } = this.props.student
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
      <Card className="StudentCard">
        <h3 className="name">
          {name}
          {user.email !== name
            ? ` - ${user.email}`
            : ''
          }
        </h3>
        <ConfirmButton
          className="delete"
          confirmClassName="confirm"
          onClick={this.handleDeleteStudent}
        >
          <span className="confirmation">Remove student from this class?</span>
          <i className="material-icons">delete</i>
        </ConfirmButton>
        {operators.map((op) => <OperatorRow key={op.operator} {...op} />)}
      </Card>
    )
  }

  private handleDeleteStudent = (id: string) => {
    const { dispatch, token, courseId } = this.props
    try {
      dispatch(handleRemoveStudentFromCourse(token, courseId, id))
    } catch (error) {
      console.warn(error)
      this.setState({ error: error.toString() })
    }
  }
}

const mapStateToProps = ({ teacherHome, user }: any) => ({ token: user.token })

export const ConnectedStudentCard = connect(mapStateToProps)(StudentCard)