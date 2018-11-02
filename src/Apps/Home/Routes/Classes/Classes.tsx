import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { IClass } from '../../../../lib/Interfaces';
import './Classes.css';
import {
  AddStudentModal,
  ClassCard,
  CreateClassCard,
  EditClassModal,
  NewClassModal
} from './Components/Components';

interface IProps extends RouteComponentProps<{}> {
}

interface IState {
  classes: IClass[]
}

export class Classes extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state= {
      classes: []
    }
  }

  public render() {
    const { match } = this.props
    // const { classes } = this.state

    return (
      <div className="classes">

        <h2>Classes</h2>

        <Route
          exact={true}
          to={match.path}
        >
          <div className="classes-grid">
            {[{ name: 'Test Class', id: '1', classCode: '1x2BF3' }].map((cls: IClass) => (
              <ClassCard
                key={cls.id}
                name={cls.name}
                classCode={cls.classCode}
              />
              ))}

            <CreateClassCard />
          </div>
        </Route>

        <AddStudentModal />


        <EditClassModal />

        <NewClassModal />
      </div>
    );
  }
}