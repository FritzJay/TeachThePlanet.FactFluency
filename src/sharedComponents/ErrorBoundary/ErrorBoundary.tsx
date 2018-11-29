import * as React from 'react'

interface IProps {
  children: any
}

interface IState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<IProps, IState> {
  public state: IState = {
    hasError: false,
  }

  public componentDidCatch(error: Error, info: any) {
    this.setState({ hasError: true })
    console.log(error, info)
  }

  public render() {
    if (this.state.hasError) {
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