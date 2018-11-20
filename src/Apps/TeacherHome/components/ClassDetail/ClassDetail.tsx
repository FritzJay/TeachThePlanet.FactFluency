/* tslint:disable:jsx-no-lambda */

import * as React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'

import { IClass, getOperatorSymbol, ITest, ICourseInvitation, IStudentUser } from 'src/utils'
import { Card, Loading, NewCard } from 'src/sharedComponents'
import { handleRemoveInvitation } from 'src/handlers/invitations'
import { handleRemoveFromCourse } from 'src/handlers/students'
import './ClassDetail.css'

interface IInvitationCardProps {
  invitation: ICourseInvitation
  onDelete: (id: string) => void
}

const InvitationCard = ({ invitation, onDelete }: IInvitationCardProps) => {
  const date = new Date(invitation.createdAt)
  return (
    <Card className="InvitationCard">
      <h3>{invitation.student.name}</h3>
      <h4>Sent On: {date.getMonth()}/{date.getDay()}/{date.getFullYear()}</h4>
      <button onClick={() => onDelete(invitation.id)} className="delete">
        <i className="material-icons">delete</i>
      </button>
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
      <button
        className="settings"
        onClick={() => onDelete(id)}
      >
        <i className="material-icons">delete</i>
      </button>
      {operators.map((op) => <OperatorRow key={op.operator} {...op} />)}
    </Card>
  )
}


interface IProps extends RouteComponentProps<{ id: string }> {
  selectedClass: IClass
  dispatch: any
  token: string
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
          <h2>Students</h2>

          {selectedClass.students && Object.keys(selectedClass.students).length > 0
            ? Object.keys(selectedClass.students).map((id) => (
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

        <div className="invitations">
          <h2>Pending Invitations</h2>

          {selectedClass.courseInvitations
            ? Object.keys(selectedClass.courseInvitations).map((id: string) => (
              <InvitationCard
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
      dispatch(handleRemoveFromCourse(token, selectedClass.id, id))
    } catch (error) {
      console.warn(error)
      this.setState({ error: error.toString() })
    }
  }
}

const mapStateToProps = ({ teacherHome, user }: any, { match }: any) => ({
  selectedClass: teacherHome.classes
    ? teacherHome.classes[match.params.id]
    : undefined,
  token: user.token,
})

export const ClassDetail = connect(mapStateToProps)(DisconnectedClassDetail)