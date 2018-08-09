import * as React from 'react';
import './Keyboard.css';

interface IProps {
  onNumberClick: (event: any) => void;
  onDeleteClick: (event: any) => void;
  onSubmitClick: (event: any) => void;
  onToggle?: (active: boolean) => void;
}

interface IState {
  active: boolean;
}

export class Keyboard extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      active: false,
    };
    this.getOnClick = this.getOnClick.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);
  }

  public render() {
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'Delete', 0, 'Submit'].map((text) => {
      const className = this.getClassName(text.toString());
      const onClick = this.getOnClick(text.toString());
      return (
        <button className={className} key={text} onClick={onClick}>{text}</button>
      );
    });
    const keyboardIcon = (this.state.active) ? 'keyboard_hide' : 'keyboard';
    return (
      <div className="keyboard-container">
        <div className="toggle-row">
        <button className="toggle-button" onClick={this.handleToggleClick}>
          <i className="keyboard-icon material-icons">{keyboardIcon}</i>
        </button>
        </div>
        <div className={`keyboard ${this.state.active && 'active'}`}>
          <div className="keys">
            {keys}
          </div>
        </div>
      </div>
    );
  }

  private getClassName(text: string) {
    switch (text) {
      case 'Delete':
        return 'key delete';
      case 'Submit':
        return 'key submit';
      default:
        return 'key';
    }
  }

  private getOnClick(text: string) {
    switch (text) {
      case 'Delete':
        return this.props.onDeleteClick;
      case 'Submit':
        return this.props.onSubmitClick;
      default:
        return this.handleNumberClick;
    }
  }

  private handleToggleClick() {
    this.setState((prevState: IState) => {
      if (this.props.onToggle) {
        this.props.onToggle(!prevState.active);
      }
      return {active: !prevState.active};
    });
  }

  private handleNumberClick(event: any) {
    const num = parseInt(event.target.innerText, 10);
    if (!isNaN(num)) {
      this.props.onNumberClick(num);
    }
  }
}