import * as React from 'react'
import './ParentInvite.css'

export class ParentInvite extends React.Component<any> {
  public render() {
    return (
      <div className="ParentInvite">
        <h2>Teach The Planet: Fact Fluency</h2>
        
        <h4>Dear Parents,</h4>
        <p>This year we are focusing on fact fluency as part of our math curriculum. While we will be using the program during school hours, students are encouraged to practice at home.</p>
    
        <h4>Help your child by registering a free parent account now: </h4>
        <ol>
          <li>Go to <a href="www.ttp-factfluency.herokuapp.com">www.ttp-factfluency.herokuapp.com</a></li>
          <li>Enter your account details to create your parent account.</li>
          <li>Once logged in, follow the on-boarding instructions.</li>
          <li>Add your child by entering your students class code and student code.</li>
        </ol>
    
        <h4>Real Time Reports</h4>
        <p>A Teach The Planet account lets your student practice their fact fluency in accordance with the classroom needs and goals and reports their progress in real time.</p>
    
        <h4>How does my child practice at home?</h4>
        <ol>
          <li>Go to <a href="www.ttp-factfluency.herokuapp.com">www.ttp-factfluency.herokuapp.com</a></li>
          <li>Select the student user type.</li>
          <li>Enter the students email or username listed below.</li>
          <li>Enter the password listed below.</li>
          <li>Select a number and operator (×,÷,−,+) and get started!</li>
        </ol>
    
        <table>
          <thead>
            <tr>
              <th>Email/Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>dynamic email</td>
              <td>dynamic password</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}