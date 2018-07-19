
export interface IUser {
  name: string;
};

export interface IQuestion {
  question: string;
  studentAnswer?: number;
  start?: Date;
  end?: Date;
}

export interface ITest {
  duration?: number;
  start?: Date;
  end?: Date;
  questions: IQuestion[];
}

export interface ITestResults {
  total: number;
  needed: number;
  correct: number;
  incorrect: IQuestion;
  quickest: IQuestion;
}

export interface ITestNumber {
  number: number;
  operators: string[];
}

export interface IAvailableTests {
  numbers: ITestNumber[];
}
