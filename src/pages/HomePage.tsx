import axios from 'axios';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AnswersContext from '../store/AnswersContext';
import QuestionsContext, { QuestionType } from '../store/QuestionsContext';
import DifficultyValidationErrors from '../components/form/difficulty/DifficultyValidationErrors';
import NumberOfQuestionsInput from '../components/form/numberOfQuestions/NumberOfQuestionsInput';
import NumberOfQuestionsValidationErrors from '../components/form/numberOfQuestions/NumberOfQuestionsValidationErrors';
import DifficultyInput from '../components/form/difficulty/DifficultyInput';

interface FormData {
  numberOfQuestions: number;
  difficulty: string;
}

const defaultData = {
  numberOfQuestions: 10,
  difficulty: 'medium',
};

const HomePage = () => {
  const navigate = useNavigate();

  const { fillUpQuestions } = useContext(QuestionsContext);
  const { emptyAnswers } = useContext(AnswersContext);

  const formMethods = useForm<FormData>({
    defaultValues: defaultData,
  });
  const { handleSubmit, watch } = formMethods;

  const numberOfQuestions = watch('numberOfQuestions');
  const difficulty = watch('difficulty');

  const onFormSubmit = (data: FormData) => {
    const fetchQuestions = async (): Promise<QuestionType[]> => {
      const res = await axios.get(
        `https://opentdb.com/api.php?amount=${data.numberOfQuestions}&difficulty=${data.difficulty}&type=boolean`
      );

      const uniqueQuestions = [
        ...new Set(res.data.results.map((question: QuestionType) => question.question)),
      ];

      if (uniqueQuestions.length < data.numberOfQuestions) {
        return fetchQuestions();
      }

      return res.data.results;
    };

    fetchQuestions()
      .then((results) => {
        fillUpQuestions(results);
        emptyAnswers();
        navigate('/quize/0');
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className='text-center p-4'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to the trivia challenge</h1>
      <p className='text-lg mb-2'>
        You will be presented with {numberOfQuestions} true or false questions
      </p>
      <p className='text-lg mb-4'>Difficulty will be: {difficulty}</p>
      <p className='text-lg font-bold mb-4'>Can you score 100%?</p>
      <FormProvider {...formMethods}>
        <div className='flex justify-center'>
          <form
            className='w-full max-w-sm border border-gray-300 rounded-md p-4'
            onSubmit={handleSubmit(onFormSubmit)}
          >
            <div className='mb-4'>
              <NumberOfQuestionsInput />
              <NumberOfQuestionsValidationErrors />
            </div>
            <div className='mb-4'>
              <DifficultyInput />
              <DifficultyValidationErrors />
            </div>
            <div>
              <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
              >
                Begin
              </button>
            </div>
          </form>
        </div>
      </FormProvider>
    </section>
  );
};

export default HomePage;
