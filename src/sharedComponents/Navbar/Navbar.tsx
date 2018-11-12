import * as React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { clearCached } from 'src/utils'
import { clearStore } from 'src/actions/shared'
import { Button, Dropdown } from 'src/sharedComponents'
import { IUser } from '../../utils'
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
  name?: string
  onClick: () => void
}

const UserIcon = ({ name, onClick }: IUserIconProps) => {
  if (name !== undefined) {
    return (
      <Button
        onClick={onClick}
        className="UserIcon"
      >
        <i className="user-icon material-icons">
          account_circle
        </i>
        {name}
      </Button>
    )
  } else {
    return null
  }
}


interface IProps extends RouteComponentProps<{}> {
  logoLink: string
  dispatch: any
  user?: IUser
}

interface IState {
  activeDropdown: boolean
}

class DisconnectedNavbar extends React.Component<IProps, IState> {
  public state: IState = {
    activeDropdown: false,
  }

  private wrapperRef: any

  public componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside)
  }

  public render() {
    const { user, logoLink } = this.props
    const { activeDropdown } = this.state

    return (
      <div
        ref={this.setWrapperRef}
        className="Navbar"
      >

        <LogoutLink
          active={user !== undefined && user.name !== undefined}
          onLogout={this.handleLogout}
        />

        <Link className="logo" to={logoLink}>
          <img src={Logo} className="logo-img" alt="logo" />
        </Link>

        <UserIcon
          name={user && user.name}
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
            active={user !== undefined && user.name !== undefined}
            onLogout={this.handleLogout}
          />
        </Dropdown>
      </div>
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

  private handleLogout = async () => {
    this.props.dispatch(clearStore())
    await clearCached()
    this.props.history.push('/index')
  }
}

const mapStateToProps = ({ user }: any) => ({ user })

export const Navbar = withRouter(connect(mapStateToProps)(DisconnectedNavbar))