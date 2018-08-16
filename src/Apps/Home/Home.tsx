import * as React from 'react';
import { Button, Card, Navbar } from '../../Components/Components';
import { IUser } from '../../lib/Interfaces';
import { Themes } from '../../lib/lib';
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
    const portaitCards = ['Parent', 'Student', 'Teacher', 'Administrator'].map((name: string, i: number) => {
      const color = Themes.themeColors[i % Themes.themeColors.length];
      return (
        <Card key={i} className={`login-card ${color}`}>
          <div className="portrait" />
          <Button onClick={this.handleParentClick}>{name}</Button>
          <div className="form">
            <span />
          </div>
        </Card>
      );
    });
    return (
      <div>
        <Navbar user={this.state.user} signout={this.handleSignout} />
        <div className="home">
          <div className="login">
            {portaitCards}
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