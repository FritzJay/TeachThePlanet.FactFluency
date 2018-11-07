import * as React from 'react';
import { Button, Input, Modal, ModalContent, ModalHeader } from 'src/sharedComponents';
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
      <div>
      <Modal
        overlay={true}
        className="add-student-modal-start"
      >
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
      
      <Modal className="class-code">
        <ModalContent className="add-students">
          <h1>Add Students</h1>
        </ModalContent>
        <ModalContent>
          <div className="sub-header">
            <h3>Your class code is: <span className="code">73605C</span></h3>
          </div>
          <div className="code-instructions">
            <p>Have your students sign in to their Fact Fluency account, select the join class (+), and enter the class code.</p>
          </div>
          <div className="btn-row">
            <Button className="back">Back</Button>
            <Button className="cancel">Cancel</Button>
            <Button className="continue">Continue</Button>
          </div>
        </ModalContent>
      </Modal>
      
      <Modal className="student-creation-question">
        <ModalHeader className="add-students">
            <h1>Add Students</h1>
          </ModalHeader>
          <ModalContent>
            <div className="sub-header">
              <h3>Who will create the new account?</h3>
            </div>
            <div className="account-create-type">
              <div className="student-created">
                <h4>My students will create their own accounts.</h4>
                <p>(Better suited for older students.)</p>
              </div>
              <div className="teacher-created">
                <h4>I'll create accounts for my students.</h4>
                <p>(Better suited for younger students.)</p>
              </div>
            </div>
            <div className="btn-row">
              <Button className="back">Back</Button>
              <Button className="cancel">Cancel</Button>
              <Button className="continue">Continue</Button>
            </div>
          </ModalContent>
      </Modal>

      <Modal className="add-student-modal">
        <ModalHeader className="add-students">
            <h1>Add Students</h1>
          </ModalHeader>
          <ModalContent>
            <div className="sub-header">
              <h3>Type in your students' names.</h3>
            </div>
            <div className="account-create-type">
              <Input className="input-student" value="Fritz J" />
              <button className="add-student-btn">Add</button>
                <label>Enter a first name and last initial.</label>
            </div>
            <div className="btn-row">
              <Button className="back">Back</Button>
              <Button className="create-accounts">Create Accounts</Button>
            </div>
          </ModalContent>
      </Modal>
      </div>
    );
  }
}