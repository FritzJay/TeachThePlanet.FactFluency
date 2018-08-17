import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Button, Card } from '../../../../Components/Components';
import { Themes } from '../../../../lib/lib';
import './Login.css';
import { LoginForm } from './LoginForm';

const URLS = {
  base: '/login',
  parent: '/login/parent',
}

interface IProps {
  history: any;
}

interface IState {
  color?: string,
  loginFor?: string,
}

export class Login extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {}
    this.renderLoginForm = this.renderLoginForm.bind(this);
    this.handlePortraitCardClick = this.handlePortraitCardClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  public render() {
    const portraitCards = ['Parent', 'Student', 'Teacher', 'Administrator'].map((name: string, i: number) => {
      const color = Themes.themeColors[i % Themes.themeColors.length];
      return <PortraitCard key={i} name={name} color={color} onClick={this.handlePortraitCardClick} />;
    });
    return (
      <div className="login">
        {portraitCards}

        <Route
          path={URLS.parent}
          render={this.renderLoginForm}
        />
      </div>
    );
  }

  private handlePortraitCardClick(name: string, color: string) {
    this.setState({
      color,
      loginFor: name,
    }, () => {
      const url = `${URLS.base}/${name}`;
      this.props.history.push(url);
    });
  }

  private handleCancelClick(event: any) {
    this.props.history.goBack();
  }

  private handleLoginClick(event: any) {
    console.log(event);
  }

  private handleSignupClick(event: any) {
    console.log(event);
  }

  private renderLoginForm(props: any) {
    if (!this.state.color || !this.state.loginFor) {
      return <Redirect to={URLS.base} />
    }
    return (
      <LoginForm
        loginFor={this.state.loginFor}
        color={this.state.color}
        onCancelClick={this.handleCancelClick}
        onLoginClick={this.handleLoginClick}
        onSignupClick={this.handleSignupClick}
      />
    );
  }
}

const PortraitCard = (props: any) => {
  const onClick = () => {
    props.onClick(props.name, props.color)
  }
  return (
    <Card className={`portrait-card ${props.color}`}>
      <div className="portrait" />
      <Button className="button" onClick={onClick}>{props.name}</Button>
    </Card>
  );
}