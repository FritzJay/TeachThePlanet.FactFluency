import { IQuestion } from "./Interfaces";
import { randomizeQuestions, sortQuestions } from "./Testing";

const questions: IQuestion[] = [];
for (let i = 0; i < 10; i++) {
  questions.push({
      end: undefined,
      question: '1 + ' + i,
      start: undefined,
      studentAnswer: undefined,
  });
};

const questionStrings = questions.map((q: IQuestion) => {
  return q.question;
});

describe('randomizeQuestions', () => {
  it('does not affect the original array', () => {
    randomizeQuestions(questions);
    for (let i = 0; i < questions.length; i++) {
      const actual = questions[i].question;
      const expected = questionStrings[i];
      expect(actual).toBe(expected);
    }
  });
  it('does not return questions in the same order', () => {
    const randomizedQuestionStrings = randomizeQuestions(questions).map((q: IQuestion) => {
      return q.question;
    });
    expect(randomizedQuestionStrings).not.toBe(questionStrings);
  });
  it('adds an index property to each question', () => {
    randomizeQuestions(questions).forEach((q: IQuestion) => {
      expect(q).toHaveProperty('index');
    });
  });
});

describe('sortQuestions', () => {
  it('puts questions back in order', () => {
    const randomizedQuestions = randomizeQuestions(questions);
    const orderedQuestions = sortQuestions(randomizedQuestions)
    const orderedQuestionStrings = orderedQuestions.map((q: IQuestion) => {
      return q.question;
    });
    expect(orderedQuestionStrings).toEqual(questionStrings);
  });
});