import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IUser } from '../../../../lib/Interfaces';
import './Base.css';
import { TitleModal } from './Components/Components';

interface IProps extends RouteComponentProps<{}> {
  onLogin: (user: IUser, token: string, userType: string) => void;
}

export class Base extends React.Component<IProps, any> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <div className="base">
        <TitleModal {...this.props} />
      </div>
    );
  }
}