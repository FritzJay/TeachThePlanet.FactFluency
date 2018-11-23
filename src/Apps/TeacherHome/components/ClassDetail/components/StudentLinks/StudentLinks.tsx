import * as React from 'react'
import { Link } from 'react-scroll'

import { IStudentUser } from 'src/utils'
import './StudentLinks.css'

interface IProps {
  students: IStudentUser[]
}

export const StudentLinks = ({ students }: IProps) => {
  return (
    <div className="StudentLinks">
      {students.map(({ id, name }) => (
        <Link
          key={id}
          to={id}
          smooth={true}
          duration={500}
          isDynamic={true}
          offset={-100}
        >
          {name}
        </Link>
      ))}
    </div>
  )
}