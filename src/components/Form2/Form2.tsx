import { Link, useNavigate } from 'react-router-dom';
import _ from '../Components.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../userSchema';
import { useForm } from 'react-hook-form';
import RLabelInput from '../ReactHookForm/RLabelInput';
import { ValidateUser } from '../../types';
import UploadImage from '../UploadImage/UploadImage';
import RGenderPicker from '../ReactHookForm/RGenderPicker';
import RTermsConditions from '../ReactHookForm/RTermsConditions';
import RCountry from '../ReactHookForm/RCountry';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { submitUser } from '../../store/usersSlice';
import RPassword from '../Password/RPassword';

const Form2 = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: ValidateUser) => {
    if (Object.values(errors).length === 0) {
      dispatch(
        submitUser({
          name: data.name,
          age: Number(data.age),
          email: data.email,
          password: data.password,
          country: data.country,
          gender: data.gender ? data.gender : '',
        }),
      );
      navigate('/');
    }
  };
  console.log('!watch(password): ', watch('password'));
  return (
    <>
      <div>Form #2 - React Hook Form</div>
      <div className={_.mb25}>
        Back to <Link to="/">the Main page</Link>
      </div>

      <form
        className={_.form}
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          void handleSubmit(onSubmit)();
        }}
      >
        <RLabelInput type="text" name="name" register={register} error={errors.name} />
        <RLabelInput type="number" name="age" register={register} error={errors.age} />
        <RLabelInput type="text" name="email" register={register} error={errors.email} />
        <RPassword register={register} error={errors.password} passwordInputValue={watch('password')} />
        <RLabelInput type="password" name="confirmPassword" register={register} error={errors.confirmPassword} />
        <RGenderPicker register={register} error={errors.gender} />
        <UploadImage />
        <RCountry register={register} error={errors.country} />
        <RTermsConditions register={register} error={errors.terms} />

        <input
          type="submit"
          value="Submit"
          disabled={!isValid}
          onClick={() => console.log('watch(password): ', watch('password'))}
        />
      </form>
    </>
  );
};
export default Form2;
