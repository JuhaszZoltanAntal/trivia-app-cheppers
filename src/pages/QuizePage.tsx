import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnswersContext from '../store/AnswersContext';
import QuestionsContext from '../store/QuestionsContext';
import ErrorPage from './ErrorPage';
import { decodeHtmlEntities } from '../utils/helperFunctions';

const QuizePage = () => {
  const navigate = useNavigate();

  const { questions } = useContext(QuestionsContext);
  const { pushAnswer } = useContext(AnswersContext);

  const { index: currentQuestionIndex } = useParams();

  const handleAnswer = (answer: boolean, question: string, index: number) => {
    if (currentQuestionIndex) {
      if (questions.length > +currentQuestionIndex + 1) {
        pushAnswer(answer, question, +currentQuestionIndex);
        navigate(`/quize/${+index + 1}`);
      } else {
        pushAnswer(answer, question, +currentQuestionIndex);
        navigate('/result');
      }
    }
  };

  if (currentQuestionIndex && questions.length > 0 && questions.length >= +currentQuestionIndex + 1)
    return (
      <section className='text-center'>
        <h1 className='text-3xl font-bold my-4'>{questions[+currentQuestionIndex].category}</h1>
        <div className='mb-4'>
          <p className='text-lg'>{decodeHtmlEntities(questions[+currentQuestionIndex].question)}</p>
        </div>
        <p className='mb-4'>
          {+currentQuestionIndex + 1}/{questions.length}
        </p>
        <button
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2'
          onClick={() => {
            handleAnswer(true, questions[+currentQuestionIndex].question, +currentQuestionIndex);
          }}
        >
          True
        </button>
        <button
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => {
            handleAnswer(false, questions[+currentQuestionIndex].question, +currentQuestionIndex);
          }}
        >
          False
        </button>
      </section>
    );
  else return <ErrorPage />;
};

export default QuizePage;
