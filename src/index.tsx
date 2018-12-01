
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
  },
})

ReactDOM.render((
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </ErrorBoundary>
  ),
  document.getElementById('root') as HTMLElement
)