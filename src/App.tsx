import * as React from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import { Navbar } from './Components/Components';
import { getCached, saveState, signOut } from './lib/Caching';
import { ITest, ITestNumber, IUser } from './lib/Interfaces';
import { Login, SelectTest, StartTest, TakeTest, TestResults } from './Routes/Routes';

export const URLS = {
  selectTest: '/tests/select',
  signin: '/',
  startTest: '/tests/start',
  takeTest: '/tests/take',
  testResults: '/tests/results',
  tests: '/',
}

interface IProps {
  history: any;
};

interface IState {
  token: string;
  user?: IUser;
  testNumber?: ITestNumber;
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
      token: getCached('token') || '',
      user: getCached('user'),
    }
    this.renderLogin = this.renderLogin.bind(this);
    this.renderNavbar = this.renderNavbar.bind(this);
    this.renderSelectTest = this.renderSelectTest.bind(this);
    this.renderStartTest = this.renderStartTest.bind(this);
    this.renderTakeTest = this.renderTakeTest.bind(this);
    this.renderTestResults = this.renderTestResults.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSelectTestSubmit = this.handleSelectTestSubmit.bind(this);
    this.handleStartTestSubmit = this.handleStartTestSubmit.bind(this);
    this.handleStartTestCancel = this.handleStartTestCancel.bind(this);
    this.handleTakeTestSubmit = this.handleTakeTestSubmit.bind(this);
    this.saveStateFromChild = this.saveStateFromChild.bind(this);
  }

  public render() {
    return (
      <div>
        <Route
          path={URLS.tests}
          render={this.renderNavbar}
        />
        <div className="app-content">
          <Route
            exact={true}
            path={URLS.signin}
            render={this.renderLogin}
          />
          <Route
            path={URLS.selectTest}
            render={this.renderSelectTest}
          />
          <Route
            path={URLS.startTest}
            render={this.renderStartTest}
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
      </div>
    );
  }
  
  private renderNavbar(props: any) {
    return(
      <Navbar {...props}
        user={this.state.user}
        signout={this.handleSignOutClick}
      />
    );
  }
  
  private handleSignOutClick() {
    signOut(this);
  }
  
  private renderLogin(props: any) {
    return (
      <Login {...props}
        onSubmit={this.handleLoginSubmit}
      />
    );
  }

  private handleLoginSubmit(token: string, user: IUser) {
    saveState(this, {token, user})
    .then(() => {
      this.props.history.push(URLS.selectTest);
    });
  }
  
  private renderSelectTest(props: any) {
    const token = this.state.token || getCached('token');
    if (token) {
      return (
        <SelectTest {...props}
        token={token}
        onSubmit={this.handleSelectTestSubmit}
        />
      );
    } else {
      this.props.history.goBack();
      return <div />;
    }
  }
  
  private handleSelectTestSubmit(testNumber: ITestNumber, operator: string) {
    const testParameters = {
      number: testNumber.number,
      operator,
    }
    saveState(this, {testParameters})
    .then(() => {
      this.props.history.push(URLS.startTest);
    });
  }
  
  private renderStartTest(props: any) {
    const testParameters = this.state.testParameters || getCached('testParameters');
    if (testParameters) {
      return (
        <StartTest {...props}
        onSubmit={this.handleStartTestSubmit}
        onCancel={this.handleStartTestCancel}
        />
      );
    } else {
      this.props.history.goBack();
      return <div />;
    }
  }
  
  private handleStartTestSubmit() {
    this.props.history.push(URLS.takeTest);
  }
  
  private handleStartTestCancel() {
    this.props.history.goBack();
  }
  
  private renderTakeTest(props: any) {
    const testParameters = this.state.testParameters || getCached('testParameters');
    if (testParameters) {
      return (
        <TakeTest {...props}
        token={testParameters}
        testParameters={testParameters}
          onSubmit={this.handleTakeTestSubmit}
        />
      );
    } else {
      return <div />;
    }
  }

  private handleTakeTestSubmit(test: ITest) {
    saveState(this, {test})
    .then(() => {
      this.props.history.push(URLS.testResults);
    });
  }
  
  private renderTestResults(props: any) {
    const test = this.state.test || getCached('test');
    if (test) {
      return (
        <TestResults {...props}
          token={test}
          test={test}
          onSubmit={this.saveStateFromChild}
        />
      );
    } else {
      this.props.history.goBack();
      return <div />;
    }
  }
  
  private saveStateFromChild(state: any): Promise<void> {
    return new Promise((resolve) => {
      saveState(this, state);
      resolve();
    });
  }
}

export default withRouter(App);
