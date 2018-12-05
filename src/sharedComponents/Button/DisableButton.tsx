import * as React from 'react'

import { IButtonProps, Button } from './Button'

interface IState {
  disabled: boolean
}

export class DisableButton extends React.Component<IButtonProps> {
  public state: IState = {
    disabled: false
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

    this.setState({ disabled: true })

    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }
}