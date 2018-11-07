import * as React from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'src/Components';
import './ClassDetail.css'


export class ClassDetail extends React.Component<any> {
  
  public render() {
    const { match } = this.props 

    return (
    <div className="class-detail">
    <div className="header-row">
      <h1><span><i className="material-icons big">arrow_back_ios</i><a className="classrooms" href="#"> Classrooms</a></span>/Class Name</h1>
      <div className="btn-row">
        <button className="parent-invitations detail-btn">Parent Invites</button>
        <button className="add-student detail-btn">Add Student</button>
        <button className="remove-student detail-btn">Remove Student</button>
        <Link to={`${match.url}/test-parameters`}>
          <button className="test-parameters detail-btn">Test Settings</button>
        </Link>
        <button className="class-settings detail-btn">Class Settings</button>
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