
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache, Operation } from 'apollo-boost'
import { BrowserRouter } from 'react-router-dom'
import * as WebFont from 'webfontloader'

import App from './Apps/App'
import { factFluencyDefaults, factFluencyResolvers } from './Apps/FactFluency/clientState'

WebFont.load({
  google: {
    families: [
      'Oswald:300, 400, 700, 900', 'sans-serif',
      'Roboto:300, 400, 700, 900', 'sans-serif',
      'Material Icons: 400, normal',
    ],
  },
})

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
      ...factFluencyDefaults(),
    },
    resolvers: {
      ...factFluencyResolvers(),
    }
  }
})

ReactDOM.render((
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>),
  document.getElementById('root') as HTMLElement
)