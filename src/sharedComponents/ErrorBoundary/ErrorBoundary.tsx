import * as React from 'react'
import { Redirect } from 'react-router-dom'

import './ErrorBoundary.css'

interface IProps {
  children: any
}

interface IState {
  hasError: boolean
  redirect: boolean
}

export class ErrorBoundary extends React.Component<IProps, IState> {
  public state: IState = {
    hasError: false,
    redirect: false,
  }

  private redirectTimeout: any;

  public componentDidCatch(error: Error, info: any) {
    /* TODO: UNCOMMENT FOR PRODUCTION
    this.redirectTimeout = window.setTimeout(() => {
      this.setState({ redirect: true })
    }, 3000)
    */

    this.setState({ hasError: true })
    console.warn(error, info)
  }

  public componentWillUnmount() {
    window.clearTimeout(this.redirectTimeout)
  }

  public render() {
    if (this.state.hasError) {
      if (this.state.redirect) {
        return <Redirect to="/index" />
      }

      return (
        <div className="ErrorBoundary">
          <h1>Oops...</h1>
          <h2>An unexpected error occurred. Please try again later.</h2>
        </div>
      )
    }
    return this.props.children
  }
  
}