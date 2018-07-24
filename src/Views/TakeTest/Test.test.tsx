import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IQuestion } from '../../lib/Interfaces';
import { Test } from './Test';

const questions: IQuestion[] = [];
for (let i = 0; i < 10; i++) {
  questions.push({
      end: undefined,
      question: '1 + ' + i,
      start: undefined,
      studentAnswer: undefined,
  });
};

const test = {
  duration: 20,
  end: undefined,
  questions,
  start: undefined,
}

const submitTest = (t: any) => {
  return t;
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Test test={test} submitTest={submitTest} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
