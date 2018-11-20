import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Button } from '..'
import { IClass, IUser } from 'src/utils'
import './ClassListDropdown.css'
import { updateActiveClass } from 'src/actions/factFluency';

interface IProps {
  activeClass?: string
  classes?: IClass[]
  dispatch: any
  user: IUser
}

class ClassListDropdown extends React.Component<IProps> {
  public render() {
    const { activeClass, classes, user } = this.props

    if (user.email === 'TTPStudent') {
      return null
    }

    return (
      <div className="ClassListDropdown">
        <select
          value={activeClass}
          onChange={this.handleChange}
        >
          {classes !== undefined && Object.keys(classes).map((id) => (
            <option
              key={id}
              value={id}
            >
              {classes[id].name} - {classes[id].teacher.name}
            </option>
          ))}
        </select>
        <Link className="join-class-link" to="/fact-fluency/join-class">
          <Button className="gray join-class-button">+</Button>
        </Link>
      </div>
    )
  }

  private handleChange = (e: any) => {
    const id = e.target.value
    this.props.dispatch(updateActiveClass(id))
  }
}

const mapStateToProps = ({ factFluency, user }: any) => ({
  activeClass: factFluency.activeClass
    ? factFluency.activeClass.id
    : undefined,
  classes: factFluency.classes,
  user
})

export const ConnectedClassListDropdown = connect(mapStateToProps)(ClassListDropdown);