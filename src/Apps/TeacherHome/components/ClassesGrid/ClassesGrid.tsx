import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import { NewCard } from 'src/sharedComponents'
import { ClassCard } from '../ClassCard/ClassCard'
import { IClass } from 'src/utils'
import './ClassesGrid.css'

interface IProps extends RouteComponentProps<{}> {
  courses: IClass[]
}

export const ClassesGrid = ({ courses, history, match }: IProps) => (
  <div className="ClassesGrid">
    <h2 className="title">Classes</h2>
    {courses.map((course: IClass) => (
      <ClassCard
        key={course.id}
        course={course}
        onCardClick={() => history.push(`/teacher/class-detail/${course.id}`)}
        onSettingsClick={() => history.push(`/teacher/classes/edit/${course.id}`)}
      />
      ))}
    <Link to={`${match.url}/new`}>
      <NewCard />
    </Link>
  </div>
)
