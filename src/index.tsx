import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, RouteComponentProps, withRouter } from 'react-router-dom';
import * as WebFont from 'webfontloader';
import { FactFluency } from './Apps/FactFluency/FactFluency';
import { Home } from './Apps/Home/Home';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const URLS = {
  factFluency: '/fact-fluency',
  home: '/home',
}

interface IProps extends RouteComponentProps<{}> {}

interface IState {
  token?: string;
}

class Index extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);

    this.renderHome = this.renderHome.bind(this);
    this.renderFactFluency = this.renderFactFluency.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  public render() {
    return (
      <div>
        <Route
          exact={true}
          path='/'
          render={this.renderRedirect}
        />
        <Route
          path={URLS.home}
          render={this.renderHome}
        />
        <Route
          path={URLS.factFluency}
          render={this.renderFactFluency}
        />
      </div>
    );
  }

  private renderHome() {
    return <Home history={this.props.history} />
  }

  private renderFactFluency() {
    return <FactFluency history={this.props.history} />
  }

  private renderRedirect() {
    return <Redirect to={URLS.home} />
  }

  private handleLogin() {
    console.log('Logging in!');
  }
}

WebFont.load({
  google: {
    families: [
      'Oswald:300, 400, 700, 900', 'sans-serif',
      'Roboto:300, 400, 700, 900', 'sans-serif',
      'Material Icons: 400, normal',
    ],
  },
});

const indexWithRouter = withRouter(Index);

ReactDOM.render((
  <BrowserRouter>
    <Route path="/">
      {indexWithRouter}
    </Route>
  </BrowserRouter>
), document.getElementById('root') as HTMLElement
);
registerServiceWorker();