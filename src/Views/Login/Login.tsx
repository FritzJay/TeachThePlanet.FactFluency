import * as React from "react";
import { URLS } from "../../App";
import { Button } from '../../Components/Button/Button';
import { Modal, ModalContent, ModalHeader } from '../../Components/Modal/Modal';
import { IUser } from "../../lib/Interfaces";
import { IRequest, jsonFetch, setTokenToStateOrSignOut } from '../../lib/Requests';
import './Login.css';

interface IResponse {
  token: string;
  user: IUser;
}

interface IProps {
  saveUser: (response: IResponse) => Promise<void>; 
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
      <Modal>
        <ModalHeader color="#A8C75A">
          <a><img alt="Home" src="https://vectr.com/thomasisaacpeterecclesgmailcom/fnVZV3K0a.svg?width=48&height=48&select=fnVZV3K0apage0" /></a>
          <h2 className="hss">Welcome one, welcome all.</h2>
          <h2>Already in a class?</h2>
        </ModalHeader>
        <ModalContent>
          <label className="login label">Name</label>
          <input className="login input" onChange={this.handleNameChange} value={this.state.name} />
          <label className="login label">Class Code</label>
          <input className="login input" onChange={this.handleClassCodeChange} value={this.state.classCode} type="number" />
          <p>No code, no worries you can still get started.</p>
        </ModalContent>
        <ModalContent>
          <Button color="#3a93e1" onClick={this.handleSubmitClick}>Submit</Button>
          <p className="error">{this.state.error}</p>
        </ModalContent>
      </Modal>
    );
  }
  
  private signin(name: string, classCode: string) {
    const request: IRequest = {
      body: {name, classCode},
      method: "POST",
      token: this.state.token,
    };
    jsonFetch(`${process.env.REACT_APP_API_URL}/students/signin`, request)
    .then((response) => {
       this.props.saveUser({
        token: response.token,
        user: response.user,
      })
      .then(this.props.history.push(URLS.newTest))
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