import * as React from 'react';
import { Button, Modal, ModalContent, ModalHeader } from '../../../../Components/Components';
import './LoginForm.css';

interface IProps {
  onCancelClick: (event: any) => void;
  onLoginClick: (event: any) => void;
  onSignupClick: (event: any) => void;
  loginFor: string;
  color: string;
}

export const LoginForm = (props: IProps) => {
  return (
    <div className="login-form">
      <Modal className={`form ${props.color}`}>
        <ModalHeader>
          <h1>Login or Signup</h1>
          <Button className="cancel-button" onClick={props.onCancelClick}>X</Button>
        </ModalHeader>
        <ModalContent>
          <div className="left">
            <div className="small-portrait" />
            <div className="portrait-title">{props.loginFor}</div>
          </div>
          <div className="right">
            <div className="inputs">
              <label>Email</label>
              <input />
              <label>Password</label>
              <input />
            </div>
            <div className="buttons">
              <Button onClick={props.onLoginClick}>Login</Button>
              <p>or</p>
              <Button onClick={props.onSignupClick}>Sign Up</Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}