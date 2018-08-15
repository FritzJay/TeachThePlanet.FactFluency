import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as WebFont from 'webfontloader';
import FactFluency from './Apps/FactFluency/FactFluency';
import registerServiceWorker from './registerServiceWorker';

WebFont.load({
  google: {
    families: [
      'Oswald:300, 400, 700, 900', 'sans-serif',
      'Roboto:300, 400, 700, 900', 'sans-serif',
      'Material Icons: 400, normal',
    ],
  },
});

ReactDOM.render(
  (
    <BrowserRouter>
      <FactFluency />
    </BrowserRouter>
  ), document.getElementById('root') as HTMLElement
);
registerServiceWorker();
