import * as React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'src/sharedComponents'
import './ClassDetail.css'


export class ClassDetail extends React.Component<any> {
  
  public render() {
    const { match } = this.props 

    return (
      <div className="ClassDetail">
        <div className="header-row">
          <h1><span><i className="material-icons big">arrow_back_ios</i><a className="classrooms" href="#"> Classrooms</a></span>/Class Name</h1>
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