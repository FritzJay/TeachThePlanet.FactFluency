/* tslint:disable:jsx-no-lambda */

import * as React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps, Route } from 'react-router-dom'

import { IClass, getOperatorSymbol, ITest, ICourseInvitation, IStudentUser } from 'src/utils'
import { Card, Loading, NewCard, ConfirmButton, Button } from 'src/sharedComponents'
import { handleRemoveInvitation } from 'src/handlers/invitations'
import { handleRemoveStudentFromCourse } from 'src/handlers/students'
import './ClassDetail.css'

interface IInactiveStudentCardProps {
  className?: string
  student: IStudentUser
  onDelete: (id: string) => void
}

const InactiveStudentCard = ({ className, student, onDelete }: IInactiveStudentCardProps) => {
  const date = new Date(student.createdAt)
  return (
    <Card className={`InactiveStudentCard${className ? ' ' + className : ''}`}>
      <h3 className="student-name">
        {student.name.length > 8
          ? student.name.slice(0, 8) + '...'
          : student.name}
        &nbsp;&nbsp;
        <span className="email">{student.user.email}</span>
      </h3>
      <h4 className="date">Sent On: {date.getMonth()}/{date.getDay()}/{date.getFullYear()}</h4>
      <ConfirmButton
        className="delete"
        confirmClassName="confirm"
        onClick={() => onDelete(student.id)}
      >
        <span className="confirmation">Remove new student?</span>
        <i className="material-icons">delete</i>
      </ConfirmButton>
    </Card>
  )
}


interface IInvitationCardProps {
  className?: string
  invitation: ICourseInvitation
  onDelete: (id: string) => void
}

const InvitationCard = ({ className, invitation, onDelete }: IInvitationCardProps) => {
  const date = new Date(invitation.createdAt)
  return (
    <Card className={`InvitationCard${className ? ' ' + className : ''}`}>
      <h3 className="student-name">
        {invitation.student.name.length > 8
          ? invitation.student.name.slice(0, 8) + '...'
          : invitation.student.name}
        &nbsp;&nbsp;
        <span className="email">{invitation.student.user.email}</span>
      </h3>
      <h4 className="date">Sent On: {date.getMonth()}/{date.getDay()}/{date.getFullYear()}</h4>
      <ConfirmButton
        className="delete"
        confirmClassName="confirm"
        onClick={() => onDelete(invitation.id)}
      >
        <span className="confirmation">Remove invitation?</span>
        <i className="material-icons">delete</i>
      </ConfirmButton>
    </Card>
  )
}


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
  student: IStudentUser
  onDelete: (id: string) => void
}

const StudentCard = ({ student, onDelete }: IStudentCardProps) => {
  const { id, name, tests, user } = student
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
        onClick={() => onDelete(id)}
      >
        <span className="confirmation">Remove student from this class?</span>
        <i className="material-icons">delete</i>
      </ConfirmButton>
      {operators.map((op) => <OperatorRow key={op.operator} {...op} />)}
    </Card>
  )
}


const StudentsDescription = () => (
  <Card className="description-card">
    <p className="description">
      Below is a list of students that are part of your class. Each students progress with operator/multiple combinations are displayed in a grid. The color of the numbers can indicate the students progress with the multiple:
    </p>
    <ul className="description-list">
      <li>
        <button className="number not-taken">0</button>
        A gray number indicates the student has not taken the test.</li>
      <li>
        <button className="number in-progress">0</button>
        Red means they have taken the test, but have yet to pass</li>
      <li>
        <button className="number passed-once">0</button>
        Yellow shows they have passed the test at least once</li>
      <li>
        <button className="number passed">0</button>
        Green indicates they have passed the test three or more times</li>
    </ul>
  </Card>
)

interface IState {
  error: string
  studentsDescription: boolean
}

interface IProps extends RouteComponentProps<{ id: string }> {
  selectedClass: IClass
  dispatch: any
  token: string
}

class DisconnectedClassDetail extends React.Component<IProps, IState> {
  public state: IState = {
    error: '',
    studentsDescription: false,
  }

  public render() {
    const { match, selectedClass } = this.props
    const { studentsDescription } = this.state

    if (selectedClass === undefined) {
      return (
        <div className="ClassDetail">
          <Loading className="loading" />
        </div>
      )
    }

    return (
      <div className="ClassDetail">
        <h2 className="classes">
          <Link className="classrooms" to="/teacher/classes">
            <i className="material-icons big">arrow_back_ios</i>Classes
          </Link>
        </h2>
        
        <h1 className="class-name">
          {selectedClass.name}
        </h1>

        <div className="buttons">
          <Link
            className="detail-btn"
            to={`/teacher/parent-invitation/${match.params.id}`}
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
          <div className="header">
            <h2>Students</h2>
            <Button
              name="studentsDescription"
              className="blue description-button"
              onClick={this.toggleDescription}
            >
              {!studentsDescription
                ? 'More info'
                : 'Close'
              }
            </Button>
          </div>

          {studentsDescription
            ? <StudentsDescription />
            : null
          }

          <Route
            exact={true}
            path={`${this.props.match.path}/students-description`}
            component={StudentsDescription}
          />

          {selectedClass.students
            && Object.keys(selectedClass.students).length > 0
            && Object.keys(selectedClass.students).filter((id) => !selectedClass.students[id].changePasswordRequired).length > 0
              ? Object.keys(selectedClass.students)
                  .filter((id) => !selectedClass.students[id].changePasswordRequired)
                  .map((id) => (
                    <StudentCard
                      key={id}
                      student={selectedClass.students[id]}
                      onDelete={this.handleDeleteStudent}
                    />
                ))
              : (
                <Link to={`${match.url}/add-students`}>
                  <NewCard className="new-student-card" text="Add your first student!" />
                </Link>
              )
          }
        </div>
        
        <div className="pending-students">
          {selectedClass.students
            && Object.keys(selectedClass.students).length > 0
            && Object.keys(selectedClass.students).filter((id) => selectedClass.students[id].changePasswordRequired === true).length > 0
              ? (
                  <>
                    <h2>Pending Students</h2>
                    {Object.keys(selectedClass.students)
                    .filter((id) => selectedClass.students[id].changePasswordRequired === true)
                    .map((id: string) => (
                      <InactiveStudentCard
                        className="pending-card"
                        key={id}
                        student={selectedClass.students[id]}
                        onDelete={this.handleInvitationDelete}
                      />
                    ))}
                  </>
                )
              : null
          }
        </div>

        <div className="invitations">
          <h2>Pending Invitations</h2>

          {selectedClass.students
            ? Object.keys(selectedClass.courseInvitations).map((id: string) => (
              <InvitationCard
                className="pending-card"
                key={id}
                invitation={selectedClass.courseInvitations[id]}
                onDelete={this.handleInvitationDelete}
              />
            )) : null
          }

          <Link to={`${match.url}/add-students/existing`}>
            <NewCard className="new-invite-card" text="Invite a student!" />
          </Link>
        </div>
      </div>
    )
  }

  private handleInvitationDelete = (id: string) => {
    const { dispatch, token, selectedClass } = this.props
    try {
      dispatch(handleRemoveInvitation(token, selectedClass.id, id))
    } catch (error) {
      alert(error.message())
    }
  }

  private handleDeleteStudent = (id: string) => {
    const { dispatch, token, selectedClass } = this.props
    try {
      dispatch(handleRemoveStudentFromCourse(token, selectedClass.id, id))
    } catch (error) {
      console.warn(error)
      this.setState({ error: error.toString() })
    }
  }

  private toggleDescription = (e: any) => {
    const { name } = e.target
    this.setState((prevState) => {
      const state = {}
      state[name] = !prevState[name]
      return state
    })
  }
}

const mapStateToProps = ({ teacherHome, user }: any, { match }: any) => ({
  selectedClass: teacherHome.classes
    ? teacherHome.classes[match.params.id]
    : undefined,
  token: user.token,
})

export const ClassDetail = connect(mapStateToProps)(DisconnectedClassDetail)