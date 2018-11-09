import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button, Dropdown } from 'src/sharedComponents'
import { IUser } from '../../lib/Interfaces'
import Logo from './logo.png'
import './Navbar.css'

interface ILogoutLinkProps {
  active: boolean
  onLogout: () => void
}

const LogoutLink = ({ active, onLogout }: ILogoutLinkProps) => {
  if (active) {
    return <a className="LogoutLink" onClick={onLogout}>Logout</a>
  } else {
    return null
  }
}


interface IUserIconProps {
  user?: IUser
  onClick: () => void
}

const UserIcon = ({ user, onClick }: IUserIconProps) => {
  if (user !== undefined) {
    return (
      <Button
        onClick={onClick}
        className="UserIcon"
      >
        <i className="user-icon material-icons">
          account_circle
        </i>
        {user.name}
      </Button>
    )
  } else {
    return null
  }
}


interface IProps {
  logoLink: string
  user?: IUser
  onLogout: () => void
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
    const { user, logoLink, onLogout } = this.props
    const { activeDropdown } = this.state

    return (
      <div
        ref={this.setWrapperRef}
        className="Navbar"
      >

        <LogoutLink
          active={user !== undefined}
          onLogout={onLogout}
        />

        <Link className="logo" to={logoLink}>
          <img src={Logo} className="logo-img" alt="logo" />
        </Link>

        <UserIcon
          user={user}
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
            active={user !== undefined}
            onLogout={onLogout}
          />
        </Dropdown>
      </div>
    )
  }

  private setWrapperRef = (node: any) => {
    this.wrapperRef = node
  }

  private handleClickOutside = (event: any) => {
    console.log('handleClickOutside')
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.handleToggleButtonClick()
    }
  }

  private handleToggleButtonClick = () => {
    console.log('handleToggleButtonClick')
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