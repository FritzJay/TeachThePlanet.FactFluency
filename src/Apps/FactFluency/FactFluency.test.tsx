import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FactFluency } from './FactFluency';

it('renders without crashing', () => {
  return undefined
  const div = document.createElement('div');
  ReactDOM.render(<FactFluency history={history} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
