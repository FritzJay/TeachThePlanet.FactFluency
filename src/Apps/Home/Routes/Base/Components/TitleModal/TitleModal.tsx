import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Modal, ModalContent, ModalHeader } from 'src/Components'

import './TitleModal.css';

interface IProps extends RouteComponentProps<{}> {}

export class TitleModal extends React.Component<IProps, any> {
  public constructor(props: IProps) {
    super(props);
    
    this.state = {}
  }

  public render() {
    
    return (
      <Modal className="title-modal">
        <ModalHeader> 
          <p className="title-header">Practice Your Math Facts Here</p>
        </ModalHeader>

        <ModalContent>
        <Link className="title-btn" to={`${this.props.match.url}login`}>
          <Button className="green">Get Started</Button>
        </Link>
        <p className="title-sub">Anytime. Almost Anywhere. Always Free.</p>
        </ModalContent>
      </Modal>
    );
  }
}