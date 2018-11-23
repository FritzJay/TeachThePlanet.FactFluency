import * as React from 'react'

import { Card } from 'src/sharedComponents'
import './StudentsDescription.css'

export const StudentsDescription = () => (
  <Card className="StudentsDescription">
    <p className="description">
      Below is a list of students' progression in Fact Fluency. Each student's progress is displayed in a grid. The color of the numbers indicates the student's progress with each multiple.
    </p>
    <ul className="description-list">
      <li>
        <button className="number not-taken">0</button>
        Gray - The student has not taken the test.</li>
      <li>
        <button className="number in-progress">0</button>
        Red - The student has taken the test, but has yet to pass.</li>
      <li>
        <button className="number passed-once">0</button>
        Yellow - The student has passed the test at least once.</li>
      <li>
        <button className="number passed">0</button>
        Green - The student has passed the test three or more times.</li>
    </ul>
  </Card>
)