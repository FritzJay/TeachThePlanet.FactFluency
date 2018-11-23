import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import { Loading } from 'src/sharedComponents'
import { ParentInvite } from '../ParentInvite/ParentInvite'
import { ConnectedPendingInvitations } from './PendingInvitations'
import { StudentReports } from './StudentReports'
import { IClass } from 'src/utils'
import { Links } from './Links'

import PendingStudent from 'src/images/pending-student-icon.svg'
import ExistingStudent from 'src/images/existing-student-icon.svg'
import './ClassDetail.css'
import { connect } from 'react-redux';


export const INVITATION_TYPES = {
  pendingStudent: {
    alt: 'Pending student',
    color: 'yellow',
    icon: PendingStudent,
    title: 'You have created an account for this student and they still need to sign in for the first time using the username displayed on the card. They must use the password that you designated. If you did not designate a password for the student, they must use this class code.',
  },
  existingStudent: {
    alt: 'Existing student',
    color: 'green',
    icon: ExistingStudent,
    title: 'This pre-existing student has been invited to join the class and can accept the invitation at any time.',
  },
}


interface IProps extends RouteComponentProps<{ id: string }> {
  selectedCourse: IClass
}

class ClassDetail extends React.Component<IProps> {
  public render() {
    const { match, selectedCourse } = this.props

    if (selectedCourse === undefined) {
      return (
        <div className="ClassDetail">
          <Loading className="loading" />
        </div>
      )
    }

    return (
      <>
        <div className="ClassDetail">
          <h2 className="classes">
            <Link className="classrooms" to="/teacher/classes">
              <i className="material-icons big">arrow_back_ios</i>Classes
            </Link>
          </h2>
          
          <h1 className="class-name">
            {selectedCourse.name}
          </h1>

          <Links
            match={match}
            onParentInvitesClick={this.handleParentInvitesClick}
          />

          <StudentReports
            courseId={selectedCourse.id}
            students={selectedCourse.students
              && Object.keys(selectedCourse.students)
                .map((id) => selectedCourse.students[id])
                .filter((student) => !student.changePasswordRequired)}
            match={match}
          />

          <ConnectedPendingInvitations
            selectedCourse={selectedCourse}
            match={match}
          />

        </div>

        <ParentInvite email={'Temp'} password={'Temp'} />
      </>
    )
  }

  private handleParentInvitesClick = () => {
    window.print()
  }
}

const mapStateToProps = ({ courses }: any, { match }: RouteComponentProps<{ id: string }>) => ({
  selectedCourse: courses
    ? courses[match.params.id]
    : {}
})

export const ConnectedClassDetail = connect(mapStateToProps)(ClassDetail)
