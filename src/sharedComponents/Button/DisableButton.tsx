import * as React from 'react'

import { IButtonProps, Button } from './Button'

interface IProps extends IButtonProps {
  duration?: number
}

interface IState {
  disabled: boolean
}

export class DisableButton extends React.Component<IProps> {
  public state: IState = {
    disabled: false
  }

  private disabledTimeout: any
  private _isMounted: boolean

  public componentDidMount() {
    this._isMounted = true
  }

  public componentWillUnmount() {
    this._isMounted = false
    window.clearTimeout(this.disabledTimeout)
  }

  public render() {
    const { onClick, children, ...rest } = this.props
    return (
      <Button
        onClick={this.handleClick}
        disabled={this.state.disabled}
        {...rest}
      >
        {children}
      </Button>
    )
  }

  private handleClick = (e: any) => {
    e.persist() // Force the synthetic event to persist so we can pass it to props.onClick

    const { onClick, duration } = this.props

    if (onClick) {
      onClick(e)
    }

    if (this._isMounted) {
      this.setState({ disabled: true }, () => {
        this.disabledTimeout = duration && window.setTimeout(() => {
          if (this._isMounted) {
            this.setState({ disabled:  false })
          }
        }, duration)
      })
    }
  }
}