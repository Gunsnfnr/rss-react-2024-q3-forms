import { Link } from 'react-router-dom';
import _ from './Form1.module.css';
import { FormEvent, useRef, useState } from 'react';
import { object, string, ValidationError, number, boolean } from 'yup';
import LabelInput from '../LabelInput/LabelInput';
import GenderPicker from '../GenderPicker/GenderPicker';
import TermsConditions from '../TermsConditions/TermsConditions';
import * as yup from 'yup';

const Form1 = () => {
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [termsError, setTermsError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderMaleRef = useRef<HTMLInputElement>(null);
  const genderFemaleRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

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
      !termsRef.current
    )
      return null;

    const userSchema = object({
      name: string()
        .required('Name is a required field. ')
        .matches(/^[A-Z]{1}[a-z]{1,}$/, ' Сapitalise the first letter, use English alphabet'),
      age: number().typeError('Age must be a number.').positive(' Age must be a positive number.'),
      email: string().required('Email is a required field. ').email('Email must be a valid email.'),
      password: string()
        .required('Password is a required field. ')
        .matches(/^[\S]{0,}[A-Z]{1}[\S]{0,}$/, ' Must include an uppercased letter.')
        .matches(/^[\S]{0,}[a-z]{1}[\S]{0,}$/, ' Must include an lowercased letter.')
        .matches(/^[\S]{0,}[\W]{1}[\S]{0,}$/, ' Must include a special character.')
        .matches(/^[\S]{0,}[0-9]{1}[\S]{0,}$/, ' Must include a number.'),
      confirmPassword: string()
        .required('Confirm password is a required field. ')
        .oneOf([yup.ref('password')], 'Passwords must match'),
      genderMale: boolean(),
      genderFemale: boolean().when('genderMale', {
        is: false,
        then: (userSchema) => userSchema.isTrue('This is a mandatory question.'),
      }),
      terms: boolean().isTrue('You must agree with the terms and conditions.'),
    });
    try {
      const user = await userSchema.validate(
        {
          name: nameRef.current.value,
          age: ageRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          confirmPassword: confirmPasswordRef.current.value,
          genderMale: genderMaleRef.current.checked,
          genderFemale: genderFemaleRef.current.checked,
          terms: termsRef.current.checked,
        },
        { abortEarly: false },
      );
      console.log('user: ', user);
      console.log('passwordRef.current.value: ', passwordRef.current.value);

      console.log('passwordRef.current.value: ', confirmPasswordRef.current.value);

      setNameError('');
      setAgeError('');
      setEmailError('');
      setPasswordError('');
      setConfirmPasswordError('');
      setGenderError('');
      setTermsError('');
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        const errors: Record<string, string> = {
          name: '',
          age: '',
          email: '',
          password: '',
          confirmPassword: '',
          terms: '',
          genderFemale: '',
        };

        err.inner.forEach((elem) => {
          if (elem.path) errors[elem.path] += elem.errors[0];
        });
        setNameError(errors.name);
        setAgeError(errors.age);
        setEmailError(errors.email);
        setPasswordError(errors.password);
        setConfirmPasswordError(errors.confirmPassword);
        setGenderError(errors.genderFemale);
        setTermsError(errors.terms);
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

        <div className={_.formUnit}>
          <input className={_.uploadImage} type="file" name="image" id="image" accept="image/png, image/jpeg" />
          <span className={_.error}></span>
        </div>

        <div className={_.formUnit}>
          <label htmlFor="country" className={_.country}>
            Country
            <input type="text" id="country" name="country" />
          </label>
          <span className={_.error}></span>
        </div>

        <TermsConditions refName={termsRef} error={termsError} />

        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
export default Form1;
