import * as React from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import { Navbar, RequestComponent } from './Components/Components';
import { getCached, setCached } from './lib/Caching';
import { IAvailableTests, ITest, ITestNumber, ITestResults, IUser } from './lib/Interfaces';
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
  availableTests?: IAvailableTests;
  testParameters?: {
    number: number;
    operator: string;
  };
  test?: ITest;
  testResults?: ITestResults;
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
    this.requestSelectTest = this.requestSelectTest.bind(this);
    this.requestStartTest = this.requestStartTest.bind(this);
    this.requestTestResults = this.requestTestResults.bind(this);
    this.handleSelectTestResolve = this.handleSelectTestResolve.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSelectTestSubmit = this.handleSelectTestSubmit.bind(this);
    this.handleStartTestSubmit = this.handleStartTestSubmit.bind(this);
    this.handleStartTestCancel = this.handleStartTestCancel.bind(this);
    this.handleTakeTestSubmit = this.handleTakeTestSubmit.bind(this);
    this.handleTestResultsSubmit = this.handleTestResultsSubmit.bind(this);
    this.signOut = this.signOut.bind(this);
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

  /****** Navbar ******/
  
  private renderNavbar(props: any) {
    const user = this.state.user || localStorage.getItem('user');
    return(
      <Navbar {...props}
        user={user}
        signout={this.signOut}
      />
    );
  }

  private signOut() {
    localStorage.clear();
    this.setState({
      token: undefined,
      user: undefined,
    }, () => {
      this.props.history.replace(URLS.signin);
    });
  }

  /****** ENd Navbar ******/
  
  /****** Login ******/

  private renderLogin(props: any) {
    const token = this.state.token || getCached('token');
    const user = this.state.user || getCached('user');
    if (token && user) {
      this.props.history.push(URLS.selectTest);
      return <div />
    }
    return (
      <Login {...props} onSubmit={this.handleLoginSubmit} />
    );
  }

  private handleLoginSubmit(token: string, user: IUser) {
    setCached('token', token);
    setCached('user', user);
    this.setState({token, user}, () => {
      this.props.history.push(URLS.selectTest);
    });
  }

  /****** END Login ******/
  
  /****** Select Test ******/

  private renderSelectTest(props: any) {
    console.log(this.state);
    const availableTests = this.state.availableTests || getCached('availableTests');
    if (availableTests) {
      return (
        <SelectTest {...props}
          availableTests={availableTests}
          onSubmit={this.handleSelectTestSubmit}
        />
      );
    }
    return (
      <RequestComponent
        request={this.requestSelectTest}
        onResolve={this.handleSelectTestResolve}
        component={SelectTest}
        props={{
          ...props,
          onSubmit: this.handleSelectTestSubmit
        }}
      />
    );
  }

  private requestSelectTest(): Promise<IAvailableTests> {
    const token = this.state.token || getCached('token');
    if (!token) {
      this.props.history.replace(URLS.signin);
    }
    const requestParams: IRequest = {
      method: "GET",
      token,
    };
    return new Promise<IAvailableTests>((resolve) => {
      jsonFetch(`${process.env.REACT_APP_API_URL}/tests/available`, requestParams)
      .then((availableTests: IAvailableTests) => {
        resolve(availableTests);
      })
      .catch((error: Error) => {
        console.log('Request failed with error: ' + error.message);
        this.signOut();
      });
    }); 
  }

  private handleSelectTestResolve(results: {availableTests: IAvailableTests}) {
    setCached('availableTests', results.availableTests);
    this.setState({availableTests: results.availableTests});
  }
  
  private handleSelectTestSubmit(testNumber: ITestNumber, operator: string) {
    const testParameters = {
      number: testNumber.number,
      operator,
    }
    this.setState({testParameters}, () => {
      this.props.history.push(URLS.startTest);
    });
  }

  /****** END Select Test ******/

  /****** Start Test ******/
  
  private renderStartTest(props: any) {
    return (
      <RequestComponent
        request={this.requestStartTest}
        onResolve={this.handleStartTestResolve}
        component={StartTest}
        props={{
          ...props,
          onCancel: this.handleStartTestCancel,
          onSubmit: this.handleStartTestSubmit,
        }}
      />
    );
  }

  private requestStartTest(): Promise<ITest> {
    const testParameters = this.state.testParameters;
    if (!testParameters) {
      this.props.history.goBack();
    }
    const token = this.state.token || getCached('token');
    if (!token) {
      this.props.history.goBack();
    }
    const request: IRequest = {
      body: testParameters,
      method: "POST",
      token,
    };
    return new Promise<ITest>((resolve) => {
      jsonFetch(`${process.env.REACT_APP_API_URL}/tests/new`, request)
      .then((test: ITest) => {
        resolve(test);
      })
      .catch((error: Error) => {
        console.log('Request failed with error: ' + error.message);
        this.signOut();
      });
    });
  }

  private handleStartTestResolve(results: { test: ITest }) {
    setCached('test', results.test);
    this.setState({test: results.test});
  }
  
  private handleStartTestSubmit() {
    this.props.history.push(URLS.takeTest);
  }
  
  private handleStartTestCancel() {
    this.props.history.goBack();
  }

  /****** END Start Test ******/

  /****** Take Test ******/
  
  private renderTakeTest(props: any) {
    const test = this.state.test || getCached('test');
    if (!test) {
      this.props.history.replace(URLS.startTest);
      return <div />;
    }
    return (
      <TakeTest {...props}
        test={test}
        onSubmit={this.handleTakeTestSubmit}
      />
    );
  }

  private handleTakeTestSubmit(test: ITest) {
    setCached('test', test);
    this.setState({test}, () => {
      this.props.history.push(URLS.testResults);
    });
  }

  /****** END Take Test ******/

  /****** Test Results ******/
  
  private renderTestResults(props: any) {
    return (
      <RequestComponent
        request={this.requestTestResults}
        onResolve={this.handleRestResultsResolve}
        component={TestResults}
        props={{...props}}
      />
    );
  }

  private requestTestResults() {
    const token = this.state.token || getCached('token');
    if (!token) {
      this.props.history.replace(URLS.signin);
    }
    const test = this.state.test || getCached('test');
    if (!test) {
      this.props.history.replace(URLS.selectTest);
    }
    const requestParams: IRequest = {
      body: test,
      method: "POST",
      token,
    };
    return new Promise<ITestResults>((resolve) => {
      jsonFetch(`${process.env.REACT_APP_API_URL}/tests/grade`, requestParams)
      .then((testResults: ITestResults) => {
        resolve(testResults);
      })
      .catch((error: Error) => {
        console.log('Request failed with error: ' + error.message);
        this.signOut();
      });
    });
  }

  private handleRestResultsResolve(results: { testResults: ITestResults }) {
    localStorage.removeItem('test');
    setCached('testResults', results.testResults);
    this.setState({
      test: undefined,
      testResults: results.testResults,
    });
  }

  private handleTestResultsSubmit(testResults: ITestResults) {
    setCached('testResults', testResults);
    this.setState({testResults}, () => {
      console.log('DO SOMETHING!');
    });
  }

  /****** END Test Results ******/
}

export default withRouter(App);
