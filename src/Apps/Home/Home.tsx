import * as React from 'react';
import { Route } from 'react-router-dom';
import { Button, Card, Navbar } from '../../Components/Components';
import { IUser } from '../../lib/Interfaces';
import { Themes } from '../../lib/lib';
import './Home.css';

const URLS = {
  base: '/home',
  login: '/home/login',
  loginParent: '/home/login/parent',
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
    this.renderLogin = this.renderLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
            path={URLS.login}
            render={this.renderLogin}
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

  /****** Login SHOULD BE MOVED TO ITS OWN COMPONENT ******/

  private renderLogin(props: any) {
    const portaitCards = ['Parent', 'Student', 'Teacher', 'Administrator'].map((name: string, i: number) => {
      const color = Themes.themeColors[i % Themes.themeColors.length];
      return (
        <Card key={i} className={`login-card ${color}`}>
          <div className="portrait" />
          <Button className="button" onClick={this.handleClick}>{name}</Button>
        </Card>
      );
    });
    return (
      <div className="login">
        {portaitCards}
      </div>
    );
  }

  private handleClick(event: any) {
    const buttonText = event.target.innerText.toLowerCase();
    const url = `${URLS.login}/${buttonText}`; 
    this.props.history.push(url);
  }

  /****** END Login SHOULD BE MOVED TO ITS OWN COMPONENT ******/

  private renderLoginParent(props: any) {
    return <div />
  }
}
