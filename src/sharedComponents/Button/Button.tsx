import * as React from 'react';
import './Button.css';

export const Button = (props: any) => {
  return (
    <button
      {...props}
      className={`pill-button ${props.className ? ' ' + props.className : ''}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}


interface IState {
  confirm: boolean
  disabled: boolean
}

export class ConfirmButton extends React.Component<any, IState> {
  public state: IState = {
    confirm: false,
    disabled: false
  }

  private confirmTimeout: any
  private disabledTimeout: any

  public componentWillUnmount() {
    window.clearTimeout(this.confirmTimeout)
    window.clearTimeout(this.disabledTimeout)
  }

  public render() {
    const { className, children, confirmClassName, disableTimeout, ...rest } = this.props
    const { confirm, disabled } = this.state

    return (
      <Button
        {...rest}
        className={`${className ? className : ''}${confirmClassName && confirm ? ' ' + confirmClassName : ''}`}
        onClick={this.handleClick}
        disabled={disabled}
      >
        {children
          ? children
          : null
        }
      </Button>
    )
  }

  private handleClick = (e: any) => {
    if (this.state.disabled) { return }
    
    if (this.state.confirm) {
      this.props.onClick(e)
      this.setState({
        disabled: true,
        confirm: false,
      }, () => {
        this.disabledTimeout = this.props.disableTimeout && window.setTimeout(() => {
          this.setState({ disabled:  false })
        }, this.props.disableTimeout)
      })
      return
    }

    this.setState({ confirm: true }, () => {
      this.confirmTimeout = window.setTimeout(() => {
        this.setState({ confirm: false })
      }, 2000)
    })
  }
}