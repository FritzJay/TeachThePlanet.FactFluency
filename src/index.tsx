
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import * as WebFont from 'webfontloader'
import App from './Apps/App'
import middleware from './redux/middleware'
import reducer from './redux/reducers'

WebFont.load({
  google: {
    families: [
      'Oswald:300, 400, 700, 900', 'sans-serif',
      'Roboto:300, 400, 700, 900', 'sans-serif',
      'Material Icons: 400, normal',
    ],
  },
})

const store = createStore(reducer, middleware)

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>),
  document.getElementById('root') as HTMLElement
)