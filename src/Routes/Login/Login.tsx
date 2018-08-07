import * as React from "react";
import { Button } from '../../Components/Button/Button';
import { Modal, ModalContent, ModalHeader } from '../../Components/Modal/Modal';
import { IUser } from "../../lib/Interfaces";
import { IRequest, jsonFetch } from '../../lib/Requests';
import './Login.css';

interface IProps {
  onSubmit: (token: string, user: IUser) => void; 
}

interface IState {
  classCode: string;
  error?: string;
  name: string;
}

export class Login extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      classCode: '',
      name: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleClassCodeChange = this.handleClassCodeChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.signin = this.signin.bind(this);
  }
  
  public render() {
    return (
      <div className="login margin-top">
        <Modal>
          <ModalHeader>
            <h2>Practice Your Math Facts</h2>
          </ModalHeader>
          <ModalContent>
            <label className="label">Name</label>
            <input className="input" onChange={this.handleNameChange} value={this.state.name} />
            <label className="label">Class Code</label>
            <input className="input" onChange={this.handleClassCodeChange} value={this.state.classCode} type="number" />
            <p className="reminder">No code, no worries you can still get started.</p>
          </ModalContent>
          <ModalContent>
            <Button className="button" onClick={this.handleSubmitClick}>
              Get Started
            </Button>
            <p className={`error ${this.state.error ? 'active' : ''}`}>{this.state.error}</p>
          </ModalContent>
        </Modal>
      </div>
    );
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

  private flashError(error: string) {
    this.setState({error: error.toString()});
    setTimeout(this.hideError.bind(this), 1250);
  }

  private hideError() {
    this.setState({error: undefined});
  }
  
  // Leaving the request inside the component because this component will be removed
  // once a home page is setup.
  private signin(name: string, classCode: string) {
    const request: IRequest = {
      body: {name, classCode},
      method: "POST",
    };
    jsonFetch(`${process.env.REACT_APP_API_URL}/students/signin`, request)
    .then((response) => {
      this.props.onSubmit(response.token, response.user);
    })
    .catch(() => {
      this.flashError('Incorrect Name or Class Code');
    });
  }
}