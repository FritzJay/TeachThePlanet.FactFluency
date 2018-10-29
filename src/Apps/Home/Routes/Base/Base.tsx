import * as React from 'react';
import { Route } from 'react-router-dom';
import { IUser } from '../../../../lib/Interfaces';
import { LoginModal, TitleModal } from '../../Components/Components';
import './Base.css';

const URLS = {
  classes: 'home/classes',
  login: '/home/index/signup',
  title: '/home/index',
}

interface IProps {
  onLogin: (user: IUser, token: string) => void;
}

interface IState {
  error?: string;
}

export class Base extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);

    this.renderLoginModal = this.renderLoginModal.bind(this)
  }

  public render() {
    return (
      <div className="base">
        Base

        <Route
          exact={true}
          path={URLS.title}
          component={TitleModal}
        />

        <Route
          path={URLS.login}
          render={this.renderLoginModal}
        />
      </div>
    );
  }

  private renderLoginModal() {
    return <LoginModal onLogin={this.props.onLogin} />
  }
}