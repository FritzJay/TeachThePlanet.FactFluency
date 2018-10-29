import * as React from 'react';
import './Classes.css';
import { ClassCard, CreateClassCard } from './Components/Components';

interface IProps {
  temp?: any
}

interface IState {
  temp?: any;
}

export class Classes extends React.Component<IProps, IState> {
  public render() {
    return (
      <div className="classes">
        Classes
        <ClassCard />
        <CreateClassCard />
      </div>
    );
  }
}