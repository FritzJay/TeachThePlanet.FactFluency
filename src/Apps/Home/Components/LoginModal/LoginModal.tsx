import * as React from 'react';
import './LoginModal.css';

interface IProps {
  loginType: string;
}

interface IState {
  color?: string;
}

export class LoginModal extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    
    this.state = {}
  }

  public render() {
    
    return (
      <div className="login">
        Login Modal
      </div>
    );
  }
}