import { createContext, useState } from 'react';

export type AnswerType = {
  choice: boolean;
  question: string;
};

type AnswersContextType = {
  answers: AnswerType[];
  pushAnswer: (answer: boolean, question: string, index: number) => void;
  emptyAnswers: () => void;
};

const defaultState = {
  answers: [],
  pushAnswer: () => undefined,
  emptyAnswers: () => undefined,
};

const AnswersContext = createContext<AnswersContextType>(defaultState);

export function AnswersContextProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<AnswerType[]>([]);

  const emptyAnswers = () => {
    setAnswers([]);
  };

  const pushAnswer = (answer: boolean, question: string, index: number) => {
    console.log(answer + question, index);

    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      if (newAnswers[index]) newAnswers[index] = { choice: answer, question: question };
      else newAnswers.push({ choice: answer, question: question });
      console.log(newAnswers);
      return newAnswers;
    });
  };

  const context = {
    answers,
    pushAnswer,
    emptyAnswers,
  };

  return <AnswersContext.Provider value={context}>{children}</AnswersContext.Provider>;
}

export default AnswersContext;
