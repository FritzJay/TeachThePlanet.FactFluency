import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IQuestion } from '../../lib/Interfaces';
import { TakeTest } from './TakeTest';

const questions: IQuestion[] = [];
for (let i = 0; i < 10; i++) {
  questions.push({
      end: undefined,
      question: '1 + ' + i,
      start: undefined,
      studentAnswer: undefined,
  });
};

const submitTest = (t: any) => {
  return t;
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TakeTest onSubmit={submitTest} history={null} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
