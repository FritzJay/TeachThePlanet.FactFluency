import * as React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from 'src/sharedComponents'
import { IUser } from '../../lib/Interfaces'
import Logo from './logo.png'
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
  public state: IState = {
    activeDropdown: false,
  }

  public render() {
    const { user, logoLink, onLogout } = this.props
    const { activeDropdown } = this.state

    return (
      <div className="navbar">
        {user !== undefined
          ? <a className="logout-link" onClick={onLogout}>Logout</a>
          : null}

        <Link className="logo" to={logoLink}>
          <img src={Logo} className="logo-img" alt="logo" />
        </Link>

        {user !== undefined && (
          <p className="username">
            <i className="user-icon material-icons">account_circle</i>
            {user.name}
          </p>
        )}

        <button className="toggle-btn" onClick={this.handleToggleButtonClick}><i className="material-icons">menu</i></button>

        <Dropdown active={user ? activeDropdown : false}>
          {user !== undefined
            ? (
              <p className="username">
                <i className="user-icon material-icons">account_circle</i>
                {user.name}
              </p>
            ) : null}

          {user !== undefined
            ? <a className="logout-link" onClick={onLogout}>Logout</a>
            : null} 
        </Dropdown>
      </div>
    )
  }

  private handleToggleButtonClick = () => {
    this.setState((prevState: IState) => ({
      activeDropdown: !prevState.activeDropdown
    }))
  }
}