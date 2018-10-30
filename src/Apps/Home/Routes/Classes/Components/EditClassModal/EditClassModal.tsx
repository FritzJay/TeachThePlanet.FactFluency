import * as React from 'react';
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
            <Input value="Relative Grade Level" className="grade-level" />
            <button className="delete-class"><i className="material-icons">delete</i>Delete Class</button>
          </div> 
          <div className="border" />
          <div className="btn-row">
            <button className="cancel">Cancel</button>
            <button className="save-changes">Save Changes</button>
          </div>
        </ModalContent>
      </Modal>
    );
  }
}