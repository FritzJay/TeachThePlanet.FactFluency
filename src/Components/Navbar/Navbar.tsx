import * as React from 'react';
import { IUser } from '../../lib/Interfaces';
import './Navbar.css';

interface IProps {
  signout: () => void;
  user?: IUser;
}

export const Navbar = (props: IProps) => {
  const userInfo = (props.user) ? (
    <p>{props.user.name}</p>
  ) : (
    <p>Sign Up</p>
  );
  return (
    <div className="navbar-margin-top">
      <div className="navbar">
        <button onClick={props.signout}>Logout</button>
        <img src="https://vectr.com/thomasisaacpeterecclesgmailcom/fnVZV3K0a.svg?width=48&height=48&select=fnVZV3K0apage0" alt="logo" />
        {userInfo}
      </div>
    </div>
  );
}