import * as React from 'react'
import { Card } from '../../../../Components/Components';


export class ClassDetail extends React.Component<any> {
  public render() {
    return (
    <div className="class-detail">
    <div className="header-row">
      <h1><span><a href="#">Classrooms</a></span>/Class Name</h1>
      <div className="btn-row">
        <button className="parent-invitations">Parent Invites</button>
        <button className="add-student">Add Student</button>
        <button className="remove-student">Remove Student</button>
        <button className="test-parameters">Test Parameters</button>
        <button className="class-settings">Class Settings</button>
      </div>
    </div>

    <Card className="student-report">
      <div className="header-row">
        <h3>Student Name</h3>
        <button className="student-settings"><i className="material-icons">settings</i></button>
      </div>

      <div className="operator-row">
        <p className="operator">+</p>
        <p className="number">0</p>
      </div>
    </Card>
  </div>
  )
  }
}