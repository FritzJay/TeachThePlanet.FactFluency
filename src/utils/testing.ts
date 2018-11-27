import { IQuestion } from './interfaces'
import { IDisplayQuestion } from './tempInterfaces'

export const initializeQuestions = (questions: IQuestion[]): IQuestion[] => {
  return questions.map((q: any) => {
    q.start = null
    q.end = null
    return q
  });
}

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

export const startQuestion = (question: IQuestion): IQuestion => {
  question.start = new Date().getTime();
  return question
}

export const randomlyFlipQuestion = (question: IQuestion, seed: number): IDisplayQuestion => {
  const randomNumber = ((seed * 9301 + 49297) % 233280) / 233280

  let bottom;
  let top;
  const [firstNum, operator, secondNum] = question.question.split(' ');
  if (operator !== '/' && operator !== '-' && randomNumber > 0.5) {
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