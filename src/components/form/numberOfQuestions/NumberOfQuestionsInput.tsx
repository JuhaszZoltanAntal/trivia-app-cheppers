import { useFormContext } from 'react-hook-form';

const NumberOfQuestionsInput = () => {
  const { register } = useFormContext();

  return (
    <>
      <label htmlFor='numberOfQuestions' className='block text-sm font-medium text-gray-700'>
        Number Of Questions
      </label>
      <input
        id='numberOfQuestions'
        type='number'
        placeholder='10'
        {...register('numberOfQuestions', {
          required: true,
          max: 50,
          min: 5,
        })}
        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
      />
    </>
  );
};

export default NumberOfQuestionsInput;
