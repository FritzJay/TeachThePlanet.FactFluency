import * as React from 'react';
import { IUser } from '../../lib/Interfaces';
import './Navbar.css';

interface IProps {
  signout: () => void;
  user?: IUser;
}

export const Navbar = (props: IProps) => {
  return (
    <div className="navbar-margin-top">
      <div className="navbar">
        {logoutButton(props.signout, props.user)}
        <img src="https://vectr.com/thomasisaacpeterecclesgmailcom/fnVZV3K0a.svg?width=48&height=48&select=fnVZV3K0apage0" alt="logo" />
        {userInfo(props.user)}
      </div>
    </div>
  );
}

const userInfo = (user?: IUser) => {
  if (user) {
    return (
      <p>{user.name}</p>
    );
  } else {
    return (
      <p>Sign Up</p>
    );
  }
}

const logoutButton = (signout: () => void, user?: IUser) => {
  if (user) {
    return (
      <a onClick={signout}>Logout</a>
    );
  } else {
    return (
      <div />
    );
   }
}