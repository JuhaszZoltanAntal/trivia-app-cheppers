import { createContext, useState } from 'react';

export type QuestionType = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type QuestionsContextType = {
  questions: QuestionType[];
  fillUpQuestions: (questions: QuestionType[]) => void;
  emptyQuestions: () => void;
};

const defaultState = {
  questions: [],
  fillUpQuestions: () => undefined,
  emptyQuestions: () => undefined,
};

const QuestionsContext = createContext<QuestionsContextType>(defaultState);

export function QuestionsContextProvider({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const fillUpQuestions = (questions: QuestionType[]) => {
    setQuestions([...questions]);
  };
  const emptyQuestions = () => {
    setQuestions([]);
  };

  const context = {
    questions,
    fillUpQuestions,
    emptyQuestions,
  };

  return <QuestionsContext.Provider value={context}>{children}</QuestionsContext.Provider>;
}

export default QuestionsContext;
