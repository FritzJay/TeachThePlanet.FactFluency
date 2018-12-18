
import * as React from 'react'
import ApolloClient, { InMemoryCache, Operation } from 'apollo-boost'
import * as ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import * as WebFont from 'webfontloader'

import { factFluencyDefaults, factFluencyResolvers } from './Apps/FactFluency/clientState'
import App from './Apps/App'
import { ErrorBoundary } from './sharedComponents/ErrorBoundary/ErrorBoundary';

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
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  cache: new InMemoryCache(),
  request: async (operation: Operation) => {
    const token = localStorage.getItem('token')
    if (token) {
      operation.setContext({ headers: {
        authorization: `Bearer ${token}`
      }})
    }
  },
  clientState: {
    defaults: {
      ...factFluencyDefaults(),
    },
    resolvers: {
      ...factFluencyResolvers(),
    }
  },
})

ReactDOM.render((
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </ApolloProvider>
  ),
  document.getElementById('root') as HTMLElement
)