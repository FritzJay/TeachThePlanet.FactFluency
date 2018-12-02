import * as React from 'react'
import * as ReactCopyToClipboard from 'react-copy-to-clipboard'
import './CopyToClipboard.css'

interface IProps {
  text: string
  className?: string
  children?: any
}

interface IState {
  notification: boolean
  x: number
  y: number
}

export class CopyToClipboard extends React.Component<IProps, IState> {
  public state: IState = {
    notification: false,
    x: 0,
    y: 0,
  }

  private notificationTimeout: any

  public componentWillUnmount() {
    window.clearTimeout(this.notificationTimeout)
  }

  public render() {
    const { className, children, text } = this.props
    return (
      <div
        {...this.props}
        className={`CopyToClipboard ${className !== undefined ? className : ''}`}
        onClick={this.handleClick}
      >
        {React.Children.toArray(children).map((child, i) => (
          <ReactCopyToClipboard
            key={i}
            text={text}
          >
            {child}
          </ReactCopyToClipboard>
        ))}
          
        {this.state.notification 
          ? (
            <p
              style={{
                left: this.state.x,
                top: this.state.y,
              }}
              className="notification"
            >
              Copied to clipboard
            </p>
          ) : null}
      </div>
    )
  }

  private handleClick = (e: any) => {
    const x = e.pageX
    const y = e.pageY

    e.preventDefault()
    e.stopPropagation()

    this.setState({
      notification: true,
      x,
      y,
    }, () => {
      this.notificationTimeout = window.setTimeout(() => {

        this.setState({
          notification: false,
        })

      }, 700)
    })
  }
}