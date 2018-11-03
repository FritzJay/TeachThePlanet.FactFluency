import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Navbar, PageNotFound, RequestComponent } from '../../Components/Components';
import { getClasses } from '../../lib/Api';
import { IUser } from '../../lib/Interfaces';
import { Caching } from '../../lib/lib';
import './Home.css';
import { Base, ClassDetail, Classes, Login, TestParameters } from './Routes/Routes';

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
    this.requestClasses = this.requestClasses.bind(this)
    this.renderClassDetail = this.renderClassDetail.bind(this)
    this.renderTestParameters = this.renderTestParameters.bind(this)

    this.handleClassesResolve = this.handleClassesResolve.bind(this)
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
                path='/test-parameters'
                render={this.renderTestParameters}
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
    const classes = this.state.classes || Caching.getCached('classes')

    if (classes === undefined || classes === null) {
      return <RequestComponent
        request={this.requestClasses}
        onResolve={this.handleClassesResolve}
        component={Classes}
        props={{
          ...props,
          classes
        }}
      />
    }

    return (
      <Classes
        {...props}
        classes={classes}
      />
    )
  }

  private async requestClasses() {
    const token = this.props.token || Caching.getCached('token');

    if (token === undefined || token === null) {
      this.props.history.replace('/');
    }

    try {
      return getClasses(token)

    } catch(error) {
      console.log('requestClasses failed', error)
      this.handleLogout()
      return []
    }
  }

  private handleClassesResolve(results: { classes: string }) {
    Caching.setCached('classes', results.classes)

    this.setState({
      classes: results.classes,
    })
  }

  /****** END Classes ******/

  /****** Class Detail ******/

  private renderClassDetail(props: any) {
    return (
      <ClassDetail
        {...props}
      />
    )
  }

  /****** END Class Detail ******/

  /****** Test Parameters ******/

  private renderTestParameters(props: any) {
    return (
      <TestParameters
        {...props}
      />
    )
  }

  /****** END Test Parameters ******/

  private handleLogout() {
    this.setState({
      classes: undefined,
    }, () => {
      this.props.onLogout()
    });
  }
}
