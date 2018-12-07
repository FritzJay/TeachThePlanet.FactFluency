import * as React from 'react'
import { Redirect } from 'react-router-dom'

import './ErrorBoundary.css'
import Robot from 'src/images/500.jpg'

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
    this.redirectTimeout = window.setTimeout(() => {
      this.setState({ redirect: true })
    }, 3000)

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
          <h1>Internal Server Error</h1>
          <h2>500</h2>
          <p>Thomas, a robot of the highest order, plugged into the server for routine maintenance. His schedule allowed for 20 minutes of updates every 2 hours. If the newest update takes 4 hours what time will her finish?</p>
          <img src={Robot} alt="Thomas, the robot" />
          <p>Never mind, at 5:05 there was an internal error.</p>
        </div>
      )
    }
    return this.props.children
  }
  
}