
export interface IUser {
  name: string;
};

export interface IQuestion {
  question: string;
  studentAnswer?: number;
  correctAnswer?: number;
  start?: Date;
  end?: Date;
}

export interface IDisplayQuestion {
  bottom: string;
  operator: string;
  start?: Date;
  top: string;
}

export interface IRequest {
  body?: object;
  method?: string;
  token?: string;
}

export interface ITestParameters {
  number: number;
  operator: string;
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