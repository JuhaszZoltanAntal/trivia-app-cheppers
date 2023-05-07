import { useFormContext } from 'react-hook-form';

const NumberOfQuestionsValidationErrors = () => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {errors.numberOfQuestions?.type === 'required' && (
        <span className='text-red-500 text-xs italic'>Number of question field is required</span>
      )}
      {errors.numberOfQuestions?.type === 'min' && (
        <span className='text-red-500 text-xs italic'>Minimum number of questions is 5</span>
      )}
      {errors.numberOfQuestions?.type === 'max' && (
        <span className='text-red-500 text-xs italic'>Maximum number of questions is 50</span>
      )}
    </>
  );
};

export default NumberOfQuestionsValidationErrors;
