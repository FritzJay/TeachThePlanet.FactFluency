import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { PageNotFound } from 'src/Components/PageNotFound/PageNotFound';
import { Navbar, RequestComponent } from '../../Components/Components';
import { IRequest, IUser } from '../../lib/Interfaces';
import { Caching, Requests } from '../../lib/lib';
import './Home.css';
import { LoginModal } from './Routes/LoginModal/LoginModal';
import { Base, ClassDetail, Classes } from './Routes/Routes';
import { SignupModal } from './Routes/SignupModal/SignupModal';
import { TestParameters } from './Routes/TestParameters/TestParameters';

interface IProps extends RouteComponentProps<{}> {
  user: IUser;
  token: string;
  onLogin: (user: IUser, token: string, userType: string) => void;
  onLogout: () => void;
}

interface IState {
  email?: string;
  password?: string;
  userType?: string;
  classes?: string;
}

export class Home extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props)

    this.state = {}

    this.renderBase = this.renderBase.bind(this)
    this.renderLoginModal = this.renderLoginModal.bind(this)
    this.renderSignupModal = this.renderSignupModal.bind(this)
    this.renderNavbar = this.renderNavbar.bind(this)
    this.renderClasses = this.renderClasses.bind(this)
    this.requestClasses = this.requestClasses.bind(this)
    this.renderClassDetail = this.renderClassDetail.bind(this)
    this.renderTestParameters = this.renderTestParameters.bind(this)

    this.handleClassesResolve = this.handleClassesResolve.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleSignupClick = this.handleSignupClick.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
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
                path='/signup'
                render={this.renderSignupModal}
              />

              <Route
                exact={true}
                path='/classes'
                render={this.renderClasses}
              />

              <Route
                path='/classes/detail'
                render={this.renderClassDetail}
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

  private renderLoginModal(props:any) {
    return (
      <LoginModal
        {...props}
        onLogin={this.props.onLogin}
        onSignup={this.handleSignupClick}
      />
    )
  }

  /****** END Login ******/

  /****** Signup ******/

  private handleSignupClick(email: string, password: string, loginType: string) {
    this.setState({
      email,
      password,
      userType: loginType,
    }, () => this.props.history.push('/signup'))
  }

  private renderSignupModal(props: any) {
    return (
      <SignupModal
        {...props}
        email={this.state.email}
        password={this.state.password}
        loginType={this.state.userType}
        onSignup={this.handleSignup}
      />
    )
  }

  private handleSignup() {
    return
  }
  
  /****** Signup ******/

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
