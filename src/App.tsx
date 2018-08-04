import * as React from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import { Navbar } from './Components/Components';
import { RequestComponent } from './Components/RequestComponent/RequestComponent';
import { getCached, saveState } from './lib/Caching';
import { ITest, ITestNumber, IUser } from './lib/Interfaces';
import { IRequest, jsonFetch } from './lib/Requests';
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
  token?: string;
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
      token: getCached('token'),
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
    const user = this.state.user || localStorage.getItem('user');
    return(
      <Navbar {...props}
        user={user}
        signout={this.handleSignOutClick}
      />
    );
  }
  
  private handleSignOutClick() {
    localStorage.clear();
    this.setState({
      token: undefined,
      user: undefined,
    }, () => {
      this.props.history.replace(URLS.signin);
    });
  }
  
  private renderLogin(props: any) {
    const token = this.state.token || getCached('token');
    const user = this.state.user || getCached('user');
    if (token && user) {
      this.props.history.push(URLS.selectTest);
    }
    return (
      <Login {...props} onSubmit={this.handleLoginSubmit} />
    );
  }

  private handleLoginSubmit(token: string, user: IUser) {
    saveState(this, {token, user})
    .then(() => {
      this.props.history.push(URLS.selectTest);
    });
  }
  
  private renderSelectTest(props: any) {
    const availableTests = getCached('availableTests');
    if (availableTests) {
      return (
        <SelectTest {...props}
          availableTests={availableTests}
          onSubmit={this.handleSelectTestSubmit}
        />
      );
    }
    const token = this.state.token || getCached('token');
    if (!token) {
      this.props.history.replace(URLS.signin);
    }
    const requestParams: IRequest = {
      method: "GET",
      token,
    };
    const request = jsonFetch(`${process.env.REACT_APP_API_URL}/tests/available`, requestParams); 
    return (
      <RequestComponent
        request={request}
        component={SelectTest}
        props={{onSubmit: this.handleSelectTestSubmit}}
      />
    );
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
        token={this.state.token}
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
