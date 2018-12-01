import * as React from 'react'
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache, Operation } from 'apollo-boost'
import { factFluencyDefaults, factFluencyResolvers } from './FactFluency/clientState'

import Login from 'src/Apps/Login/Login'
import { PageNotFound } from 'src/sharedComponents'
import { TeacherHome } from './TeacherHome/TeacherHome'
import { FactFluency } from './FactFluency/FactFluency'
import { ErrorBoundary } from 'src/sharedComponents/ErrorBoundary/ErrorBoundary'
import './App.css'

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

export default class App extends React.Component<any> {
  public render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <ApolloProvider client={client}>
            <Switch>
              <Route
                path="/"
                exact={true}
                render={() => <Redirect to="/index" />}
              />

              <Route
                path="/index"
                component={Login}
              />

              <Route
                path="/fact-fluency"
                component={FactFluency}
              />

              <Route
                path="/teacher"
                component={TeacherHome}
              />

              <Route component={PageNotFound} />
            </Switch>
          </ApolloProvider>
        </ErrorBoundary>
      </div>
    )
  }
}
