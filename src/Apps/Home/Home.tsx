import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { PageNotFound } from 'src/Components/PageNotFound/PageNotFound';
import { Navbar, RequestComponent } from '../../Components/Components';
import { IRequest, IUser } from '../../lib/Interfaces';
import { Caching, Requests } from '../../lib/lib';
import './Home.css';
import { LoginModal } from './Routes/LoginModal/LoginModal';
import { Base, Classes } from './Routes/Routes';

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
    this.renderLoginModal = this.renderLoginModal.bind(this)
    this.renderNavbar = this.renderNavbar.bind(this)
    this.renderClasses = this.renderClasses.bind(this)
    this.requestClasses = this.requestClasses.bind(this)
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
              render={this.renderLoginModal}
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

  private renderLoginModal(props:any) {
    return (
      <LoginModal
        {...props}
        onLogin={this.props.onLogin}
      />
    )
  }

  /****** END Login ******/

  /****** Classes ******/

  private renderClasses(props: any) {
    const classes = this.state.classes || localStorage.getItem('classes')

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

  private requestClasses() {
    const token = this.props.token || Caching.getCached('token');

    if (token === undefined || token === null) {
      this.props.history.replace('/');
    }

    const requestParams: IRequest = {
      method: 'GET',
      token,
    }

    return new Promise<[string]>((resolve) => {
      Requests.jsonFetch(`${process.env.REACT_APP_API_URL}/teachers/classes`, requestParams)
        .then((classes: [string]) => {
          resolve(classes);
        })
        .catch((error: Error) => {
          console.log('Request failed with error: ', error)
          this.handleLogout()
        })
    })
  }

  private handleClassesResolve(results: { classes: string }) {
    Caching.setCached('classes', results.classes)
    this.setState({
      classes: results.classes,
    })
  }

  /****** END Classes ******/

  private handleLogout() {
    this.setState({
      classes: undefined,
    }, () => {
      this.props.onLogout()
    });
  }
}
