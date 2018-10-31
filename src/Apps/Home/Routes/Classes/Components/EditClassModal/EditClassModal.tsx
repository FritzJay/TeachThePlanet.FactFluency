import * as React from 'react';
import { Button } from 'src/Components/Button/Button';
import { Input, Modal, ModalContent, ModalHeader } from '../../../../../../Components/Components';
import './EditClassModal.css';

interface IProps {
  temp?: any
}

interface IState {
  temp?: any;
}

export class EditClassModal extends React.Component<IProps, IState> {
  public render() {
    return (
      <Modal className="edit-class-modal">
        <ModalHeader className="modal-header">
          <h2>Edit Class</h2>
        </ModalHeader>
        <ModalContent>
          <div className="input-fields"> 
            <label className="label">Change Class Name</label>
            <Input value="e.g. Homeroom" className="class-name" />

            <label className="label">Change Grade Level</label>
            <select name="grade">
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
          </div> 

          <div className="btn-row">
            <Button className="delete-class">Delete Class</Button>
            <Button className="cancel">Cancel</Button>
            <Button className="save-changes">Save Changes</Button>
          </div>
        </ModalContent>
      </Modal>
    );
  }
}