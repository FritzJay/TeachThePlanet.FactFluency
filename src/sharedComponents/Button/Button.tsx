/* tslint:disable:variable-name */

import * as React from 'react';
import './Button.css';

interface IButtonProps {
  className?: string
  children?: any
  onClick?: (event: any) => void
}

export const Button = (props: IButtonProps | any) => {
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


interface IConfirmButtonProps {
  className?: string
  confirmClassName?: string
  children?: any
  disableTimeout?: number
  disableOnClick?: boolean
  onClick?: (event: any) => void
}

interface IState {
  confirm: boolean
  disabled: boolean
}

export class ConfirmButton extends React.Component<IConfirmButtonProps | any, IState> {
  public state: IState = {
    confirm: false,
    disabled: false
  }

  private confirmTimeout: any
  private disabledTimeout: any
  private _isMounted: boolean

  public componentDidMount() {
    this._isMounted = true
  }

  public componentWillUnmount() {
    this._isMounted = false
    window.clearTimeout(this.confirmTimeout)
    window.clearTimeout(this.disabledTimeout)
  }

  public render() {
    const { className, children, confirmClassName, disableOnClick, disableTimeout, onClick, ...rest } = this.props
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

  private handleClick = async (e: any) => {
    e.persist() // Force the synthetic event to persist so we can pass it to props.onClick

    if (this.state.disabled) {
      return
    }
    
    if (this.state.confirm) {
      if (this.props.onClick) {
        await this.props.onClick(e)
      }
      if (this._isMounted) {
          this.setState({
          disabled: this.props.disableOnClick !== undefined
            ? this.props.disableOnClick
            : true,
          confirm: false,
        }, () => {
          this.disabledTimeout = this.props.disableTimeout && window.setTimeout(() => {
            if (this._isMounted) {
              this.setState({ disabled:  false })
            }
          }, this.props.disableTimeout)
        })
      }
      return
    }

    this.setState({ confirm: true }, () => {
      this.confirmTimeout = window.setTimeout(() => {
        if (this._isMounted) {
          this.setState({ confirm: false })
        }
      }, 2000)
    })
  }
}