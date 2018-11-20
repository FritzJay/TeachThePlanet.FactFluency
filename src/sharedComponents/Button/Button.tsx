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
}

export class ConfirmButton extends React.Component<any, IState> {
  public state = {
    confirm: false
  }

  public render() {
    const { className, children, confirmClassName } = this.props

    return (
      <Button
        {...this.props}
        className={`${className ? className : ''}${confirmClassName ? ' ' + confirmClassName : ''}`}
        onClick={this.handleClick}
      >
        {children
          ? children
          : null
        }
      </Button>
    )
  }

  private handleClick = (e: any) => {
    this.setState({ confirm: true },
      () => this.props.onClick && this.props.onClick(e)
    )
  }
}