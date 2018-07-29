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
  error: string;
  name: string;
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
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!token) {
      console.log('Local storage does not contain token.')
    } else if (!user) {
      console.log('Local storage does not contain user.')
    } else {
      this.props.onSubmit(token, JSON.parse(user));
    }
  }
  
  public render() {
    return (
      <div className="login margin-top">
        <Modal>
          <ModalHeader color="#4CAF50">
            <h2>Math Facts Practice</h2>
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
  
  private handleNameChange(event: any) {
    this.setState({name: event.target.value});
  }
  
  private handleClassCodeChange(event: any) {
    this.setState({classCode: event.target.value});
  }
  
  private handleSubmitClick() {
    this.signin(this.state.name, this.state.classCode);
  }
  
  private signin(name: string, classCode: string) {
    const request: IRequest = {
      body: {name, classCode},
      method: "POST",
    };
    jsonFetch(`${process.env.REACT_APP_API_URL}/students/signin`, request)
    .then((response) => {
      this.props.onSubmit(response.token, response.user);
    })
    .catch((error: Error) => {
      this.setState({error: error.toString()});
    });
  }
}