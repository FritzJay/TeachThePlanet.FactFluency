/* tslint:disable:jsx-no-lambda */

import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { ConnectedClassListNotification } from './components/ConnectedClassListNotification/ClassListNotification'
import { updateActiveClass } from 'src/actions/factFluency'
import { Button, Modal, ModalHeader, ModalContent } from '..'
import { IClass } from 'src/utils'
import './ClassListDropdown.css'

interface IState {
  active: boolean
}

interface IProps extends RouteComponentProps {
  numberOfInvitations: number
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
    const { activeClass, courses, userEmail, numberOfInvitations } = this.props
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
          <i className="material-icons">school</i>
          <ConnectedClassListNotification />
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

                  {numberOfInvitations > 0
                    ? <li
                        onClick={this.handleInvitationsClick}
                        className="invitations"
                      >
                        <Button className="button">{numberOfInvitations}</Button>
                        <Button className="link">
                          Invitations
                        </Button>
                      </li>
                    : null}

                  <li
                    onClick={this.handleJoinClassClick}
                    className={`join-class${numberOfInvitations > 0 ? ' with-invitations' : ''}`}
                  >
                    <Button className="button">+</Button>
                    <Button className="link">
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
    console.log('HANDLE JOIN CLASS CLICK')
  }
  
  private handleInvitationsClick = () => {
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
  numberOfInvitations: Object.keys(courseInvitations).length,
})

export const ConnectedClassListDropdown = connect(mapStateToProps)(withRouter(ClassListDropdown));