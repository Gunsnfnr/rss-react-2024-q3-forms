import { Link } from 'react-router-dom';
import _ from '../Components.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../userSchema';
import { useForm } from 'react-hook-form';
import RLabelInput from '../ReactHookForm/RLabelInput';
import { ValidateUser } from '../../types';
// import UploadImage from '../UploadImage/UploadImage';
import RGenderPicker from '../ReactHookForm/RGenderPicker';

const Form2 = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });

  console.log('errors: ', errors);

  const onSubmit = (data: ValidateUser) => {
    console.log(data);
  };

  return (
    <>
      <div>Form #2 - React Hook Form</div>
      <div className={_.mb25}>
        Back to <Link to="/">the Main page</Link>
      </div>

      <form
        className={_.form}
        onSubmit={() => {
          void handleSubmit(onSubmit)();
        }}
      >
        <RLabelInput type="text" name="name" register={register} error={errors.name} />
        <RLabelInput type="number" name="age" register={register} error={errors.age} />
        <RLabelInput type="text" name="email" register={register} error={errors.email} />
        <RLabelInput type="password" name="password" register={register} error={errors.password} />
        <RLabelInput type="password" name="confirmPassword" register={register} error={errors.confirmPassword} />
        <RGenderPicker register={register} error={errors.genderFemale} />
        {/* <UploadImage /> */}
        {/* <Country refName={countryRef} error={countryError} />
        <TermsConditions refName={termsRef} error={termsError} /> */}

        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
export default Form2;
