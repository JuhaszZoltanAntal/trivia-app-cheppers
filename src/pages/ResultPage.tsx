import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AnswersContext, { AnswerType } from '../store/AnswersContext';
import QuestionsContext, { QuestionType } from '../store/QuestionsContext';
import ErrorPage from './ErrorPage';
import { decodeHtmlEntities } from '../utils/helperFunctions';

const ResultPage = () => {
  const { answers } = useContext(AnswersContext);
  const { questions } = useContext(QuestionsContext);
  const navigate = useNavigate();

  const countTheCorrectAnswers = (questions: QuestionType[], answers: AnswerType[]) => {
    const correctAnsersArray = questions.filter((question: QuestionType, index: number) => {
      return question.correct_answer.toLowerCase() === answers[index].choice.toString();
    });
    return correctAnsersArray.length;
  };

  if (questions.length === answers.length && questions.length > 0)
    return (
      <div className='flex justify-center m-2'>
        <div>
          <h2 className='text-center text-lg font-bold'>
            Score: {countTheCorrectAnswers(questions, answers)} / {questions.length}
          </h2>
          <ul className='list-none'>
            {questions.map((question, index) => (
              <li key={index} className='border-b border-gray-300 py-4'>
                <p className='text-sm'>Your answer was: {answers[index].choice.toString()}</p>
                <p className='text-sm'>Correct answer: {question.correct_answer.toLowerCase()}</p>
                {answers[index].choice.toString() === question.correct_answer.toLowerCase() ? (
                  <p className='text-green-500'>{decodeHtmlEntities(question.question)}</p>
                ) : (
                  <p className='text-red-500'>{decodeHtmlEntities(question.question)}</p>
                )}
              </li>
            ))}
          </ul>
          <div className='flex justify-center'>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-2'
              onClick={() => {
                navigate('/');
              }}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    );
  else return <ErrorPage />;
};

export default ResultPage;
