import * as React from 'react';
import { Route } from 'react-router-dom';
import { LoginModal, TitleModal } from '../../Components/Components';
import './Base.css';

const URLS = {
  classes: 'index/classes',
  login: '/index/signup',
  title: '/index',
}

interface IState {
  loginType: string;
}

export class Base extends React.Component<any, IState> {
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
          component={LoginModal}
        />
      </div>
    );
  }
}