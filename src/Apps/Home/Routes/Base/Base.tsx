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
  public render() {
    console.log(this.props.match)
    return (
      <div className="base">
        Base

        <Route
          exact={true}
          path={this.props.match.url}
          component={TitleModal}
        />

        <Route
          path={`${this.props.match.url}signup`}
          component={LoginModal}
        />
      </div>
    );
  }
}