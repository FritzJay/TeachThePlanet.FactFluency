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
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);
  }

  public render() {
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((text) => {
      return (
        <button className="key" key={text} onClick={this.props.onNumberClick}>{text}</button>
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
            <button className="key delete" onClick={this.props.onDeleteClick}>
              <span className="text-large">Delete</span>
              <span className="text-small"><i className="material-icons">cancel</i></span>
            </button>
            <button className="key submit" onClick={this.props.onSubmitClick}>
              <span className="text-large">Submit</span>
              <span className="text-small">=</span>
            </button>
          </div>
        </div>
      </div>
    );
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