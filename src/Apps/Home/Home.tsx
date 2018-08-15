import * as React from 'react';
import { Button, Card, Navbar } from '../../Components/Components';
import { IUser } from '../../lib/Interfaces';
import './Home.css';

interface IProps {
  history?: any;
}

interface IState {
  user?: IUser;
}

export class Home extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {}
  }

  public render() {
    return (
      <div>
        <Navbar user={this.state.user} signout={this.handleSignout} />
        <div className="home">
          <div className="login">
            <Card className="login-card red">
              <div className="portrait" />
              <Button onClick={this.handleParentClick}>Test</Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  private handleSignout() {
    console.log('signout');
  }

  private handleParentClick(event: any) {
    console.log('Parent Click!');
  }
}