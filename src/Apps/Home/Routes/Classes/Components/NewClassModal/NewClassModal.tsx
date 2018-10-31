import * as React from 'react';
import { Button, Input, Modal, ModalContent, ModalHeader } from '../../../../../../Components/Components';
import './NewClassModal.css';

interface IProps {
  temp?: any
}

interface IState {
  temp?: any;
}

export class NewClassModal extends React.Component<IProps, IState> {
  public render() {
    return (
      <Modal className="new-class-modal">
        <ModalHeader className="modal-header">
          <h2>New Class</h2>
        </ModalHeader>
        <ModalContent>
          <div className="input-fields"> 

            <label className="label">Grade</label>
            <select name="grade">
              <option value="select">Select A Grade</option>
              <option value="kindergarten">Kindergarten</option>
              <option value="first">1st Grade</option>
              <option value="second">2nd Grade</option>
              <option value="third">3rd Grade</option>
              <option value="fourth">4th Grade</option>
              <option value="fifth">5th Grade</option>
              <option value="middle">Middle School (6-8)</option>
              <option value="high">High School (9-12)</option>
              <option value="beyond">College or Beyond</option>
            </select>

            <label className="label">Class Name</label>
            <Input value="e.g. Homeroom" className="class-name" />
          </div> 

          <div className="btn-row">
            <Button className="cancel">Cancel</Button>
            <Button className="create-class">Create Class</Button>
          </div>
        </ModalContent>
      </Modal>
    );
  }
}