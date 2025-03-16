import { Link, useNavigate } from 'react-router-dom';
import _ from '../Components.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../userSchema';
import { useForm } from 'react-hook-form';
import RLabelInput from '../ReactHookForm/RLabelInput';
import { ValidateUser } from '../../types';
import RGenderPicker from '../ReactHookForm/RGenderPicker';
import RTermsConditions from '../ReactHookForm/RTermsConditions';
import RCountry from '../ReactHookForm/RCountry';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { submitUser } from '../../store/usersSlice';
import RPassword from '../Password/RPassword';
import RUploadImage from '../ReactHookForm/RUploadImage';
import { convertToBase64 } from '../../utilities/convertToBase64';

const Form2 = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<ValidateUser>({
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: ValidateUser) => {
    if (Object.values(errors).length === 0) {
      try {
        const base64Image = await convertToBase64(data.image[0]);
        const userData = {
          name: data.name,
          age: data.age,
          email: data.email,
          password: data.password,
          country: data.country,
          gender: data.gender ? data.gender : '',
          image: base64Image,
        };
        dispatch(submitUser(userData));
        navigate('/submitted');
      } catch (error) {
        console.error('Error converting image to Base64:', error);
      }
    }
  };

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
        <RUploadImage register={register} error={errors.image} />
        <RCountry register={register} error={errors.country} />
        <RTermsConditions register={register} error={errors.terms} />

        <input type="submit" value="Submit" disabled={!isValid} />
      </form>
    </>
  );
};
export default Form2;
