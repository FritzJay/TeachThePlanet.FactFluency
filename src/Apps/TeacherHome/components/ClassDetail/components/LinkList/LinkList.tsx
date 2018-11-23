import * as React from 'react'
import { Link } from 'react-scroll'

import './LinkList.css'

interface ILink {
  id: string
  text: string
}

interface IProps {
  links: ILink[]
}

export const LinkList = ({ links }: IProps) => {
  return (
    <div className="LinkList">
      {links.map(({ id, text }) => (
        <Link
          className="link"
          key={id}
          to={id}
          smooth={true}
          duration={500}
          isDynamic={true}
          offset={-100}
        >
          {text}
        </Link>
      ))}
    </div>
  )
}