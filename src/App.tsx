import * as React from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import { Navbar } from './Components/Components';
import { saveState, signOut } from './lib/Caching';
import { ITest, ITestNumber, IUser } from './lib/Interfaces';
import { Login, SelectTestNumber, SelectTestOperator, StartTest, TakeTest, TestResults } from './Routes/Routes';

export const URLS = {
  selectTestNumber: '/tests/select/number',
  selectTestOperator: '/tests/select/operator',
  signin: '/',
  startTest: '/tests/start',
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
    this.renderSelectTestNumber = this.renderSelectTestNumber.bind(this);
    this.renderSelectTestOperator = this.renderSelectTestOperator.bind(this);
    this.renderTakeTest = this.renderTakeTest.bind(this);
    this.renderTestResults = this.renderTestResults.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSelectTestNumberSubmit = this.handleSelectTestNumberSubmit.bind(this);
    this.handleSelectTestOperatorSubmit = this.handleSelectTestOperatorSubmit.bind(this);
    this.handleStartTestSubmit = this.handleStartTestSubmit.bind(this);
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
        <Route
          exact={true}
          path={URLS.signin}
          render={this.renderLogin}
        />
        <Route
          path={URLS.selectTestNumber}
          render={this.renderSelectTestNumber}
        />
        <Route
          path={URLS.selectTestOperator}
          render={this.renderSelectTestOperator}
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
      this.props.history.push(URLS.selectTestNumber);
    });
  }
  
  private renderSelectTestNumber(props: any) {
    return (
      <SelectTestNumber {...props}
        token={this.state.token}
        onSubmit={this.handleSelectTestNumberSubmit}
      />
    );
  }

  private handleSelectTestNumberSubmit(testNumber: ITestNumber) {
    saveState(this, {testNumber})
    .then(() => {
      this.props.history.push(URLS.selectTestOperator);
    });
  }
  
  private renderSelectTestOperator(props: any) {
    return (
      <SelectTestOperator {...props}
        onSubmit={this.handleSelectTestOperatorSubmit}
      />
    );
  }

  private handleSelectTestOperatorSubmit(operator: string) {
    saveState(this, {operator})
    .then(() => {
      this.props.history.push(URLS.startTest);
    });
  }
  
  private renderStartTest(props: any) {
    return (
      <StartTest {...props}
        onSubmit={this.handleStartTestSubmit}
      />
    );
  }

  private handleStartTestSubmit() {
    this.props.history.push(URLS.takeTest);
  }
  
  private renderTakeTest(props: any) {
    return (
      <TakeTest {...props}
        token={this.state.token}
        testParameters={this.state.testParameters}
        onSubmit={this.handleTakeTestSubmit}
      />
    );
  }

  private handleTakeTestSubmit(test: ITest) {
    saveState(this, {test})
    .then(() => {
      this.props.history.push(URLS.testResults);
    });
  }
  
  private renderTestResults(props: any) {
    return (
      <TestResults {...props}
        token={this.state.token}
        test={this.state.test}
        onSubmit={this.saveStateFromChild}
      />
    );
  }
  
  private saveStateFromChild(state: any): Promise<void> {
    return new Promise((resolve) => {
      saveState(this, state);
      resolve();
    });
  }
}

export default withRouter(App);
