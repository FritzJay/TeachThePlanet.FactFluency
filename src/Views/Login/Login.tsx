import * as React from "react";
import { URLS } from "../../App";
import { IUser } from "../../lib/Interfaces";
import { IRequest, jsonFetch, setTokenToStateOrSignOut } from '../../lib/Requests';

interface IProps {
  saveUser: (token:string, user: IUser) => void; 
  token?: string,
  history: any,
}

interface IState {
  classCode: string;
  error: string;
  name: string;
  token?: string;
}

export class Login extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      classCode: '',
      error: '',
      name: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleClassCodeChange = this.handleClassCodeChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.signin = this.signin.bind(this);
  }

  public componentDidMount() {
    setTokenToStateOrSignOut(this);
  }
  
  public render() {
    return (
      <div>
        <label>Name:</label>
        <input onChange={this.handleNameChange} value={this.state.name} />
        <label>Class Code:</label>
        <input onChange={this.handleClassCodeChange} value={this.state.classCode} />
        <button onClick={this.handleSubmitClick}>
          Submit
        </button>
        <p>{this.state.error}</p>
      </div>
    );
  }
  
  private signin(name: string, classCode: string) {
    const request: IRequest = {
      body: {name, classCode},
      method: "POST",
      token: this.state.token,
    };
    jsonFetch(`${process.env.REACT_APP_API_URL}/students/`, request)
    .then((response) => {
      this.props.saveUser(response.token, response.user);
      this.props.history.push(URLS.newTest);
    })
    .catch((error: Error) => {
      this.setState({error: error.toString()});
    });
  }
  
  private handleNameChange(event: any) {
    this.setState({name: event.target.value});
  }
  
  private handleClassCodeChange(event: any) {
    this.setState({classCode: event.target.value});
  }
  
  private handleSubmitClick() {
    this.signin(this.state.name, this.state.classCode);
  }
}