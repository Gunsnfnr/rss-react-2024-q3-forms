import { Link } from 'react-router-dom';
import _ from './Form1.module.css';
import { FormEvent, useRef, useState } from 'react';
import { object, string, ValidationError, number, boolean } from 'yup';
import LabelInput from '../LabelInput/LabelInput';
import GenderPicker from '../GenderPicker/GenderPicker';
import TermsConditions from '../TermsConditions/TermsConditions';

const Form1 = () => {
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [termsError, setTermsError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const genderMaleRef = useRef<HTMLInputElement>(null);
  const genderFemaleRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent): Promise<void | null> => {
    e.preventDefault();
    if (
      !nameRef.current ||
      !ageRef.current ||
      !emailRef.current ||
      !genderMaleRef.current ||
      !genderFemaleRef.current ||
      !termsRef.current
    )
      return null;

    const userSchema = object({
      name: string()
        .required('Name is a required field. ')
        .matches(/^[A-Z]{1}[a-z]{1,}$/, ' Сapitalise first letter, use English alphabet'),
      age: number().typeError('Age must be a number.').positive(' Age must be a positive number.'),
      email: string().required('Email is a required field. ').email('Email must be a valid email.'),
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
          genderMale: genderMaleRef.current.checked,
          genderFemale: genderFemaleRef.current.checked,
          terms: termsRef.current.checked,
        },
        { abortEarly: false },
      );
      console.log('user: ', user);

      setNameError('');
      setAgeError('');
      setEmailError('');
      setGenderError('');
      setTermsError('');
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        const errors: Record<string, string> = { name: '', age: '', email: '', terms: '', genderFemale: '' };

        err.inner.forEach((elem) => {
          if (elem.path) errors[elem.path] += elem.errors[0];
        });
        setNameError(errors.name);
        setAgeError(errors.age);
        setEmailError(errors.email);
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

        <div className={_.formUnit}>
          <label htmlFor="password" className={_.password}>
            Password
            <input type="password" id="password" name="password" />
          </label>
          <span className={_.error}></span>
        </div>

        <div className={_.formUnit}>
          <label htmlFor="confirm_password" className={_.confirm_password}>
            Confirm password
            <input type="text" id="confirm_password" name="confirm_password" />
          </label>
          <span className={_.error}></span>
        </div>

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
