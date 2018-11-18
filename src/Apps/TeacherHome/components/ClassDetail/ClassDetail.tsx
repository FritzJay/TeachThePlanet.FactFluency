import * as React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { IClass, IStudent, getOperatorSymbol, ITest } from 'src/utils'
import { Card, Loading } from 'src/sharedComponents'
import './ClassDetail.css'

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
  student?: IStudent
}

const StudentCard = ({ student }: IStudentCardProps) => {
  if (student === undefined || student.tests === undefined) {
    return (
      <Card className="StudentCard">
        <div className="header-row">
          <h3 className="student-name">There doesn't appear to be any students here. Why don't you add one?</h3>
        </div>
      </Card>
    )
  }

  const { name, tests } = student
  const operators = [
    {
      operator: 'addition',
      symbol: '+',
      color: 'red',
      tests: tests.filter((test) => test.operator === '+'),
    },
    {
      operator: 'subtraction',
      symbol: '-',
      color: 'blue',
      tests: tests.filter((test) => test.operator === '-'),
    },
    {
      operator: 'multiplication',
      symbol: '*',
      color: 'green',
      tests: tests.filter((test) => test.operator === '*'),
    },
    {
      operator: 'division',
      symbol: '/',
      color: 'yellow',
      tests: tests.filter((test) => test.operator === '/'),
    },
  ]

  return (
    <Card className="StudentCard">
      <h3 className="name">{name}</h3>
      <button className="settings">
        <i className="material-icons">settings</i>
      </button>
      {operators.map((op) => <OperatorRow key={op.operator} {...op} />)}
    </Card>
  )
}


interface IProps extends RouteComponentProps<{}> {
  selectedClass: IClass
}

class DisconnectedClassDetail extends React.Component<IProps> {
  public render() {
    const { match, selectedClass } = this.props

    if (selectedClass === undefined) {
      return (
        <div className="ClassDetail">
          <Loading className="loading" />
        </div>
      )
    }

    return (
      <div className="ClassDetail">
        <div className="link">
          <h2>
            <Link className="classrooms" to="/teacher/classes">
              <i className="material-icons big">arrow_back_ios</i>
              Classes
            </Link>
            /{selectedClass.name}
          </h2>
        </div>

        <div className="buttons">
          <Link
            className="detail-btn"
            to={`${match.url}/parent-invitations`}
          >
            Parent Invites
          </Link>
          <Link
            className="detail-btn"
            to={`${match.url}/add-students`}
          >
            Add Student
          </Link>
          <Link
            className="detail-btn"
            to={`${match.url}/remove-students`}
          >
            Remove Student
          </Link>
          <Link
            className="detail-btn"
            to={`${match.url}/test-parameters`}
          >
            Test Settings
          </Link>
          <Link
            className="detail-btn"
            to={`${match.url}/class-settings`}
          >
            Class Settings
          </Link>
        </div>

        <div className="students">
          {selectedClass.students
            ? selectedClass.students.map((student) => <StudentCard key={student.id} student={student} />)
            : <StudentCard />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ teacherHome }: any, { match }: any) => ({
  selectedClass: teacherHome.classes
    ? teacherHome.classes[match.params.id]
    : undefined
})

export const ClassDetail = connect(mapStateToProps)(DisconnectedClassDetail)