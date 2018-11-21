import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Button } from '..'
import { IClass } from 'src/utils'
import './ClassListDropdown.css'
import { updateActiveClass } from 'src/actions/factFluency';

interface IProps {
  hasInvitations: boolean
  activeClass?: string
  courses?: IClass[]
  dispatch: any
  userEmail: string
}

class ClassListDropdown extends React.Component<IProps> {
  public render() {
    const { activeClass, courses, userEmail, hasInvitations } = this.props

    if (userEmail === 'TTPStudent') {
      return null
    }

    return (
      <div className="ClassListDropdown">
        <select
          value={activeClass}
          onChange={this.handleChange}
        >
          {courses !== undefined && Object.keys(courses).map((id) => (
            <option
              key={id}
              value={id}
            >
              {courses[id].name} - {courses[id].teacher.name}
            </option>
          ))}
        </select>
        <Link className="join-class-link" to="/fact-fluency/join-class" title="View class invitations">
          <Button className={`join-class-button ${hasInvitations ? 'yellow' : 'gray'}`}>+</Button>
        </Link>
      </div>
    )
  }

  private handleChange = (e: any) => {
    const id = e.target.value
    this.props.dispatch(updateActiveClass(id))
  }
}

const mapStateToProps = ({ factFluency, courses, courseInvitations, user }: any) => ({
  activeClass: factFluency.activeClass,
  courses,
  userEmail: user.email,
  hasInvitations: Object.keys(courseInvitations).length > 0,
})

export const ConnectedClassListDropdown = connect(mapStateToProps)(ClassListDropdown);