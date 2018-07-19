import * as React from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import { saveState } from './lib/Caching';
import { IUser } from './lib/Interfaces';
import { signOut } from './lib/Requests';
import { Login } from './Views/Login/Login';
import { NewTest } from './Views/NewTest/NewTest';
import { TakeTest } from './Views/TakeTest/TakeTest';
import { TestResults } from './Views/TestResults/TestResults';

export const URLS = {
  newTest: 'new-test',
  signin: '/',
  takeTest: 'take-test',
  testResults: 'test-results',
}

interface IProps {
  history: any;
};

interface IState {
  token: string;
  user?: IUser;
};

class App extends React.Component<IProps, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      token: ''
    }
    this.renderLogin = this.renderLogin.bind(this);
    this.renderNewTest = this.renderNewTest.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.signout = this.signout.bind(this);
  }

  public render() {
    return (
      <div>
        <button onClick={this.signout}>Logout</button>
        <Route
          path={URLS.signin}
          render={this.renderLogin}
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
  
  private renderLogin(props: any) {
    return <Login {...props} saveUser={this.saveUser} />;
  }

  private renderNewTest(props: any) {
    return <NewTest {...props} token={this.state.token} />
  }

  private renderTakeTest(props: any) {
    return <TakeTest {...props} token={this.state.token} />
  }

  private renderTestResults(props: any) {
    return <TestResults {...props} token={this.state.token} />
  }

  private saveUser(token: string, user: IUser) {
    saveState(this, {token, user});
  }

  private signout() {
    signOut(this);
  }
}

export default withRouter(App);
