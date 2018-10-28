import * as React from 'react';
import { Route } from 'react-router-dom';
import { Navbar } from '../../Components/Components';
import { IUser } from '../../lib/Interfaces';
import './Home.css';
import { Base, Classes } from './Routes/Routes';

const URLS = {
  base: '/index',
  classes: '/classes',
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
            render={this.renderBase}
          />

          <Route
            path={URLS.classes}
            component={Classes}
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

  /****** Base ******/

  private renderBase() {
    return <Base />
  }
  
  /****** END Base ******/
}
