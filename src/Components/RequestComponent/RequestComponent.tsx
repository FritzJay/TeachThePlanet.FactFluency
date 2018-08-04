import * as React from "react";

interface IProps {
  request: Promise<any>;
  component: React.ComponentType;
  props: object;
}

interface IState {
  resolvedRequest?: object;
}

export class RequestComponent extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      resolvedRequest: undefined,
    }
  }
  
  public async componentDidMount() {
    this.props.request
    .then((resolvedRequest) => {
      this.setState({resolvedRequest});
    });
  }

  public render() {
    if (this.state.resolvedRequest) {
      console.log(this.state);
      return React.createElement(this.props.component, {
        ...this.state.resolvedRequest,
        ...this.props.props,
      });
    } else {
      return <div>Loading...</div>
    }
  }
}
