import * as React from 'react'
import { Link } from 'react-router-dom'

import { Button, ConnectedStudentCard, NewCard } from 'src/sharedComponents'
import { StudentsDescription } from './StudentsDescription'
import { IStudentUser } from 'src/utils'

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
      <div className="students">
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
          ? students.sort((a, b) => a.name > b.name ? 1 : -1).map((student) => (
            <ConnectedStudentCard
              key={student.id}
              courseId={courseId}
              student={student}
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
