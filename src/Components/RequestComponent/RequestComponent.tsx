import * as React from "react";

interface IProps {
  component: React.ComponentType;
  props: object;
  onResolve?: (state: any) => void;
  request: () => Promise<any>;
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

    const cancellable = {
      resolve: this.props.onResolve && this.props.onResolve.bind(this),
      setState: this.setState.bind(this),
    };

    this.componentWillMount = async () => {
      const resolvedRequest = await this.props.request();
      if (cancellable.resolve) {
        cancellable.resolve(resolvedRequest);
      }
      if (cancellable.setState) {
        cancellable.setState({resolvedRequest});
      }
    }

    this.componentWillUnmount = () => {
      cancellable.setState = undefined;
    }
  }

  public render() {
    if (this.state.resolvedRequest) {
      return React.createElement(this.props.component, {
        ...this.state.resolvedRequest,
        ...this.props.props,
      });
    } else {
      return <div>Loading...</div>
    }
  }
}
