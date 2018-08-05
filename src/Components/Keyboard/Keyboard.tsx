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
  }

  public render() {
    const keys = [7, 8, 9, 4, 5, 6, 1, 2, 3, 'Delete', 0, 'Submit'].map((text) => {
      const className = this.getClassName(text.toString());
      const onClick = this.getOnClick(text.toString());
      return (
        <button className={className} key={text} onClick={onClick}>{text}</button>
      );
    });
    const toggleSymbol = (this.state.active) ? '↓' : '↑';
    return (
      <div className={`keyboard ${this.state.active && 'active'}`}>
        <div className="toggle-bar">
          <button className="toggle-button" onClick={this.handleToggleClick}>{toggleSymbol}</button>
        </div>
        <div className="keys">
          {keys}
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
        return this.props.onNumberClick;
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
}