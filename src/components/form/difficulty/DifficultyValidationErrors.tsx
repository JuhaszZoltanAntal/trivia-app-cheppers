import { useFormContext } from 'react-hook-form';

const DifficultyValidationErrors = () => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {errors.difficulty?.type === 'required' && (
        <span className='text-red-500 text-xs italic'>Difficulty field is required</span>
      )}
    </>
  );
};

export default DifficultyValidationErrors;
