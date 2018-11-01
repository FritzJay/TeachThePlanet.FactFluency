import * as React from 'react';
import { Button, Modal, ModalContent, ModalHeader } from '../../../../../../Components/Components';
import './AddStudentModal.css';

interface IProps {
  temp?: any
}

interface IState {
  temp?: any;
}

export class AddStudentModal extends React.Component<IProps, IState> {
  public render() {
    return (
      <Modal className="add-student-modal">
        <ModalHeader className="add-students">
          <h1>Add Students</h1>
        </ModalHeader>
        <ModalContent>
          <div className="sub-header">
            <h3>Do your students have accounts?</h3>
          </div>
          <div className="account-type">
          <div className="account-verification">
            <div className="current-account">
              <h4>Yes, they already have accounts.</h4>
              <p>If your students already practice with Fact Fluency, they can log in and connect to your classroom.</p>
            </div>
          </div>
          <div className="no-account">
              <h4>No, they need new accounts.</h4>
              <p>If your students don't have accounts, they can make new ones or your can do it for them.</p>
            </div>
          </div>
          <div className="btn-row">
            <Button className="cancel">Cancel</Button>
            <Button className="continue">Continue</Button>
          </div>
        </ModalContent>
      </Modal>
    );
  }
}