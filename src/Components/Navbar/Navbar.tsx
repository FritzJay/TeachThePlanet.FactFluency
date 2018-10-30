import * as React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from '../../Components/Components'
import { IUser } from '../../lib/Interfaces'
import Logo from './logo.svg'
import './Navbar.css'

interface IProps {
  logoLink: string
  user?: IUser
  onLogout: () => void
}

interface IState {
  activeDropdown: boolean
}

export class Navbar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      activeDropdown: false,
    }
    this.handleToggleButtonClick = this.handleToggleButtonClick.bind(this)
  }

  public render() {
    return (
      <div className="navbar-margin-top">
        <div className="navbar">
          {logoutButton(this.props.onLogout, this.props.user)}

          <Link className="logo" to={this.props.logoLink}>
            <img src={Logo} alt="logo" />
          </Link>

          {userInfo(this.props.user)}

          <button className="toggle-btn" onClick={this.handleToggleButtonClick}><i className="material-icons">menu</i></button>

          <Dropdown active={this.props.user ? this.state.activeDropdown : false}>
            {userInfo(this.props.user)}
            {logoutButton(this.props.onLogout, this.props.user)} 
          </Dropdown>
        </div>
      </div>
    )
  }

  private handleToggleButtonClick() {
    this.setState((prevState: IState) => {
      return {activeDropdown: !prevState.activeDropdown}
    })
  }
}

const userInfo = (user?: IUser) => {
  if (user) {
    return (
      <p className="username"><i className="user-icon material-icons">account_circle</i>{user.name}</p>
    )
  } else {
    return (
      <p />
    )
  }
}

const logoutButton = (handleLogout: () => void, user?: IUser) => {
  if (user) {
    return (
      <a className="logout-link" onClick={handleLogout}>Logout</a>
    )
  } else {
    return (
      <div className="logout-link" />
    )
   }
}