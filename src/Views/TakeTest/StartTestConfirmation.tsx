import * as React from 'react';

interface IProps {
  startTest: () => void;
}

export class StartTestConfirmation extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
    this.handleStartTestClick = this.handleStartTestClick.bind(this);
  }

  public render() {
    return <button onClick={this.handleStartTestClick}>Start Test?</button>
  }

  private handleStartTestClick() {
    this.setState({hidden: true}, () => {
      this.props.startTest();
    });
  }
}