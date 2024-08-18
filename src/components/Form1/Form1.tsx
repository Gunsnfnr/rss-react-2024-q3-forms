import { Link, useNavigate } from 'react-router-dom';
import _ from '../Components.module.css';
import { FormEvent, useRef, useState } from 'react';
import { ValidationError } from 'yup';
import LabelInput from '../LabelInput/LabelInput';
import GenderPicker from '../GenderPicker/GenderPicker';
import TermsConditions from '../TermsConditions/TermsConditions';
import { userSchema } from '../../userSchema';
import { useDispatch } from 'react-redux';
import { submitUser } from '../../store/usersSlice';
import Country from '../Country/Country';
import UploadImage from '../UploadImage/UploadImage';

const Form1 = () => {
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [termsError, setTermsError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderMaleRef = useRef<HTMLInputElement>(null);
  const genderFemaleRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent): Promise<void | null> => {
    e.preventDefault();
    if (
      !nameRef.current ||
      !ageRef.current ||
      !emailRef.current ||
      !passwordRef.current ||
      !confirmPasswordRef.current ||
      !genderMaleRef.current ||
      !genderFemaleRef.current ||
      !countryRef.current ||
      !termsRef.current
    )
      return null;

    const errors: Record<string, string> = {
      name: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: '',
      country: '',
      genderFemale: '',
    };

    try {
      await userSchema.validate(
        {
          name: nameRef.current?.value,
          age: ageRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          confirmPassword: confirmPasswordRef.current.value,
          genderMale: genderMaleRef.current.checked,
          genderFemale: genderFemaleRef.current.checked,
          country: countryRef.current.value,
          terms: termsRef.current.checked,
        },
        { abortEarly: false },
      );
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        err.inner.forEach((elem) => {
          if (elem.path) errors[elem.path] += elem.errors[0];
        });

        setNameError(errors.name);
        setAgeError(errors.age);
        setEmailError(errors.email);
        setPasswordError(errors.password);
        setConfirmPasswordError(errors.confirmPassword);
        setGenderError(errors.genderFemale);
        setCountryError(errors.country);
        setTermsError(errors.terms);
      }
    } finally {
      if (Object.values(errors).every((val) => val === '')) {
        dispatch(
          submitUser({
            name: nameRef.current.value,
            age: Number(ageRef.current.value),
            email: emailRef.current.value,
            password: passwordRef.current.value,
            country: countryRef.current.value,
            gender: genderFemaleRef.current.checked ? 'female' : 'male',
          }),
        );
        navigate('/');
      }
    }
  };

  return (
    <>
      <h2>Form #1 - uncontrolled components</h2>
      <div className={_.mb25}>
        Back to <Link to="/">the Main page</Link>
      </div>

      <form
        className={_.form1}
        onSubmit={(e: FormEvent) => {
          void handleSubmit(e);
        }}
      >
        <LabelInput type="text" name="name" refName={nameRef} error={nameError} />
        <LabelInput type="number" name="age" refName={ageRef} error={ageError} />
        <LabelInput type="text" name="email" refName={emailRef} error={emailError} />
        <LabelInput type="password" name="password" refName={passwordRef} error={passwordError} />
        <LabelInput type="password" name="confirmPassword" refName={confirmPasswordRef} error={confirmPasswordError} />
        <GenderPicker refName={[genderMaleRef, genderFemaleRef]} error={genderError} />
        <UploadImage />
        <Country refName={countryRef} error={countryError} />
        <TermsConditions refName={termsRef} error={termsError} />

        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
export default Form1;
