import * as React from 'react';
import './TitleModal.css';

interface IProps {
  history: any;
}

interface IState {
  color?: string,
  loginFor?: string,
}

export class TitleModal extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    
    this.state = {}
  }

  public render() {
    
    return (
      <div className="title-modal">
        Title Modal
      </div>
    );
  }
}