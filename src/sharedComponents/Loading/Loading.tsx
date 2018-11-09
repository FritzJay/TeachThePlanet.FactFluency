import * as React from 'react'

interface IProps {
  className?: string
}

interface IState {
  text: string
}

export class Loading extends React.Component<IProps, IState> {
  public state: IState = {
    text: 'Loading'
  }

  private updateTextTimeout: any

  public componentDidMount() {
    this.updateTextTimeout = window.setInterval(() => {
      const text = this.state.text === 'Loading...'
        ? 'Loading'
        : this.state.text + '.'

      this.setState({ text })
    }, 300)
  }

  public componentWillUnmount() {
    window.clearInterval(this.updateTextTimeout)
  }

  public render() {
    return <h1 className={this.props.className ? this.props.className : ''}>{this.state.text}</h1>
  }
}