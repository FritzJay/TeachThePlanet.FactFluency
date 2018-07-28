import * as React from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { loadState, saveState, signOut } from './lib/Caching';
import { ITest, IUser } from './lib/Interfaces';
import { Login } from './Views/Login/Login';
import { NewTest } from './Views/NewTest/NewTest';
import { TakeTest } from './Views/TakeTest/TakeTest';
import { TestResults } from './Views/TestResults/TestResults';

export const URLS = {
  newTest: '/tests/new',
  selectTest: '/tests/new/select',
  signin: '/sign-in',
  takeTest: '/tests/take',
  testResults: '/tests/results',
  tests: '/tests',
}

interface IProps {
  history: any;
};

interface IState {
  token: string;
  user?: IUser;
  testParameters?: {
    number: number;
    operator: string;
  };
  test?: ITest;
};

class App extends React.Component<IProps, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      token: ''
    }
    this.renderLogin = this.renderLogin.bind(this);
    this.renderNavbar = this.renderNavbar.bind(this);
    this.renderNewTest = this.renderNewTest.bind(this);
    this.renderTakeTest = this.renderTakeTest.bind(this);
    this.renderTestResults = this.renderTestResults.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
    this.saveStateFromChild = this.saveStateFromChild.bind(this);
  }

  public componentDidMount() {
    loadState(this, 'user');
  }

  public render() {
    return (
      <div>
        <Route
          path={URLS.signin}
          render={this.renderLogin}
        />
        <Route
          path={URLS.tests}
          render={this.renderNavbar}
        />
        <Route
          path={URLS.newTest}
          render={this.renderNewTest}
        />
        <Route
          path={URLS.takeTest}
          render={this.renderTakeTest}
        />
        <Route
          path={URLS.testResults}
          render={this.renderTestResults}
        />
      </div>
    );
  }

  private saveStateFromChild(state: any): Promise<void> {
    return new Promise((resolve) => {
      saveState(this, state);
      resolve();
    });
  }

  private handleSignOutClick() {
    signOut(this);
  }
  
  private renderLogin(props: any) {
    return (
      <Login {...props}
        saveUser={this.saveStateFromChild}
      />
    );
  }

  private renderNavbar(props: any) {
    return(
      <Navbar {...props}
        user={this.state.user}
        signout={this.handleSignOutClick}
      />
    )
  }

  private renderNewTest(props: any) {
    return (
      <NewTest
        {...props}
        token={this.state.token}
        saveTestParameters={this.saveStateFromChild}
      />
    );
  }

  private renderTakeTest(props: any) {
    return (
      <TakeTest
        {...props}
        token={this.state.token}
        testParameters={this.state.testParameters}
        saveTest={this.saveStateFromChild}
      />
    );
  }

  private renderTestResults(props: any) {
    return (
      <TestResults
        {...props}
        token={this.state.token}
        test={this.state.test}
      />
    );
  }
}

export default withRouter(App);
