import * as React from 'react';
import { Button, Card } from '../../../../Components/Components';
import { Themes } from '../../../../lib/lib';
import './Login.css';

const URLS = {
  base: '/login',
  parent: '/login/parent',
}

interface IProps {
  history: any;
}

export class Login extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  public render() {
    const portraitCards = ['Parent', 'Student', 'Teacher', 'Administrator'].map((name: string, i: number) => {
      const color = Themes.themeColors[i % Themes.themeColors.length];
      return (
        <Card key={i} className={`login-card ${color}`}>
          <div className="portrait" />
          <Button className="button" onClick={this.handleClick}>{name}</Button>
        </Card>
      );
    });
    return (
      <div className="login">
        {portraitCards}
      </div>
           
    );
  }

  private handleClick(event: any) {
    const buttonText = event.target.innerText.toLowerCase();
    const url = `${URLS.base}/${buttonText}`; 
    this.props.history.push(url);
  }
}