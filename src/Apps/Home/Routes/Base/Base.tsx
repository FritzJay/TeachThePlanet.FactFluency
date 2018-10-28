import * as React from 'react';
import { Route } from 'react-router-dom';
import { LoginModal, TitleModal } from '../../Components/Components';
import './Base.css';

interface IProps {
  match: any;
  history: any;
}

interface IState {
  loginType: string;
}

export class Base extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    
    this.state = {
      loginType: 'Student',
    }

    this.renderLoginModal = this.renderLoginModal.bind(this)
  }

  
  public render() {
    return (
      <div className="base">
        All your base are belong to us

        <Route exact={true} path={`${this.props.match.url}/`} component={TitleModal} />

        <Route path={`${this.props.match.url}/signup`} render={this.renderLoginModal} />
      </div>
    );
  }

  private renderLoginModal() {
    return <LoginModal loginType={this.state.loginType} />
  }
}