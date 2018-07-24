import { IDisplayQuestion, IQuestion } from "./Interfaces";

export const randomizeQuestions = (questions: IQuestion[]): IQuestion[] => {
  return JSON.parse(JSON.stringify(questions))    // Deep Copy
  .map((question: any, i: number) => {
    question.index = i;
    return question;
  })
  .sort(() => 0.5 - Math.random())                // Randomize
}

export const sortQuestions = (questions: IQuestion[]): IQuestion[] => {
  return questions.sort((q1: any, q2: any) => {
    return q1.index - q2.index;
  });
}

export const startQuestion = (question: IQuestion): IDisplayQuestion => {
  const flippedQuestion = randomlyFlipQuestion(question);
  flippedQuestion.start = new Date();
  return flippedQuestion;
}

export const randomlyFlipQuestion = (question: IQuestion): IDisplayQuestion => {
  let bottom;
  let top;
  const [firstNum, operator, secondNum] = question.question.split(' ');
  if (operator !== '/' && operator !== '-' && Math.random() > 0.5) {
    bottom = firstNum;
    top = secondNum;
  } else {
    bottom = secondNum;
    top = firstNum;
  }
  return {
    bottom,
    operator,
    top,
  }
}