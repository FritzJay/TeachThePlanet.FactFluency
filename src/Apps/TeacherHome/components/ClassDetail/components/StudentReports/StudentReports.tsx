import * as React from 'react'
import { Link } from 'react-router-dom'

import { Button, StudentCard, NewCard } from 'src/sharedComponents'
import { StudentsDescription } from '../StudentsDescription/StudentsDescription'
import { LinkList } from '../LinkList/LinkList'
import { IStudentUser } from 'src/utils'
import './StudentReports.css'

interface IState {
  activeDescription: boolean
}

interface IProps {
  students: IStudentUser[]
  courseId: string
  match: any
}

export class StudentReports extends React.Component<IProps> {
  public state: IState = {
    activeDescription: false,
  }

  public render() {
    const { students, courseId, match } = this.props
    const { activeDescription } = this.state

    return (
      <div className="StudentReports">
        <div className="section-header">
          <h2>Students</h2>
          <Button
            name="activeDescription"
            className="blue description-button"
            onClick={this.toggleDescription}
            >
            {!activeDescription
              ? 'More info'
              : 'Close'
            }
          </Button>
        </div>
    
        {activeDescription
          ? <StudentsDescription />
          : null
        }

        {students.length > 0
          ? <LinkList
            links={students.map(({ id, name }) => ({ id, text: name }))}
          /> : null
        }

        {students.length > 0
          ? students.sort((a, b) => a.name > b.name ? 1 : -1).map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              courseId={courseId}
            />
          )) : (
            <Link to={`${match.url}/add-students`}>
              <NewCard className="new-student-card" text="Add your first student!" />
            </Link>
        )}
      </div>
    )
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
