import * as React from 'react';
import { Route } from 'react-router-dom';
import { Navbar } from '../../Components/Components';
import { IUser } from '../../lib/Interfaces';
import './Home.css';
import { Base } from './Routes/Routes';

const URLS = {
  base: '/',
  login: '/login',
  loginParent: '/login/parent',
}

interface IProps {
  history: any;
}

interface IState {
  user?: IUser;
}

export class Home extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {}
    this.renderNavbar = this.renderNavbar.bind(this);
  }

  public render() {
    return (
      <div>
        <Route
          path={URLS.base}
          render={this.renderNavbar}
        /> 
        <div className="home">
          <Route
            path={URLS.base}
            component={Base}
          />

          <Route
            path={URLS.loginParent}
            render={this.renderLoginParent}
          />
        </div>
      </div>
    );
  }

  /****** Navbar ******/

  private renderNavbar(props: any) {
    const user = this.state.user || localStorage.getItem('user');
    return (
      <Navbar {...props}
        user={user}
        signout={this.handleSignout}
      />
    );
  }
  
  private handleSignout() {
    console.log('signout');
  }

  /****** END Navbar ******/

  private renderLoginParent(props: any) {
    return <div />
  }
}
