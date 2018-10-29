import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IUser } from 'src/lib/Interfaces';
import { FactFluency } from './FactFluency';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render((
    <FactFluency
      onLogin={handleLogin}
      onLogout={handleLogout}
      history={{}}
    />
  ), div);

  ReactDOM.unmountComponentAtNode(div);
});

const handleLogin = (user: IUser, token: string, userType: string) => {
  return
}

const handleLogout = () => {
  return
}
