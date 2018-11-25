
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import * as ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import * as WebFont from 'webfontloader'

import App from './Apps/App'
import middleware from './middleware'
import reducer from './reducers'

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

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
})

ReactDOM.render((
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </ApolloProvider>),
  document.getElementById('root') as HTMLElement
)