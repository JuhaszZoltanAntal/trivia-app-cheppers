import { useFormContext } from 'react-hook-form';

const DifficultyInput = () => {
  const { register } = useFormContext();

  return (
    <>
      <label htmlFor='difficulty' className='block text-sm font-medium text-gray-700'>
        Difficulty
      </label>
      <select
        id='difficulty'
        {...register('difficulty')}
        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
      >
        <option value='easy'>Easy</option>
        <option value='medium'>Medium</option>
        <option value='hard'>Hard</option>
      </select>
    </>
  );
};

export default DifficultyInput;
