import * as React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Link, RouteComponentProps } from 'react-router-dom'

import { clearCached } from 'src/utils'
import { Button, Dropdown, DeleteAccountLink } from 'src/sharedComponents'
import Logo from 'src/images/logo.svg'
import './Navbar.css'

export * from './components/ClassListDropdown/ClassListDropdown'
export * from './components/DeleteAccountLink/DeleteAccountLink'
export * from './components/Dropdown/Dropdown'

interface ILogoutLinkProps {
  active: boolean
  onLogout: () => void
  children?: any
}

const LogoutLink = ({ active, onLogout }: ILogoutLinkProps) => {
  if (active) {
    return <a className="LogoutLink navbar-link" onClick={onLogout}>Logout</a>
  } else {
    return null
  }
}


interface IUserIconProps {
  email?: string
  onClick: () => void
}

const UserIcon = ({ email, onClick }: IUserIconProps) => {
  if (email !== undefined) {
    return (
      <Button
        onClick={onClick}
        className="UserIcon"
      >
        <i className="user-icon material-icons">
          account_circle
        </i>
        {email}
      </Button>
    )
  } else {
    return null
  }
}


const GET_USER = gql`
  query user {
    user {
      id
      lastName
      firstName
      email
    }
}
`

interface IProps extends RouteComponentProps<{}> {
  logoLink: string
}

interface IState {
  activeDropdown: boolean
}

export class Navbar extends React.Component<IProps, IState> {
  public state: IState = {
    activeDropdown: false,
  }

  private wrapperRef: any

  public componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside)
  }

  public render() {
    const { logoLink, children } = this.props
    const { activeDropdown } = this.state

    const childrenArray = React.Children.toArray(children)
    const firstHalf = childrenArray.slice(0, Math.ceil(childrenArray.length / 2))
    const secondHalf = childrenArray.slice(Math.ceil(childrenArray.length / 2), childrenArray.length)

    return (
      <Query
        query={GET_USER}
        pollInterval={60000}
      >
        {({ client, data: { user } }) => (
          <div
            ref={this.setWrapperRef}
            className="Navbar"
          >
    
            <LogoutLink
              active={user !== undefined && user.email !== undefined}
              onLogout={async () => {
                this.props.history.push('/index')
                await client.clearStore()
                await clearCached()
              }}
            />
    
            <div className="second-half-of-children">
              {secondHalf}
            </div>
    
            <Link className="logo" to={logoLink}>
              <img src={Logo} className="logo-img" alt="logo" />
            </Link>
    
            <div className="first-half-of-children">
              {firstHalf}
            </div>
    
            <UserIcon
              email={user && user.email}
              onClick={this.handleToggleButtonClick}
            />
    
            <button
              className="toggle-btn"
              onClick={this.handleToggleButtonClick}
            >
              <i className="material-icons">menu</i>
            </button>
    
            <Dropdown active={activeDropdown}>
              <LogoutLink
                active={user !== undefined && user.email !== undefined}
                onLogout={async () => {
                  this.props.history.push('/index')
                  await client.clearStore()
                  await clearCached()
                }}
              />
              
              <DeleteAccountLink />
            </Dropdown>
          </div>
        )}
      </Query>
    )
  }

  private setWrapperRef = (node: any) => {
    this.wrapperRef = node
  }

  private handleClickOutside = (event: any) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.handleToggleButtonClick()
    }
  }

  private handleToggleButtonClick = () => {
    if (!this.state.activeDropdown) {
      window.addEventListener('click', this.handleClickOutside)
    } else {
      window.removeEventListener('click', this.handleClickOutside)
    }

    this.setState((prevState: IState) => ({
      activeDropdown: !prevState.activeDropdown
    }))
  }
}
