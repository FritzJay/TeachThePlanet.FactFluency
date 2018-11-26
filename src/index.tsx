
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache, Operation } from 'apollo-boost'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import * as WebFont from 'webfontloader'

import App from './Apps/App'
import middleware from './middleware'
import reducer from './reducers'
import { factFluencyDefaults, factFluencyResolvers, factFluencyTypeDefs } from './Apps/FactFluency/clientState'

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
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
  request: async (operation: Operation) => {
    const token = localStorage.getItem('token')
    operation.setContext({ headers: {
      authorization: token ? `jwt ${token}` : ''
    }})
  },
  clientState: {
    defaults: {
      ...factFluencyDefaults,
    },
    resolvers: {
      ...factFluencyResolvers,
    }
  }
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