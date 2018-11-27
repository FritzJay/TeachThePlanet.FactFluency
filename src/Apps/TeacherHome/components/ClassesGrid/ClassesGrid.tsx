import * as React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Link, RouteComponentProps } from 'react-router-dom'

import { NewCard, Loading } from 'src/sharedComponents'
import { ClassCard } from '../ClassCard/ClassCard'
import { IClass } from 'src/utils'
import './ClassesGrid.css'

const GET_COURSES = gql`
  query teacher {
    teacher {
      id
      name
      user {
        id
        email
      }
      courses {
        id
        name
        grade
        code
      }
    }
  }
`

interface IProps extends RouteComponentProps<{}> {}

export const ClassesGrid = ({ history, match }: IProps) => (
  <Query
    query={GET_COURSES}
    pollInterval={15000}
  >
    {({ error, loading, data }) => {
      if (loading) {
        return (
          <div className="ClassesGrid">
            <Loading className="loading" />
          </div>
        )
      }

      if (error) {
        return (
          <div className="ClassesGrid">
            <h3 className="error">{error.message}</h3>
          </div>
        )
      }

      const courses = data && data.teacher && data.teacher.courses

      return (
        <div className="ClassesGrid">
          <h2 className="title">Classes</h2>
          {courses.map((course: IClass) => (
            <ClassCard
              key={course.id}
              cls={course}
              onCardClick={() => history.push(`/teacher/class-detail/${course.id}`)}
              onSettingsClick={() => history.push(`/teacher/classes/edit/${course.id}`)}
            />
            ))}
          <Link to={`${match.url}/new`}>
            <NewCard />
          </Link>
        </div>
      )
    }}
  </Query>
)
