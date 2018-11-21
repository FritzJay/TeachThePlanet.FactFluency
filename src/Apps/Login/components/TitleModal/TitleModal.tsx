import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Button, Modal, ModalContent, ModalHeader } from 'src/sharedComponents'

import './TitleModal.css';

interface IProps extends RouteComponentProps<{}> {}

export class TitleModal extends React.Component<IProps, any> {
  public constructor(props: IProps) {
    super(props);
    
    this.state = {}
  }

  public render() {
    const { match } = this.props
    
    return (
      <Modal
        overlay={true}
        className="TitleModal"
      >
        <ModalHeader> 
          <p className="title-header">Teach the Planet Fact Fluency</p>
        </ModalHeader>

        <ModalContent className="title-content">
          <Link to={`${match.url}/login`}>
            <Button className="green">Get Started</Button>
          </Link>

          <p className="title-sub">Anytime. Almost Anywhere. Always Free.</p>
        </ModalContent>
      </Modal>
    );
  }
}