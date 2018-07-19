import * as React from "react";
import { URLS } from "../../App";
import { saveState } from "../../lib/Caching";
import { ITest } from "../../lib/Interfaces";
import { IRequest, jsonFetch } from "../../lib/Requests";

interface IProps {
  history: any;
  token?: string;
}

interface IState {
  test: ITest;
}

export class TakeTest extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.getNewTest = this.getNewTest.bind(this);
  }

  public render() {
    return (
      <div />
    );
  }

  private getNewTest(num: number, operator: string) {
    const request: IRequest = {
      body: {num, operator},
      method: "POST",
      token: this.props.token,
    };
    jsonFetch(`${process.env.REACT_APP_API_URL}/tests/new`, request)
    .then((test: ITest) => {
      saveState(this, test);
      this.props.history.push(URLS.takeTest);
    });
  }
}