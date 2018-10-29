import * as React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from '../../Components/Components';
import { IUser } from '../../lib/Interfaces';
import './Navbar.css';

interface IProps {
  onLogout: () => void;
  user?: IUser;
}

interface IState {
  activeDropdown: boolean;
}

export class Navbar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeDropdown: false,
    }
    this.handleToggleButtonClick = this.handleToggleButtonClick.bind(this);
  }

  public render() {
    return (
      <div className="navbar-margin-top">
        <div className="navbar">
          {logoutButton(this.props.onLogout, this.props.user)}

          <Link className="logo" to='/'>
            <img src="https://vectr.com/thomasisaacpeterecclesgmailcom/fnVZV3K0a.svg?width=48&height=48&select=fnVZV3K0apage0" alt="logo" />
          </Link>

          {userInfo(this.props.user)}

          <button className="toggle-btn" onClick={this.handleToggleButtonClick}><i className="material-icons">menu</i></button>

          <Dropdown active={this.props.user ? this.state.activeDropdown : false}>
            {userInfo(this.props.user)}
            {logoutButton(this.props.onLogout, this.props.user)} 
          </Dropdown>
        </div>
      </div>
    );
  }

  private handleToggleButtonClick() {
    this.setState((prevState: IState) => {
      return {activeDropdown: !prevState.activeDropdown};
    });
  }
}

const userInfo = (user?: IUser) => {
  if (user) {
    return (
      <p className="username"><i className="user-icon material-icons">account_circle</i>{user.name}</p>
    );
  } else {
    return (
      <p />
    );
  }
}

const logoutButton = (handleLogout: () => void, user?: IUser) => {
  if (user) {
    return (
      <a className="logout-link" onClick={handleLogout}>Logout</a>
    );
  } else {
    return (
      <div className="logout-link" />
    );
   }
}