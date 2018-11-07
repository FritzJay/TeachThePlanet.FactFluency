import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Navbar, PageNotFound } from '../../Components';
import { IUser } from '../../lib/Interfaces';
import { Caching } from '../../lib/lib';
import './Home.css';
import { Base, Classes, Login } from './Routes/Routes';

interface IProps extends RouteComponentProps<{}> {
  user: IUser;
  token: string;
  onLogin: (user: IUser, token: string, userType: string) => void;
  onLogout: () => void;
}

interface IState {
  classes?: string;
}

export class Home extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props)

    this.state = {}

    this.renderBase = this.renderBase.bind(this)
    this.renderLogin = this.renderLogin.bind(this)
    this.renderNavbar = this.renderNavbar.bind(this)
    this.renderClasses = this.renderClasses.bind(this)

    this.handleLogout = this.handleLogout.bind(this)
  }

  public render() {
    console.log(this.props.match)
    return (
      <div>
        <Route
          path={this.props.match.path}
          render={this.renderNavbar}
          />

          <div className="home">
            <Switch>
              <Route
                exact={true}
                path={'/'}
                render={this.renderBase}
              />

              <Route
                path='/login'
                render={this.renderLogin}
              />

              <Route
                path='/classes'
                render={this.renderClasses}
              />

              <Route
                component={PageNotFound}
              />
            </Switch>
        </div>
      </div>
    );
  }

  /****** Navbar ******/

  private renderNavbar(props: any) {
    const user = this.props.user || localStorage.getItem('user');

    return (
      <Navbar {...props}
        logoLink={this.props.match.path}
        user={user}
        onLogout={this.handleLogout}
      />
    )
  }

  /****** END Navbar ******/

  /****** Base ******/

  private renderBase(props: any) {
    return (
      <Base
        {...props}
        onLogin={this.props.onLogin}
      />
    )
  }

  /****** END Base ******/

  /****** Login ******/

  private renderLogin(props:any) {
    return (
      <Login
        {...props}
        onLogin={this.props.onLogin}
      />
    )
  }

  /****** END Login ******/

  /****** Classes ******/

  private renderClasses(props: any) {
    const token = this.props.token || Caching.getCached('token')

    if (token === undefined || token === null) {
      this.handleLogout()
      return <Redirect to={this.props.match.url} />
    }

    return (
      <Classes
        {...props}
        token={token}
        onLogout={this.handleLogout}
      />
    )
  }

  /****** END Classes ******/

  private handleLogout() {
    this.props.history.replace('/')

    this.setState({
      classes: undefined,
    }, () => {
      this.props.onLogout()
    });
  }
}
