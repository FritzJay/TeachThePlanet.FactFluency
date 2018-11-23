import * as React from 'react'
import { Link } from 'react-scroll'

import { IStudentUser } from 'src/utils'
import './LinkList.css'

interface IProps {
  students: IStudentUser[]
}

export const LinkList = ({ students }: IProps) => {
  return (
    <div className="LinkList">
      {students.map(({ id, name }) => (
        <Link
          className="link"
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