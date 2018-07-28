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
      <div className="login-margin-top">
        <Modal>
          <ModalHeader color="#4CAF50">
            <h2 className="hss">Math Facts Practice</h2>
          </ModalHeader>
          <ModalContent>
          <h2>Already in a class?</h2>

            <label className="login label">Name</label>
            <input className="login input" onChange={this.handleNameChange} value={this.state.name} />
            <label className="login label">Class Code</label>
            <input className="login input" onChange={this.handleClassCodeChange} value={this.state.classCode} type="number" />
            <p>No code, no worries you can still get started, just click Submit.</p>
          </ModalContent>
          <ModalContent>
            <Button onClick={this.handleSubmitClick}>
              <span className="btn-text">Get Started</span>
            </Button>
            <p className="error">{this.state.error}</p>
          </ModalContent>
        </Modal>
      </div>
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