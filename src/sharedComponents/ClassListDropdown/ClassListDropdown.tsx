/* tslint:disable:jsx-no-lambda */

import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { updateActiveClass } from 'src/actions/factFluency'
import { Button, Modal, ModalHeader, ModalContent } from '..'
import { IClass } from 'src/utils'
import CoursesListIcon from 'src/images/courses-list-icon.svg'
import './ClassListDropdown.css'

interface IState {
  active: boolean
}

interface IProps extends RouteComponentProps {
  hasInvitations: boolean
  activeClass?: string
  courses?: IClass[]
  dispatch: any
  userEmail: string
}

class ClassListDropdown extends React.Component<IProps, IState> {
  public state: IState = {
    active: false
  }

  public render() {
    const { activeClass, courses, userEmail, hasInvitations } = this.props
    const { active } = this.state

    if (userEmail === 'TTPStudent') {
      return null
    }

    return (
      <>
        <Button
          className={`ClassListDropdown-button${active ? ' active' : ''}`}
          onClick={this.toggleDropdown}
        >
          <img src={CoursesListIcon} alt="list of courses" />
        </Button>
          
        {active
          ?
            <Modal
              className="ClassListDropdown"
              overlay={true}
              onClose={this.toggleDropdown}
            >
              <ModalHeader className="header">
                <h2>Classes</h2>
              </ModalHeader>
              <ModalContent className="content">
                <ul>
                  {courses && Object.keys(courses).map((id) => (
                    <li key={id}>
                      <Button
                        className={activeClass === id ? 'active' : ''}
                        onClick={() => this.handleSelect(id)}
                      >
                        {courses[id].name} - {courses[id].teacher.name}
                      </Button>
                    </li>
                  ))}
                  <li
                    onClick={this.handleJoinClassClick}
                    className="join-class"
                  >
                    <Button className={`join-class-button ${hasInvitations ? 'yellow' : 'gray'}`}>+</Button>
                    <Button className="join-class-link">
                      Join Class
                    </Button>
                  </li>
                </ul>
              </ModalContent>
            </Modal>
          : null}
      </>
    )
  }

  private toggleDropdown = () => {
    this.setState(prevState => ({ active: !prevState.active }))
  }

  private handleJoinClassClick = () => {
    this.props.history.push('/fact-fluency/join-class')
    this.toggleDropdown()
  }

  private handleSelect = (id: string) => {
    if (this.props.activeClass !== id) {
      this.props.dispatch(updateActiveClass(id))
    } else {
      this.toggleDropdown()
    }
  }
}

const mapStateToProps = ({ factFluency, courses, courseInvitations, user }: any) => ({
  activeClass: factFluency.activeClass,
  courses,
  userEmail: user.email,
  hasInvitations: Object.keys(courseInvitations).length > 0,
})

export const ConnectedClassListDropdown = connect(mapStateToProps)(withRouter(ClassListDropdown));