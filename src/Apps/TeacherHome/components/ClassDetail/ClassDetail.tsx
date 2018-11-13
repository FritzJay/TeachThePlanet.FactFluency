import * as React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { IClass } from 'src/utils';
import { Card, Loading } from 'src/sharedComponents'
import './ClassDetail.css'

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
        <div className="header-row">
          <h2>
            <Link className="classrooms" to="/teacher/classes">
              <i className="material-icons big">arrow_back_ios</i>
              Classes
            </Link>
            /Class Name
          </h2>
          <div className="btn-row">
            <Link className="parent-invitations detail-btn" to={`${match.url}/parent-invitations`}>
              Parent Invites
            </Link>
            <Link className="add-student detail-btn" to={`${match.url}/add-students`}>
              Add Student
            </Link>
            <Link className="remove-student detail-btn" to={`${match.url}/remove-students`}>
              Remove Student
            </Link>
            <Link className="test-parameters detail-btn" to={`${match.url}/test-parameters`}>
              Test Settings
            </Link>
            <Link className="class-settings detail-btn" to={`${match.url}/class-settings`}>
            Class Settings
            </Link>
          </div>
        </div>

        <Card className="student-report">
          <div className="header-row">
            <h3 className="student-name">Student Name</h3>
            <button className="student-settings"><i className="material-icons">settings</i></button>
          </div>

          <div className="operator-row plus">
            <button className="operator">+</button>
            <button className="number disabled not-taken in-progress passed">0</button>
          </div>
        </Card>
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