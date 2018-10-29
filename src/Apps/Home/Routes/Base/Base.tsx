import * as React from 'react';
import { Route } from 'react-router-dom';
import { IUser } from '../../../../lib/Interfaces';
import './Base.css';
import { LoginModal, TitleModal } from './Components/Components';

const URLS = {
  classes: 'home/classes',
  login: '/home/index/signup',
  title: '/home/index',
}

interface IProps {
  onLogin: (user: IUser, token: string, userType: string) => void;
}

export class Base extends React.Component<IProps, any> {
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