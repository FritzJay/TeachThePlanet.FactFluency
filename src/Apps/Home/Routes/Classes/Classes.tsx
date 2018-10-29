import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './Classes.css';
import {
  AddStudentModal,
  ClassCard,
  CreateClassCard,
  EditClassModal,
  NewClassModal
} from './Components/Components';

interface IProps extends RouteComponentProps<{}> {
  temp?: any
}

interface IState {
  temp?: any;
}

export class Classes extends React.Component<IProps, IState> {
  public render() {
    return (
      <div className="classes">
        <h2>Classes</h2>
        <AddStudentModal />

        <ClassCard />

        <CreateClassCard />

        <EditClassModal />

        <NewClassModal />
      </div>
    );
  }
}