import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalContent, ModalHeader } from '../../../../Components/Components'

import './TitleModal.css';

interface IProps {
  history: any;
}

interface IState {
  color?: string,
  loginFor?: string,
}

export class TitleModal extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    
    this.state = {}
  }

  public render() {
    
    return (
      <Modal className="title-modal">
        <ModalHeader> 
          <p className="title-header">Practice your math facts here.</p>
        </ModalHeader>

        <ModalContent>
        <Link className="title-btn" to="/signup">
          <Button className="green">Get Started</Button>
        </Link>
        <p className="title-sub">Anytime. Anywhere. Always Free.</p>
        </ModalContent>
      </Modal>
    );
  }
}